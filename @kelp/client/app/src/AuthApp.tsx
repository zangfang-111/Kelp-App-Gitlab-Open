import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'

/**
 * The application
 */
const AuthApp: React.FC = () => {
  return (
    <React.Suspense fallback="...">
      <Switch>
        <Route path={routes.public.login.path}>
          <routes.public.login.component />
        </Route>
        <Route path={routes.public.loggedOut.path}>
          <routes.public.loggedOut.component />
        </Route>
        <Route path={routes.public.authCallback.path}>
          <routes.public.authCallback.component />
        </Route>
      </Switch>
    </React.Suspense>
    // <div>
    //   <div style={{ padding: '2em', backgroundColor: 'blue' }}>
    //     <img width="100" src={LogoPng} />
    //   </div>
    //   <div style={{ padding: '2em', backgroundColor: 'maroon' }}>
    //     <img width="100" src={LogoSvg} />
    //   </div>
    // </div>
  )
}

export default AuthApp
