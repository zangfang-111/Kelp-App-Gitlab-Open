import { Rendition, RenditionInput } from '@kelp/graphql/nodes'
import * as db from '@kelp/worker/db'
import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { PoolClient, QueryConfig } from 'pg'
import { isNil } from 'ramda'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'
import { generateSQLPreparedValues } from '../../utils/dbHelpers'
interface LightroomSyncRenditionPayload {
  renditionId?: number
  rendition: RenditionInput
}

// woss-test kusama account
export const defaultCreator =
  'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network'

export const SyncRendition = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build

  return {
    typeDefs: gql`
      type LightroomSyncRenditionResponse {
        rendition: Rendition @pgField
      }

      extend type Mutation {
        lightroomSyncRendition(
          renditionId: Int
          rendition: RenditionInput!
        ): LightroomSyncRenditionResponse
      }
    `,
    resolvers: {
      Mutation: {
        async lightroomSyncRendition(
          _mutation,
          args: LightroomSyncRenditionPayload,
          { pgClient, user, workerUtils }: OurGraphQLContext,
          resolveInfo,
        ) {
          console.log('syncing rendition')
          const {
            rendition: { mediaId },
            renditionId,
          } = args

          if (isNil(mediaId)) {
            throw new Error('mediaId is missing in payload')
          }

          await pgClient.query('SAVEPOINT lightroom_sync_rendition')
          /**
           * internal sync method, returns the RenditionID
           */
          async function sync(): Promise<number> {
            let modelId = isNil(renditionId) ? null : renditionId

            const maybeMasterRendition = await masterRenditionExistsBy(mediaId, pgClient)

            if (!maybeMasterRendition.exists) {
              // 100% create new rendition
              const model = await createNewRendition(args.rendition, pgClient)
              modelId = model.id
            } else {
              modelId = maybeMasterRendition.id as number
              await db.rendition.updateRendition(modelId, args.rendition, pgClient)
            }

            return modelId
          }

          let modelId: number | null = null
          try {
            // find Media in DB, this will throw error if doesn't exist
            await mediaExistsById(mediaId, pgClient)

            // do the sync
            modelId = await sync()

            const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
              sql.fragment`app_public.rendition`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(modelId)}`)
              },
            )

            return {
              data: row,
            }
          } catch (error) {
            await pgClient.query('ROLLBACK TO SAVEPOINT lightroom_sync_rendition')
            throw error
          } finally {
            // Release our savepoint so it doesn't conflict with other mutations
            await pgClient.query('RELEASE SAVEPOINT lightroom_sync_rendition')

            // trigger the job when the savepoint is released
            if (!isNil(modelId) && !isNil(mediaId)) {
              await workerUtils.addJob('syncMediaMetadata', {
                mediaId,
                renditionId: modelId,
                user,
              })
            }
          }
        },
      },
    },
  }
})

/**
 * Create new simple rendition and add it to the pending for the PoE generation
 * @param data
 * @param pgClient
 */
async function createNewRendition(data: RenditionInput, pgClient: PoolClient): Promise<Rendition> {
  const { columns, values, preparedValues } = generateSQLPreparedValues<RenditionInput>(data)

  const insertQuery: QueryConfig = {
    text: `INSERT INTO app_public.rendition (${columns}) VALUES(${preparedValues}) RETURNING *;`,
    values,
  }
  const {
    rows: [row],
  } = await pgClient.query<Rendition>(insertQuery)

  // create pending poe for the rendition
  await db.pending_tx.createPendingTx(
    {
      mediaId: data.mediaId,
      renditionId: row.id,
    },
    'proof',
    'photo',
    defaultCreator,
    'poe',
    pgClient,
  )

  return row
}

/**
 * Does media exist? throws Error if doesn't
 * @param mediaId
 * @param pgClient
 */
async function mediaExistsById(mediaId: number, pgClient: PoolClient): Promise<void> {
  const query: QueryConfig = {
    text: `select m.id as media_id
    from app_public.media m
    where m.id=$1;`,
    values: [mediaId],
  }
  const {
    rows: [maybeRecord],
  } = await pgClient.query(query)

  if (isNil(maybeRecord)) {
    throw new Error("Media doesn't exist")
  }
}
/**
 * Does media already have master rendition
 * @param mediaId
 * @param pgClient
 */
async function masterRenditionExistsBy(
  mediaId: number,
  pgClient: PoolClient,
): Promise<{ exists: boolean; id: number | null }> {
  const query: QueryConfig = {
    text: `select r.id from app_public.media m
    join app_public.rendition r on r.media_id = m.id
    where r.is_master = true and r.media_id = $1;`,
    values: [mediaId],
  }
  const {
    rows: [maybeRecord],
  } = await pgClient.query(query)

  if (isNil(maybeRecord)) {
    return { exists: false, id: null }
  } else {
    return { exists: true, id: maybeRecord.id }
  }
}

export default SyncRendition
