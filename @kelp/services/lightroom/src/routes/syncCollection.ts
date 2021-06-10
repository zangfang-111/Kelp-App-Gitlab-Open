import { getSdk, LightroomSyncCollectionInputPayload } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { isNil } from 'ramda'
import { JwtUser } from '../interfaces'
import { baseRedirectDomain } from './redirect'

/**
 * make the logger
 * Example add this to .env file, or update the existing DEBUG
 * ```sh
 * DEBUG=lightroom:syncAlbum
 * ```
 */
const log = debug('lightroom:syncCollection')

/**
 * User is a decoded JWT
 */
type RequestUser = JwtUser

/**
 * Sync Collection route. Used by Lightroom to sync its collection
 *
 * This method modifies the Express app by adding the route
 * @param app Express app
 * @returns nothing, modifies the input param
 */
export function syncCollection(app: Express): void {
  app.post('/sync-collection', async (req: Request, res: Response) => {
    log('processing the sync-collection')

    try {
      const client: GraphQLClient = app.get('graphqlClient')
      client.setHeader('authorization', req.headers.authorization as string)
      const sdk = getSdk(client)

      const { body, user: rUser } = req

      const user: RequestUser = rUser as any

      if (!user || !user.permissions.includes('sync:lr:collection')) {
        throw new Error('Not enough privileges')
      }
      const {
        id,
        title,
        catalogId,
        localIdentifier,
        isSmart,
        parentId,
        searchDescription,
      }: LightroomSyncCollectionInputPayload = body

      const variables: LightroomSyncCollectionInputPayload = {
        id,
        title,
        catalogId,
        localIdentifier,
        isSmart,
        parentId,
        searchDescription,
      }

      const collection = await sdk.SyncLightroomCollection(variables)

      if (isNil(collection.data) || isNil(collection.data.lightroomSyncCollection)) {
        throw new Error('Data is nil.')
      }

      const result = collection.data.lightroomSyncCollection.collection
      if (isNil(result)) {
        throw new Error(`Error with syncing the Collection ${id}`)
      }

      const albumId = result.albumList.edges[0].node.id
      res.json({
        data: {
          ...result,
          publishedUrl: `${baseRedirectDomain}/albums/${albumId}`,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message })
    }
  })
}
