import { getSdk, LightroomSyncMediaInputPayload } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { isNil } from 'ramda'
import { JwtUser, LightroomSyncMediaPayload } from '../interfaces'
import { baseRedirectDomain } from './redirect'

/**
 * make the logger
 * Example add this to .env file, or update the existing DEBUG
 * ```sh
 * DEBUG=lightroom:syncCatalog
 * ```
 */
const log = debug('lightroom:syncMedia')

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
export function syncMedia(app: Express): void {
  app.post('/sync-media', async (req: Request, res: Response) => {
    log('processing the sync-media')
    try {
      const client: GraphQLClient = app.get('graphqlClient')
      client.setHeader('authorization', req.headers.authorization as string)
      const sdk = getSdk(client)

      const { body, user: rUser } = req

      const user: RequestUser = rUser as any

      if (!user || !user.permissions.includes('sync:lr:media')) {
        throw new Error('Not enough privileges')
      }
      console.log(JSON.stringify(body))
      const {
        mediaId,
        catalogId,
        currentCollectionId,
        localIdentifier,
        lrUuidIdentifier,
        caption,
        headline,
        title,
        isVirtualCopy,
        masterMedia,
        gps,
      } = body as LightroomSyncMediaPayload

      const variables: LightroomSyncMediaInputPayload = {
        mediaId,
        catalogId,
        currentCollectionId,
        localIdentifier,
        lrUuidIdentifier,
        title,
        headline,
        caption,
        isVirtualCopy,
        masterMedia,
        gps,
      }

      // console.log(JSON.stringify(variables))

      const collection = await sdk.SyncLightroomMedia(variables)

      if (isNil(collection.data) || isNil(collection.data.lightroomSyncMedia)) {
        throw new Error('Data is nil.')
      }

      const result = collection.data.lightroomSyncMedia.media

      if (isNil(result)) {
        throw new Error('Media not synced properly')
      }

      res.json({
        data: {
          ...result,
          publishedUrl: `${baseRedirectDomain}/media/${mediaId}`,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message })
    }
  })
}
