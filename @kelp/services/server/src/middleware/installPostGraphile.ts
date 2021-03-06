import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many'
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector'
import PgPubsub from '@graphile/pg-pubsub'
import { Express, Request, Response } from 'express'
import { makeWorkerUtils, WorkerUtils } from 'graphile-worker'
import { Pool, PoolClient } from 'pg'
import {
  enhanceHttpServerWithSubscriptions,
  makePluginHook,
  Middleware,
  postgraphile,
  PostGraphileOptions,
} from 'postgraphile'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'
import { getHttpServer, getWebsocketMiddlewares } from '../app'
import plugins from '../plugins'
import { getUserClaimsFromRequest } from '../utils/jwt'
import { getAuthPgPool, getRootPgPool } from './installDatabasePools'

export interface UserJwtContext {
  jwt: {
    claims: {
      sub: string
      identity: {
        name: string
        identifier: string
      }
    }
  }
}
export interface OurGraphQLContext {
  pgClient: PoolClient
  user: UserJwtContext
  rootPgPool: Pool
  workerUtils: WorkerUtils
}

/**
 * Add here the plugin you want to include
 */
const appendPlugins = [
  // Adds support for our `postgraphile.tags.json5` file
  // TagsFilePlugin,
  ...plugins,
  // Simplifies the field names generated by PostGraphile.
  PgSimplifyInflectorPlugin,
  ConnectionFilterPlugin,
  PgManyToManyPlugin,
]

// const TagsFilePlugin = makePgSmartTagsFromFilePlugin(
//   // We're using JSONC for VSCode compatibility; also using an explicit file
//   // path keeps the tests happy.
//   resolve(__dirname, '../../postgraphile.tags.jsonc'),
// )

const isTest = process.env.NODE_ENV === 'test'

// function uuidOrNull(input: string | number | null): UUID | null {
//   if (!input) return null
//   const str = String(input)
//   if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str)) {
//     return str
//   } else {
//     return null
//   }
// }

const isDev = process.env.NODE_ENV === 'development'
//const isTest = process.env.NODE_ENV === "test";
const graphiqlBrandingTweak = {
  ['postgraphile:graphiql:html'](html: string) {
    console.log('Applying GraphiQL Branding Tweak...')
    return html.replace(
      '</head>',
      `<style type="text/css">
        div.topBar > div.title > div {
          visibility: hidden;
          display: none !important;
        }
        div.topBar > div.title::after {
          content: "GraphiQL for Kelp Digital"
        }
        @media (prefers-color-scheme: dark) {
          html {
            filter: invert(1) hue-rotate(180deg);
          }
          html img,
          picture,
          video{
              filter: invert(1) hue-rotate(180deg);
          }
        }
      </style>
      </head>`,
    )
  },
}

const pluginHook = makePluginHook([
  // Add the pub/sub realtime provider
  PgPubsub,
  graphiqlBrandingTweak,
])

interface PostGraphileOptionsOptions {
  websocketMiddlewares?: Middleware<Request, Response>[]
  rootPgPool: Pool
}

