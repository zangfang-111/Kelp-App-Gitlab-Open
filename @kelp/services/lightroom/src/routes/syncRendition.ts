import { getSdk, SyncRenditionMutationVariables } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { nanoid } from 'nanoid'
import { isNil } from 'ramda'
import { JwtUser, LrRenditionSyncPayload } from '../interfaces'
import { baseRedirectDomain } from './redirect'

/**
 * make the logger
 * Example add this to .env file, or update the existing DEBUG
 * ```sh
 * DEBUG=lightroom:syncRendition
 * ```
 */
const log = debug('lightroom:syncRendition')

/**
 * User is a decoded JWT
 */
type RequestUser = JwtUser

/**
 * Sync rendition route. Used by Lightroom to sync its rendition
 *
 * This method modifies the Express app by adding the route
 * @param app Express app
 * @returns nothing, modifies the input param
 */
export function syncRendition(app: Express): void {
  app.post('/sync-rendition', async (req: Request, res: Response) => {
    log('processing the sync-rendition')
    try {
      const client: GraphQLClient = app.get('graphqlClient')
      client.setHeader('authorization', req.headers.authorization as string)
      const sdk = getSdk(client)
      const { body, user: rUser } = req

      const user: RequestUser = rUser as any

      if (!user || !user.permissions.includes('sync:lr:rendition')) {
        throw new Error('Not enough privileges')
      }
      const {
        renditionId,
        fileFormat,
        fileName,
        fileVersion,
        height,
        isSmartPreview,
        mediaId,
        size,
        storagePath,
        width,
      } = body as LrRenditionSyncPayload

      const variables: SyncRenditionMutationVariables = {
        cid: nanoid(),
        renditionId: isNil(renditionId) ? null : renditionId,
        mediaId,
        height,
        width,
        imageStoragePath: storagePath,
        fileFormat,
        fileName,
        fileVersion,
        isMaster: true,
        isSmartPreview,
        size,
      }

      const rendition = await sdk.SyncRendition(variables)

      if (isNil(rendition.data) || isNil(rendition.data.lightroomSyncRendition)) {
        throw new Error('Data is nil.')
      }

      const result = rendition.data.lightroomSyncRendition.rendition
      if (!result) {
        throw new Error('rendition is not synced')
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
