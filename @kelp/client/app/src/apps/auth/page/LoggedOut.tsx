import { Box, Text } from 'grommet'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes'

const LoggedOutPage: React.FC = () => {
  // const history = useHistory()

  // React.useEffect(() => {
  //   removeLocalAccessToken()

  //   setTimeout(() => {
  //     history.push(routes.public.login.path)
  //   }, 3000)
  // }, [history])

  return (
    <Box direction="column" align="center" justify="center" fill>
      <Text>
        You have successfully logged out click <Link to={routes.public.login.path}>to login</Link>
      </Text>
    </Box>
  )
}

export default LoggedOutPage
