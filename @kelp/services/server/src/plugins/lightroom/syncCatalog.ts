import { gql, makeExtendSchemaPlugin } from 'graphile-utils'
import { QueryConfig } from 'pg'
import { isNil } from 'ramda'
import { OurGraphQLContext } from '../../middleware/installPostGraphile'
import { generateSQLPreparedValues } from '../../utils/dbHelpers'

export interface LightroomSyncCatalogInputPayload {
  id?: number
  name: string
  tags: string[]
  // uuid: string
  collections: LightroomCollection[]
  collectionSets: LightroomCollectionSet[]
}
export interface LightroomCollectionSet {
  name: string
  localIdentifier: number
  collections: LightroomCollection[]
}

export interface LightroomCollection {
  isSmartCollection: boolean
  name: string
  localIdentifier: number
}

export const SyncCatalog = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build

  return {
    typeDefs: gql`
      input LightroomSyncCatalogInputPayload {
        id: Int
        name: String
        tags: [String]
        collections: JSON!
        collectionSets: JSON!
      }

      type LightroomSyncCatalogResponse {
        catalog: LightroomCatalog @pgField
      }

      extend type Mutation {
        lightroomSyncCatalog(input: LightroomSyncCatalogInputPayload!): LightroomSyncCatalogResponse
      }
    `,
    resolvers: {
      Mutation: {
        async lightroomSyncCatalog(
          _mutation,
          args: { input: LightroomSyncCatalogInputPayload },
          { pgClient }: OurGraphQLContext,
          resolveInfo,
        ) {
          console.log('syncing catalog')
          const {
            input: { id, ...data },
          } = args

          let modelId = isNil(id) ? null : id

          await pgClient.query('SAVEPOINT lightroom_sync_catalog')
          /**
           * internal sync method
           */
          async function sync() {
            /**
             * Try to get the existing catalog
             */
            const {
              rows: [existingCatalog],
            } = await pgClient.query(
              {
                text: `select lc.id
                          from app_public.lightroom_catalog as lc
                          where lc.name=$1
                          limit 1;`,
              },
              [data.name],
            )

            // we didn't find the record, create it
            if (isNil(existingCatalog)) {
              const {
                columns,
                values,
                preparedValues,
              } = generateSQLPreparedValues<LightroomSyncCatalogInputPayload>(data)

              const insertQuery: QueryConfig = {
                text: `insert into app_public.lightroom_catalog (${columns}) values (${preparedValues}) ON CONFLICT DO NOTHING RETURNING id;`,
                values,
              }

              const {
                rows: [inserted],
              } = await pgClient.query(insertQuery)

              // assign the id
              modelId = inserted.id
            } else {
              // we found the record, update lightroom collection, not the album
              modelId = existingCatalog.id
              const { columns, values } = generateSQLPreparedValues(data, true)

              const updateQuery: QueryConfig = {
                text: `update app_public.lightroom_catalog  as lc set ${columns} where lc.id=${modelId} returning *;`,
                values,
              }

              await pgClient.query(updateQuery)
            }
          }
          try {
            await sync()

            const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
              sql.fragment`app_public.lightroom_catalog`,
              (tableAlias, sqlBuilder) => {
                sqlBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(modelId)}`)
              },
            )

            return {
              data: row,
            }
          } catch (error) {
            await pgClient.query('ROLLBACK TO SAVEPOINT lightroom_sync_catalog')
            throw error
          } finally {
            // Release our savepoint so it doesn't conflict with other mutations
            await pgClient.query('RELEASE SAVEPOINT lightroom_sync_catalog')
          }
        },
      },
    },
  }
})

export default SyncCatalog
