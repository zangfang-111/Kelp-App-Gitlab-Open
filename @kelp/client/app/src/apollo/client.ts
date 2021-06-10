import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  NormalizedCacheObject,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { nanoid } from 'nanoid'
import { graphqlUrl } from '../config'
import { getLocalAccessToken } from '../utils/getTokens'
import { activeNotifications, cache } from './cache'

const httpLink = createHttpLink({
  uri: graphqlUrl,
  credentials: 'same-origin', // enable this when we move to the api
})

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      console.error(message, locations, path)
      activeNotifications([
        {
          id: nanoid(),
          message,
          expiration: 3000, // miliseconds
          error: true,
        },
      ])
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = new ApolloLink((operation, forward) => {
  const token = getLocalAccessToken()
  operation.setContext(({ headers }) => ({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  }))
  return forward(operation)
})

export default function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const link = from([authLink, errorLink, httpLink])

  const client = new ApolloClient({
    connectToDevTools: true,
    link,
    cache,
  })
  return client
}
