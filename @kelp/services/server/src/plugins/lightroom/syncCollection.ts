import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { QueryConfig } from 'pg'
import { isNil } from 'ramda'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'
import { generateSQLPreparedValues } from '../../utils/dbHelpers'
import makeCid from '../../utils/snCid'
export interface LightroomSyncCollectionInputPayload {
  id?: number
  title: string
  isSmart?: boolean
  catalogId: number
  localIdentifier: number
  searchDescription?: { [key: string]: any }
  parentId?: number
}

export const SyncCollection = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build

  return {
    typeDefs: gql`
      input LightroomSyncCollectionInputPayload {
        id: Int
        title: String!
        isSmart: Boolean
        catalogId: Int!
        localIdentifier: Int!
        searchDescription: JSON
        parentId: Int
      }

      type LightroomSyncCollectionResponse {
        collection: LightroomCollection @pgField
      }

      extend type Mutation {
        lightroomSyncCollection(
          input: LightroomSyncCollectionInputPayload!
        ): LightroomSyncCollectionResponse
      }
    `,
    resolvers: {
      Mutation: {
        async lightroomSyncCollection(
          _mutation,
          args: { input: LightroomSyncCollectionInputPayload },
          { pgClient }: OurGraphQLContext,
          resolveInfo,
        ) {
          const {
            input: { id, ...data },
          } = args

          let modelId = isNil(id) ? null : id

          await pgClient.query('SAVEPOINT lightroom_sync_collection')
          /**
           * internal sync method
           */
          async function sync() {
            /**
             * Try to get the existing collection
             */
            const {
              rows: [existingCollection],
            } = await pgClient.query(
              {
                text: `select lc.id
                          from app_public.lightroom_collection as lc
                          where lc.local_identifier=$1 and lc.catalog_id=$2
                          limit 1;`,
              },
              [data.localIdentifier, data.catalogId],
            )

            // we didn't find the record, create it
            if (isNil(existingCollection)) {
              const {
                columns,
                values,
                preparedValues,
              } = generateSQLPreparedValues<LightroomSyncCollectionInputPayload>(data)

              const insertQuery: QueryConfig = {
                text: `insert into app_public.lightroom_collection (${columns}) values (${preparedValues}) ON CONFLICT DO NOTHING RETURNING id;`,
                values,
              }

              const {
                rows: [lrCollectionRecord],
              } = await pgClient.query(insertQuery)

              // assign the id
              modelId = lrCollectionRecord.id

              // check is any collection connected to the album
              const {
                rows: [existingAlbumCollection],
              } = await pgClient.query(
                {
                  text: `select alc.album_id
                    from app_public.lightroom_collection as lc
                    inner join app_public._album_lightroom_collection as alc on lc.id=alc.collection_id
                    where lc.id=$1
                    limit 1;
                    `,
                },
                [modelId],
              )

              if (isNil(existingAlbumCollection)) {
                const albumCid = await makeCid(Buffer.from(data.title))
                const albumInsertQuery: QueryConfig = {
                  text: `insert into app_public.album (cid,is_smart,title) values ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id;`,
                  values: [albumCid, data.isSmart, data.title],
                }
                const {
                  rows: [albumRecord],
                } = await pgClient.query(albumInsertQuery)

                await pgClient.query(
                  `insert into app_public._album_lightroom_collection (album_id,collection_id) values($1,$2) RETURNING *;`,
                  [albumRecord.id, modelId],
                )
              }
            } else {
              modelId = existingCollection.id
              let albumId = null
              const {
                rows: [existingAlbumCollection],
              } = await pgClient.query<{
                album_id: number
              }>(
                {
                  text: `select alc.album_id from app_public.lightroom_collection as lc
                    inner join app_public._album_lightroom_collection as alc on lc.id=alc.collection_id
                    where lc.id=$1
                    limit 1;
                    `,
                },
                [modelId],
              )

              // we found the record, update lightroom collection, not the album
              const { columns, values } = generateSQLPreparedValues(data, true)

              const updateQuery: QueryConfig = {
                text: `update app_public.lightroom_collection as lc set ${columns} where lc.id=${modelId} returning *;`,
                values,
              }

              await pgClient.query(updateQuery)

              if (isNil(existingAlbumCollection)) {
                const albumCid = await makeCid(Buffer.from(data.title))
                const albumInsertQuery: QueryConfig = {
                  text: `insert into app_public.album (cid,is_smart,title) values ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id;`,
                  values: [albumCid, data.isSmart, data.title],
                }
                const {
                  rows: [albumRecord],
                } = await pgClient.query(albumInsertQuery)

                await pgClient.query(
                  `insert into app_public._album_lightroom_collection (album_id,collection_id) values($1,$2) RETURNING *;`,
                  [albumRecord.id, modelId],
                )
                albumId = albumRecord.id
              } else {
                albumId = existingAlbumCollection.album_id
                const albumUpdate = generateSQLPreparedValues(
                  {
                    cid: await makeCid(Buffer.from(data.title)),
                    title: data.title,
                  },
                  true,
                )

                await pgClient.query({
                  text: `update app_public.album as lc set ${albumUpdate.columns} where lc.id=${albumId} returning *;`,
                  values: albumUpdate.values,
                })
              }
            }
          }
          try {
            await sync()

            const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
              sql.fragment`app_public.lightroom_collection`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(modelId)}`)
              },
            )

            return {
              data: row,
            }
          } catch (error) {
            await pgClient.query('ROLLBACK TO SAVEPOINT lightroom_sync_collection')
            throw error
          } finally {
            // Release our savepoint so it doesn't conflict with other mutations
            await pgClient.query('RELEASE SAVEPOINT lightroom_sync_collection')
          }
        },
      },
    },
  }
})

export default SyncCollection
