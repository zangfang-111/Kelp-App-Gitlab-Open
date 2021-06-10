/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useAuth0 } from '@auth0/auth0-react'
import { useRegisterMutation } from '@kelp/graphql'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { isLoggedInVar } from '../../../apollo/cache'
import { routes } from '../../../routes'
import { setLocalAccessToken } from '../../../utils/getTokens'
/**
 * Auth Callback page, handles many things.
 * ```markdown
 * Callback page is in charge of:
 *
 * 1. handling the the auth session and code from the Auth0
 * 2. fetching and saving the AccessToken from the Auth0
 * 3. registering user to the SensioPhoto API
 *
 * ```
 */
const AuthCallbackPage: React.FC = () => {
  const { isAuthenticated, isLoading: authenticating, user, getAccessTokenSilently } = useAuth0()
  const history = useHistory()

  const [registerMutation, { error }] = useRegisterMutation()
  if (error) {
    console.error(error)
    alert('Error registering the user, check console log')
  }
  // set new access token silently

  React.useEffect(() => {
    async function refresh() {
      const accessToken = await getAccessTokenSilently()
      setLocalAccessToken(accessToken)
      const [service, identifier] = user.sub.split('|')
      const userInput = {
        user: {
          email: user.email,
          name: user.name,
          email_verified: true,
          avatarUrl: user.picture,
        },
        authService: {
          service: service,
          identifier: identifier,
        },
      }
      registerMutation({
        variables: {
          input: userInput,
        },
      })
      // when everything is ready trigger this
      isLoggedInVar(true)

      history.push(routes.private.timeline.path)
    }

    if (isAuthenticated) {
      // wait 1second to get the access_token, we have plenty of time on this page
      // there are times when the refresh takes unknown amount of time that's why is like this, unless there is a better way that aliveiates this issue LEAVE IT AS IT IS!!!!
      refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, history, isAuthenticated, registerMutation])

  if (authenticating) {
    return null
  } else {
    return <div>connected and logged in</div>
  }
}

export default AuthCallbackPage
