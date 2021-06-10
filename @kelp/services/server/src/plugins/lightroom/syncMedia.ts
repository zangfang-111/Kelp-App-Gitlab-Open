/* eslint-disable require-atomic-updates */
import { MediaPatch } from '@kelp/graphql'
import * as db from '@kelp/worker/db'
import { generateSQLPreparedValues } from '@kelp/worker/dbHelpers'
import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { PoolClient, QueryConfig } from 'pg'
import { isNil } from 'ramda'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'

interface LightroomSyncMediaInputPayload {
  mediaId?: number
  lrUuidIdentifier: string
  currentCollectionId: number
  catalogId: number
  localIdentifier: number
  title?: string
  headline?: string
  caption?: string
  masterMedia?: {
    lrUuidIdentifier: string
    localIdentifier: number
  }
  gps?: {
    latitude: number
    longitude: number
  }
  isVirtualCopy: boolean
}

/**
 * Sync the Lightroom media to the sensio DB.
 *
 * situation when there is no ID
 * ```md
 * 1. check for catalogId and currentCollectionId -> thoro error on false
 * 2. check does collection exist no if false throw error
 * 3. check if there is id if false create the LightroomMedia
 * 4. create the media record and connect to the LightrooMedia
 * 5. assign the LightroomMedia to the collection and the album
 * 6. return the LightroomMedia
 * ```
 *
 * Situation when there is an ID
 *
 * ```md
 * 1. check for catalogId and currentCollectionId -> thoro error on false
 * 2. check does collection exist no if false throw error
 * 3. check if there is id if true update
 * 4. update the albums and collections
 * 5. return the LightroomMedia
 * ```
 */
