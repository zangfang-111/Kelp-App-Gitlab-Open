/* eslint-disable no-console */
require('newrelic')

import chalk from 'chalk'
import { createServer } from 'http'
import { makeApp } from './app'
async function main() {
  // Create our HTTP server
  const httpServer = createServer()

  // Make our application (loading all the middleware, etc)
  const app = await makeApp(httpServer)

  // Add our application to our HTTP server
  httpServer.addListener('request', app)

  // And finally, we open the listen port
  const PORT = 7666
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
    console.log(`GraphQL: ${chalk.bold.underline(`http://localhost:${actualPort}/graphql`)}`)
    console.log(`GraphiQL: ${chalk.bold.underline(`http://localhost:${actualPort}/graphiql`)}`)
    console.log()
  })
}

main().catch((e) => {
  console.error('Fatal error occurred starting server!')
  console.error(e)
  process.exit(101)
})
