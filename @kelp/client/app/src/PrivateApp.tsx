import { Box, Main } from 'grommet'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAccessTokenSubscription } from './apps/auth/hooks/useAuthSubscription'
import { routes } from './routes'

const LeftSidebar = React.lazy(() => import('./components/navigation/LeftSidebar'))

/**
 * The application
 */
const PrivateApp: React.FC = () => {
  useAccessTokenSubscription()
  return (
    <Main>
      <React.Suspense fallback={'...'}>
        <Box direction="row" fill height={{ min: '100%' }}>
          <LeftSidebar />
          <Box fill overflow={{ horizontal: 'hidden', vertical: 'auto' }}>
            <Switch>
              <Route path={routes.private.timeline.path} exact={routes.private.timeline.exact}>
                <routes.private.timeline.component />
              </Route>
              <Route path={routes.private.album.path}>
                <routes.private.album.component />
              </Route>
              <Route path={routes.private.albums.path}>
                <routes.private.albums.component />
              </Route>
            </Switch>
          </Box>
        </Box>
      </React.Suspense>
    </Main>
  )
}

export default PrivateApp
