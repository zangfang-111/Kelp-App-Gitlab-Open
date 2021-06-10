import { ApolloProvider } from '@apollo/client'
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react'
import { Grommet, GrommetProps } from 'grommet'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createApolloClient from './apollo/client'
import AuthApp from './AuthApp'
import { auth0 } from './config'
import PrivateApp from './PrivateApp'
import { routes } from './routes'
import theme from './theme'
import GlobalStyle from './theme/globalStyles'

const grommetConfig: GrommetProps = {
  theme: theme,
  full: true,
  themeMode: 'dark',
  userAgent: window.navigator.userAgent,
}

const auth0Config: Auth0ProviderOptions = {
  domain: auth0.domain,
  clientId: auth0.clientId,
  redirectUri: window.location.origin + routes.public.authCallback.path,
  useRefreshTokens: true,
}
const apolloClient = createApolloClient()
/**
 * Setup the Indexed Db here
 * https://github.com/assuncaocharles/react-indexed-db
 */

/**
 * Set up all needed stuff after we init in the dom
 * ```md
 * Setting up:
 *
 * * apollo client
 * * Auth0 provider
 * * Grommet theme
 * * routes
 * ```
 */
const Root: React.FC = () => {
  return (
    <Grommet {...grommetConfig} full>
      <ApolloProvider client={apolloClient}>
        <Auth0Provider {...auth0Config}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route path={'/auth'}>
                <AuthApp />
              </Route>
              <Route path={'/'}>
                <AuthApp />
                <PrivateApp />
              </Route>
              <Route path={routes.public.noMatch.path}>
                <Route path={'/app/'}></Route>
                <routes.public.noMatch.component />
              </Route>
            </Switch>
          </Router>
        </Auth0Provider>
      </ApolloProvider>
    </Grommet>
  )
}

export default Root