export const SyncMedia = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build

  return {
    typeDefs: gql`
      input LightroomMasterMediaInputPayload {
        lrUuidIdentifier: String!
        localIdentifier: Int!
      }

      input GpsInputPayload {
        latitude: Float!
        longitude: Float!
      }

      input LightroomSyncMediaInputPayload {
        mediaId: Int
        lrUuidIdentifier: String!
        currentCollectionId: Int!
        catalogId: Int!
        localIdentifier: Int!
        title: String
        headline: String
        caption: String
        masterMedia: LightroomMasterMediaInputPayload
        isVirtualCopy: Boolean
        gps: GpsInputPayload
      }

      type LightroomSyncMediaResponse {
        media: LightroomMedia @pgField
      }

      extend type Mutation {
        lightroomSyncMedia(input: LightroomSyncMediaInputPayload!): LightroomSyncMediaResponse
      }
    `,
    resolvers: {
      Mutation: {
        async lightroomSyncMedia(
          _mutation,
          args: { input: LightroomSyncMediaInputPayload },
          { pgClient }: OurGraphQLContext,
          resolveInfo,
        ) {
          console.log('syncing media')
          const { input } = args

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { mediaId: _id, masterMedia, isVirtualCopy, ...data } = input

          let modelId: number | null = null
          let mediaId: number | null = null

          const savepoint = `lightroom_sync_media`
          await pgClient.query(`SAVEPOINT ${savepoint}`)
          // await pgClient.query(`SET CONSTRAINTS ALL DEFERRED;`)

          try {
            const mediaData: MediaPatch = {
              title: data.title,
              headline: data.headline,
              caption: data.caption,
              gps: input.gps,
            }

            // try to find the LrMedia by uuid
            const { lightroom_media_id, media_id } = await findLrMediaByUUID(
              data.lrUuidIdentifier,
              pgClient,
            )

            // we should have the media and LrMedia saved already
            if (!isNil(masterMedia)) {
              const masterMediaResult = await findLrMediaByUUID(
                masterMedia.lrUuidIdentifier,
                pgClient,
              )
              mediaData.isVirtualCopy = isVirtualCopy
              mediaData.masterMediaId = masterMediaResult.media_id
            }

            if (!isNil(media_id)) {
              mediaId = media_id
            }

            if (!isNil(lightroom_media_id)) {
              modelId = lightroom_media_id
            }

            if (isNil(modelId) && isNil(mediaId)) {
              // 100% create new

              mediaId = await createMedia(mediaData, pgClient)

              const lrMediaId = await createLrMedia(
                {
                  catalogId: data.catalogId,
                  currentCollectionId: data.currentCollectionId,
                  localIdentifier: data.localIdentifier,
                  uuidIdentifier: data.lrUuidIdentifier,
                  mediaId,
                },
                pgClient,
              )
              modelId = lrMediaId
            } else {
              if (!isNil(mediaId)) {
                await db.media.updateMedia(mediaId, mediaData, pgClient)
              } else {
                // this could mean we have the new virtual copy
                throw new Error('Media ID is still nill, check the insert')
              }
            }

            // sync the albums
            const { album_id } = await retrieveAlbumByCollectionId(
              data.currentCollectionId,
              pgClient,
            )

            await syncMediaAndAlbum(mediaId, album_id, pgClient)

            // make an query to get the data from the DB and have all the gql fields
            const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
              sql.fragment`app_public.lightroom_media`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(modelId)}`)
              },
            )

            return {
              data: row,
            }
          } catch (error) {
            console.error(error)
            await pgClient.query(`ROLLBACK TO SAVEPOINT ${savepoint}`)
            // throw the error so the process can stop, we use catch to rollback the savepoint
            throw error
          } finally {
            // Release our savepoint so it doesn't conflict with other mutations
            await pgClient.query(`RELEASE SAVEPOINT ${savepoint}`)
            console.log('finally releasing')
          }
        },
      },
    },
  }
})
/**
 * Retrieve the album id that is connected to this collection Id
 * @param collectionId
 * @param pgClient
 */
async function retrieveAlbumByCollectionId(
  collectionId: number,
  pgClient: PoolClient,
): Promise<{ album_id: number }> {
  const query: QueryConfig = {
    text: `select alc.album_id from
    app_public._album_lightroom_collection alc
    where alc.collection_id = $1;`,
    values: [collectionId],
  }

  const {
    rows: [row],
  } = await pgClient.query(query)

  return row
}

/**
 * Connect album and media. On conflict do nothing
 * @param mediaId
 * @param albumId
 * @param pgClient
 */
async function syncMediaAndAlbum(mediaId: number, albumId: number, pgClient: PoolClient) {
  const { columns, values, preparedValues } = generateSQLPreparedValues<{
    mediaId: number
    albumId: number
  }>({ albumId, mediaId })

  const insertQuery: QueryConfig = {
    text: `insert into app_public._album_media (${columns}) values (${preparedValues}) on conflict do nothing returning *;`,
    values,
  }

  await pgClient.query(insertQuery)
}

/**
 * Reterive the list of connected albums and collections for this LrMedia
 * @param lrMediaId
 * @param pgClient
 */
// async function lrMediaCollectionAlbumList(
//   lrMediaId: number,
//   pgClient: PoolClient,
// ): Promise<{ collection_id: number; album_id: number }[] | null> {
//   const query: QueryConfig = {
//     text: `select lmu.collection_id, alc.album_id from
//     app_public._lightroom_media_uniqueness lmu
//     join app_public._album_lightroom_collection alc on alc.collection_id=lmu.collection_id
//     where lmu.media_id=$1;`,
//     values: [lrMediaId],
//   }

//   const { rows } = await pgClient.query(query)

//   return rows
// }

/**
 * Find LrMedia using the uuid
 * @param uuid
 * @param pgClient
 */
async function findLrMediaByUUID(
  uuid: string,
  pgClient: PoolClient,
): Promise<{ media_id: number | null; lightroom_media_id: number | null }> {
  const query: QueryConfig = {
    text: `select m.id as media_id, lm.id as lightroom_media_id
    from app_public.media  m
    join app_public.lightroom_media lm on lm.media_id = m.id
    where lm.uuid_identifier=$1;`,
    values: [uuid],
  }
  const {
    rows: [maybeRecord],
  } = await pgClient.query(query)

  if (isNil(maybeRecord)) {
    return {
      lightroom_media_id: null,
      media_id: null,
    }
  } else {
    return maybeRecord
  }
}

/**
 * Create the Lightroom Media and it's connections
 * @param data
 * @param pgClient
 */
async function createLrMedia(
  data: {
    mediaId: number
    uuidIdentifier: string
    catalogId: number
    currentCollectionId: number
    localIdentifier: number
  },
  pgClient: PoolClient,
): Promise<number> {
  const { columns, values, preparedValues } = generateSQLPreparedValues<{
    uuidIdentifier: string
    mediaId: number
  }>({ uuidIdentifier: data.uuidIdentifier, mediaId: data.mediaId })

  const insertQuery: QueryConfig = {
    text: `insert into app_public.lightroom_media (${columns}) values (${preparedValues}) RETURNING id;`,
    values,
  }
  // console.log(insertQuery)

  const {
    rows: [inserted],
  } = await pgClient.query(insertQuery)
  // console.log('inserted LrMedia', inserted)

  // map the LrMedia to the collection, catalog
  await insertLrMediaToUniqueness(
    {
      catalogId: data.catalogId,
      collectionId: data.currentCollectionId,
      localIdentifier: data.localIdentifier,
      mediaId: inserted.id,
    },
    pgClient,
  )
  return inserted.id
}
interface LrMediaUniquenessinputPayload {
  mediaId: number
  catalogId: number
  collectionId: number
  localIdentifier: number
}
/**
 * Map the LrMedia to the collection, catalog
 * **NOTE** using `ON CONFLICT DO NOTHING` so don't rely on the output of this method
 * @param data
 * @param pgClient
 */
async function insertLrMediaToUniqueness(
  data: LrMediaUniquenessinputPayload,
  pgClient: PoolClient,
) {
  const uniqMappingPrep = generateSQLPreparedValues<LrMediaUniquenessinputPayload>(data)

  const prepMapInsert = {
    text: `insert into app_public._lightroom_media_uniqueness (${uniqMappingPrep.columns}) values (${uniqMappingPrep.preparedValues}) on conflict do nothing returning *;`,
    values: uniqMappingPrep.values,
  }

  // map the lr media to the mapping table
  const {
    rows: [row],
  } = await pgClient.query(prepMapInsert)
  return row
}

/**
 * Create Media
 * @param data
 * @param pgClient
 */
async function createMedia(data: MediaPatch, pgClient: PoolClient): Promise<number> {
  const uniqMappingPrep = generateSQLPreparedValues(data)
  const insertQuery = {
    text: `insert into app_public.media (${uniqMappingPrep.columns}) values (${uniqMappingPrep.preparedValues}) RETURNING id;`,
    values: uniqMappingPrep.values,
  }

  // console.log(insertQuery)
  const {
    rows: [mediaInserted],
  } = await pgClient.query(insertQuery)
  // console.log('mediaInserted', mediaInserted)
  return mediaInserted.id
}
export default SyncMedia
