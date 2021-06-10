require('newrelic')

import chalk from 'chalk'
import compression from 'compression'
import fetch from 'cross-fetch'
import { GraphQLClient } from 'graphql-request'
import { createServer } from 'http'
// import https from 'https'
import { makeApp } from './app'

const graphqlEndpoint = process.env.ROOT_URL + '/graphql'

export function initApolloClient(accessToken?: string): GraphQLClient {
  const client = new GraphQLClient(graphqlEndpoint, {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    fetch,
  })
  return client
}

async function main() {
  // Create our HTTP server
  const httpServer = createServer()
  // const httpsServer = https.createServer()

  // Make our application (loading all the middleware, etc)
  const app = await makeApp(httpServer)

  app.use(compression)

  const graphqlClient = initApolloClient()
  // set the client for later use
  app.set('graphqlClient', graphqlClient)

  // And finally, we open the listen port

  // if (process.env.NODE_ENV === 'production') {
  //   httpsServer.addListener('request', app)
  //   httpsServer.listen(443, () => {
  //     console.log()
  //     console.log(chalk.green(`Listening on port ${chalk.bold(443)}`))
  //     console.log()
  //     console.log(`Site: ${chalk.bold.underline(`https://localhost:${443}`)}`)
  //     console.log()
  //   })
  // } else {
  const PORT = 9876

  // Add our application to our HTTP server
  httpServer.addListener('request', app)
  httpServer.listen(PORT, () => {
    const address = httpServer.address()
    const actualPort: string =
      typeof address === 'string'
        ? address
        : address && address.port
        ? String(address.port)
        : String(PORT)
    console.log()
    console.log(chalk.green(`Listening on port ${chalk.bold(actualPort)}`))
    console.log()
    console.log(`Site: ${chalk.bold.underline(`http://localhost:${actualPort}`)}`)
    console.log()
  })
  // }
}

main().catch((e) => {
  console.error('Fatal error occurred starting server!')
  console.error(e)
  process.exit(101)
})
