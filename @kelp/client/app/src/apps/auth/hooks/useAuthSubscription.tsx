/* eslint-disable no-console */
import { useApolloClient } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { isLoggedInVar } from '../../../apollo/cache'
import { MINUTE } from '../../../config'
import { routes } from '../../../routes'
import { getLocalAccessToken, setLocalAccessToken } from '../../../utils/getTokens'
import parseJwt from '../../../utils/parseJwt'

export function useAccessTokenSubscription() {
  const { getAccessTokenSilently, logout } = useAuth0()
  const history = useHistory()
  const client = useApolloClient()

  // set new access token silently
  const refresh = React.useCallback(async () => {
    try {
      console.log('silently getting token')
      const accessToken = await getAccessTokenSilently()
      setLocalAccessToken(accessToken)
    } catch (error) {
      console.error(error)
      // clear apollo cache
      client.resetStore()
      logout({ returnTo: `${window.location.origin}${routes.public.loggedOut.path}` })
    }
  }, [client, getAccessTokenSilently, logout])

  // redirect to auth0 login
  const login = React.useCallback(async () => {
    history.push(routes.public.login.path)
    await refresh()
  }, [history, refresh])

  React.useEffect(() => {
    const localAccessToken = getLocalAccessToken()
    // handle edge cases
    if (!localAccessToken) {
      console.log('no access token ')
      login()
    }

    // schedule the access token renewal in CPU friendly way
    const accessInterval = scheduleAccessTokenRenewal(refresh)

    if (getLocalAccessToken()) {
      isLoggedInVar(true)
    }

    return () => clearInterval(accessInterval)
  }, [login, refresh])
}

/**
 * The access token scheduler, it  calculates the safe zone for the refreshing the token on every page refresh. If user doesn't have ANY interaction within the given time the teoken renewal will fire 10 min before the expiration
 * @param refreshFunction
 */
function scheduleAccessTokenRenewal(refreshFunction: { (): Promise<void>; (): void }): number {
  const localAccessToken = getLocalAccessToken()
  if (!localAccessToken) {
    return 0
  }

  const payload = parseJwt(localAccessToken)

  // exp is in seconds, and the Date.now() is in miliseconds
  const expiresAt = payload.exp * 1000

  // in how many millis access_token will expire
  const delay = expiresAt - Date.now()
  // max allowed timestamp before expiration
  const minutes = 10 * MINUTE
  const safeZoneDelay = delay - minutes //  10 mins before

  if (delay <= safeZoneDelay) {
    console.log('refreshing token NOW')
    refreshFunction()
    return 0
  } else {
    console.log(
      'Scheduling refreshing access_token in %s minutes',
      Math.ceil(safeZoneDelay / 1000 / 60),
    )

    const tokenRenewalTimeout = setTimeout(() => {
      refreshFunction()
    }, safeZoneDelay)

    return tokenRenewalTimeout as any
  }
}

export default useAccessTokenSubscription
