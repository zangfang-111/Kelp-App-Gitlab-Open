import { getSdk, LightroomRemoveMediaFromCollectionInputPayload } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'
import { JwtUser, LightroomRemoveMediaFromCollectionInput } from '../interfaces'

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
export function removeMediaFromCollection(app: Express): void {
  app.post('/remove-media-from-collection', async (req: Request, res: Response) => {
    log('processing the remove-media-from-collection')
    try {
      const client: GraphQLClient = app.get('graphqlClient')
      client.setHeader('authorization', req.headers.authorization as string)
      const sdk = getSdk(client)

      const { body, user: rUser } = req
      console.log(body)
      const user: RequestUser = rUser as any

      if (!user || !user.permissions.includes('sync:lr:media')) {
        throw new Error('Not enough privileges')
      }
      const { lrCollectionId, mediaId }: LightroomRemoveMediaFromCollectionInput = body

      const variables: LightroomRemoveMediaFromCollectionInputPayload = {
        lrCollectionId,
        mediaId,
      }

      const r = await sdk.LightroomRemoveMediaFromCollection(variables)

      if (!r.data) {
        throw new Error('Removing not successful')
      }
      res.json({ ...r.data })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message })
    }
  })
}
