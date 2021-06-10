import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Text } from 'grommet'
import * as React from 'react'

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Box align="center" justify="center" fill>
      <Box width="medium" align="center" gap="medium">
        <Text>Please login to continue.</Text>
        <Button onClick={loginWithRedirect} primary label="Log In" />
      </Box>
    </Box>
  )
}

export default Login