export function getPostGraphileOptions(
  params: PostGraphileOptionsOptions,
): PostGraphileOptions<Request, Response> {
  const { websocketMiddlewares, rootPgPool } = params

  const options: PostGraphileOptions<Request, Response> = {
    // This is for PostGraphile server plugins: https://www.graphile.org/postgraphile/plugins/
    pluginHook,

    // This is so that PostGraphile installs the watch fixtures, it's also needed to enable live queries
    ownerConnectionString: process.env.DATABASE_URL,

    // On production we still want to start even if the database isn't available.
    // On development, we want to deal nicely with issues in the database.
    // For these reasons, we're going to keep retryOnInitFail enabled for both environments.
    retryOnInitFail: !isTest,

    // Add websocket support to the PostGraphile server; you still need to use a subscriptions plugin such as
    // @graphile/pg-pubsub
    subscriptions: true,
    websocketMiddlewares,

    // enableQueryBatching: On the client side, use something like apollo-link-batch-http to make use of this
    enableQueryBatching: true,

    // dynamicJson: instead of inputting/outputting JSON as strings, input/output raw JSON objects
    dynamicJson: true,

    // ignoreRBAC=false: honour the permissions in your DB - don't expose what you don't GRANT
    ignoreRBAC: false,

    // ignoreIndexes=false: honour your DB indexes - only expose things that are fast
    ignoreIndexes: false,

    // setofFunctionsContainNulls=false: reduces the number of nulls in your schema
    setofFunctionsContainNulls: false,

    // Enable GraphiQL in development
    graphiql: isDev || !!process.env.ENABLE_GRAPHIQL,

    // Use a fancier GraphiQL with `prettier` for formatting, and header editing.
    enhanceGraphiql: true,
    // Allow EXPLAIN in development (you can replace this with a callback function if you want more control)
    allowExplain: isDev,

    // Disable query logging - we're using morgan
    disableQueryLog: true,

    /*
     * To use the built in PostGraphile error handling, you can use the
     * following code instead of `handleErrors` above. Using `handleErrors`
     * gives you much more control (and stability) over how errors are
     * output to the user.
     * See https://www.graphile.org/postgraphile/debugging/
     */

    extendedErrors:
      isDev || isTest
        ? [
            'errcode',
            'severity',
            'detail',
            'hint',
            'position',
            'internalPosition',
            'internalQuery',
            'where',
            'schema',
            'table',
            'column',
            'dataType',
            'constraint',
          ]
        : ['errcode'],
    showErrorStack: isDev || isTest,

    // Automatically update GraphQL schema when database changes
    watchPg: isDev,
    enableCors: true,

    // Keep data/schema.graphql up to date
    sortExport: true,

    exportGqlSchemaPath: isDev ? `${__dirname}/../../../../data/schema.graphql` : undefined,

    /*
     * Plugins to enhance the GraphQL schema, see:
     *   https://www.graphile.org/postgraphile/extending/
     */
    appendPlugins,

    /*
     * Plugins we don't want in our schema
     */
    skipPlugins: [
      // Disable the 'Node' interface
      // NodePlugin,
    ],

    graphileBuildOptions: {
      /*
       * Any properties here are merged into the settings passed to each Graphile
       * Engine plugin - useful for configuring how the plugins operate.
       */

      // Makes all SQL function arguments except those with defaults non-nullable
      pgStrictFunctions: true,
    },

    /*
     * Postgres transaction settings for each GraphQL query/mutation to
     * indicate to Postgres who is attempting to access the resources. These
     * will be referenced by RLS policies/triggers/etc.
     *
     * Settings set here will be set using the equivalent of `SET LOCAL`, so
     * certain things are not allowed. You can override Postgres settings such
     * as 'role' and 'search_path' here; but for settings indicating the
     * current user, session id, or other privileges to be used by RLS policies
     * the setting names must contain at least one and at most two period
     * symbols (`.`), and the first segment must not clash with any Postgres or
     * extension settings. We find `jwt.claims.*` to be a safe namespace,
     * whether or not you're using JWTs.
     */
    async pgSettings(req: Request) {
      if (isItIntrospectionQuery(JSON.stringify(req.body))) return {}

      const { serviceName, identifier, sub } = await getUserClaimsFromRequest(req)
      return {
        role: process.env.DATABASE_VISITOR,
        'jwt.claims.sub': sub,
        'jwt.claims.identity.name': serviceName,
        'jwt.claims.identity.identifier': identifier,
        statement_timeout: '3000',
      }
    },
    /*
     * These properties are merged into context (the third argument to GraphQL
     * resolvers). This is useful if you write your own plugins that need
     * access to, e.g., the logged in user.
     */
    async additionalGraphQLContextFromRequest(req: Request): Promise<Partial<OurGraphQLContext>> {
      if (isItIntrospectionQuery(JSON.stringify(req.body))) return {}

      const { serviceName, identifier, sub } = await getUserClaimsFromRequest(req)
      const workerUtils = await makeWorkerUtils({})
      return {
        user: {
          jwt: {
            claims: {
              sub: sub,
              identity: {
                name: serviceName,
                identifier: identifier,
              },
            },
          },
        },
        rootPgPool,
        workerUtils,
      }
    },
  }
  return options
}

export default function installPostGraphile(app: Express) {
  const websocketMiddlewares = getWebsocketMiddlewares(app)

  const authPgPool = getAuthPgPool(app)
  const rootPgPool = getRootPgPool(app)

  const middleware = postgraphile<Request, Response>(
    authPgPool,
    ['app_public', 'network'],
    getPostGraphileOptions({
      websocketMiddlewares,
      rootPgPool,
    }),
  )

  app.set('postgraphileMiddleware', middleware)

  app.use(middleware)

  const httpServer = getHttpServer(app)
  if (httpServer) {
    enhanceHttpServerWithSubscriptions(httpServer, middleware)
  }
}

export const isItIntrospectionQuery = (query: string): boolean => {
  return query.includes('IntrospectionQuery')
}
