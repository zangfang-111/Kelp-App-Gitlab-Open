/* eslint-disable no-case-declarations */
import { getSdk } from '@kelp/graphql/nodes'
import debug from 'debug'
import { Express, Request, Response } from 'express'
import { GraphQLClient } from 'graphql-request'

const isProd = process.env.NODE_ENV === 'production'

export const baseRedirectDomain = isProd ? 'https:/app.kelp.digital' : 'http://localhost:1234'
/**
 * make the logger
 * Example add this to .env file, or update the existing DEBUG
 * ```sh
 * DEBUG=lightroom:syncCatalog
 * ```
 */
const log = debug('lightroom:redirect')

/**
 * User is a decoded JwtUser
 */
// type RequestUser = JwtUser

/**
 * Sync catalog route. Used by Lightroom to sync its catalog
 *
 * This method modifies the Express app by adding the route
 * @param app Express app
 * @returns nothing, modifies the input param
 */
export function redirect(app: Express): void {
  app.get('/redirect/:type/:id', async (req: Request, res: Response) => {
    const client: GraphQLClient = app.get('graphqlClient')
    // client.setHeader('authorization', req.headers.authorization as string)
    const sdk = getSdk(client)

    const { type, id } = req.params
    try {
      switch (type) {
        case 'lrCollection':
          const d = await sdk.LightroomCatalog({
            id: parseInt(id, 10),
          })
          res.json(d)
          return
        case 'lrMedia':
          break
        case 'lrRendition':
          break

        default:
          throw new Error(`${type} is not supported`)
      }
      res.json({ params: req.params })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message })
    }
  })
}
