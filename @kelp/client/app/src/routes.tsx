import { concat, mergeDeepWith } from 'ramda'
import * as React from 'react'
import { routes as AlbumRoutes } from './apps/albums'
import AuthCallback from './apps/auth/page/AuthCallback'
import LoggedOut from './apps/auth/page/LoggedOut'
import Login from './apps/auth/page/Login'
import MatchAllRoute from './MatchAllRoute'

const TimelinePage = React.lazy(() => import('./apps/timeline/Timeline'))

const changeMe = {
  public: {
    lightroom: {
      path: '/lightroomCallback',
      component: Login,
    },
    login: {
      path: '/auth/login',
      component: Login,
    },
    loggedOut: {
      path: '/auth/loggedOut',
      component: LoggedOut,
    },
    authCallback: {
      path: '/auth/callback',
      component: AuthCallback,
    },
    noMatch: {
      path: '*',
      component: MatchAllRoute,
    },
  },
  private: {
    timeline: {
      path: '/',
      exact: true,
      component: TimelinePage,
    },
  },
}

/**
 * routes map holds all route names in the app.
 * Use it to prevent typos when accessing routes.
 */

export const routes = mergeDeepWith(concat, AlbumRoutes, changeMe)
