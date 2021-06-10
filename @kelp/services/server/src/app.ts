import express, { Express } from 'express'
import { Server } from 'http'
import { Middleware } from 'postgraphile'
import { installDatabasePools, installPostGraphile } from './middleware'
import { sanitizeEnv } from './utils'

// Server may not always be supplied, e.g. where mounting on a sub-route
export function getHttpServer(app: Express): Server | void {
  return app.get('httpServer')
}

export function getWebsocketMiddlewares(
  app: Express,
): Middleware<express.Request, express.Response>[] {
  return app.get('websocketMiddlewares')
}

/**
 * Main Function to make an express app
 * @param httpServer
 */
export async function makeApp(httpServer: Server): Promise<Express> {
  sanitizeEnv()
  /*
   * Our Express server
   */
  const app = express()
  /*
   * Getting access to the HTTP server directly means that we can do things
   * with websockets if we need to (e.g. GraphQL subscriptions).
   */
  app.set('httpServer', httpServer)

  /*
   * When we're using websockets, we may want them to have access to
   * sessions/etc for authentication.
   */
  const websocketMiddlewares: Middleware<express.Request, express.Response>[] = []
  app.set('websocketMiddlewares', websocketMiddlewares)

  // Install db pools
  installDatabasePools(app)

  // Postgraphile Graphql server initialization
  installPostGraphile(app)

  /**
   * Our home route, info on server etc....
   */
  app.get('/', (req, res) => {
    res.json({
      name: 'Kelp Graphql API',
      version: 1,
      up: true,
      upSince: new Date(),
      routes: {
        graphql: '/graphql',
        graphiql: '/graphiql',
      },
    })
  })

  return app
}
