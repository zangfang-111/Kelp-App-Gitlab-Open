import { getSdk, SyncLightroomCatalogMutationVariables } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { isNil } from 'ramda'
import { JwtUser, LrCatalogSyncPayload } from '../interfaces'

/**
 * make the logger
 * Example add this to .env file, or update the existing DEBUG
 * ```sh
 * DEBUG=lightroom:syncCatalog
 * ```
 */
const log = debug('lightroom:syncCatalog')

/**
 * User is a decoded JWT
 */
type RequestUser = JwtUser

/**
 * Sync catalog route. Used by Lightroom to sync its catalog
 *
 * This method modifies the Express app by adding the route
 * @param app Express app
 * @returns nothing, modifies the input param
 */
export function syncCatalog(app: Express): void {
  app.post('/sync-catalog', async (req: Request, res: Response) => {
    log('processing the sync-catalog')
    try {
      const client: GraphQLClient = app.get('graphqlClient')
      client.setHeader('authorization', req.headers.authorization as string)
      const sdk = getSdk(client)

      const { body, user: rUser } = req

      const user: RequestUser = rUser as any

      if (!user || !user.permissions.includes('sync:lr:catalog')) {
        throw new Error('Not enough privileges')
      }
      const { id, name }: LrCatalogSyncPayload = body

      const variables: SyncLightroomCatalogMutationVariables = {
        id,
        name: name,
        collectionSets: body.schema.collectionSets,
        collections: body.schema.collections,
      }

      const catalog = await sdk.SyncLightroomCatalog(variables)

      if (isNil(catalog.data) || isNil(catalog.data.lightroomSyncCatalog)) {
        throw new Error('Data is nil.')
      }

      const result = catalog.data.lightroomSyncCatalog.catalog
      if (!result) {
        throw new Error('Catalog is not synced')
      }
      res.json({ id: result.id })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message })
    }
  })
}
