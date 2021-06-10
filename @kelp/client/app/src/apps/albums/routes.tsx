import * as React from 'react'

/**
 * routes map holds all route names in the app.
 * Use it to prevent typos when accessing routes.
 */
export const routes = {
  public: {},
  private: {
    albums: {
      path: '/albums',
      component: React.lazy(() => import('./Albums')),
    },
    album: {
      path: '/albums/:cid',
      component: React.lazy(() => import('./Album')),
    },
  },
}

export default routes
