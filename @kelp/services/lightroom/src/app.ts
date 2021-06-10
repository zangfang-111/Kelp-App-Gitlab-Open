/* eslint-disable no-console */
import express, { Express } from 'express'
import jwt from 'express-jwt'
import { Server } from 'http'
import jwksRsa from 'jwks-rsa'
import { version } from '../package.json'
import { redirect } from './routes/redirect'
import { removeMediaFromCollection } from './routes/removeMediaFromCollection'
import { syncCatalog } from './routes/syncCatalog'
import { syncCollection } from './routes/syncCollection'
import { syncMedia } from './routes/syncMedia'
import { syncRendition } from './routes/syncRendition'

const { AUTH_JWKS_URI, AUTH_AUDIENCE, AUTH_TOKEN_ISSUER } = process.env

/**
 * Main Function to make an express app
 * @param httpServer
 */
export async function makeApp(httpServer: Server): Promise<Express> {
  /*
   * Our Express server
   */
  const app = express()
  app.set('httpServer', httpServer)
  app.use(express.json()) // for parsing application/json
  app.use(
    jwt({
      // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: AUTH_JWKS_URI as string,
      }),

      // Validate the audience and the issuer.
      audience: AUTH_AUDIENCE,
      issuer: AUTH_TOKEN_ISSUER,
      algorithms: ['RS256'],
      // @TODO not working
    }),
    // .unless({ path: [/\//, /\/redirect\/:type\/:id/] }),
  )

  redirect(app)
  syncCatalog(app)
  syncCollection(app)
  syncMedia(app)
  syncRendition(app)
  removeMediaFromCollection(app)

  /**
   * Our home route, info on server etc....
   */
  app.get('/', (req, res) => {
    res.json({
      name: 'Lightroom integration',
      version,
      up: true,
      upSince: new Date(),
    })
  })

  return app
}
