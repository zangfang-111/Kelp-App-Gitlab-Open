import { Avatar, Box, Button, Nav, Sidebar, Stack, Text } from 'grommet'
import { Analytics, Configure, FingerPrint, Folder, PersonalComputer, Time } from 'grommet-icons'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { sidebarWidth } from '../../theme'

const src = '//eu.ui-avatars.com/api/?name=kelp_digital&length=1'

const SidebarButton = ({ icon, label, link, ...rest }) => (
  <Box pad="medium" fill>
    {link && (
      <Link to={link}>
        <Button gap="medium" alignSelf="start" plain icon={icon} label={label} {...rest} />
      </Link>
    )}

    {!link && <Button gap="medium" alignSelf="start" plain icon={icon} label={label} {...rest} />}
  </Box>
)

const SidebarButtonMemo = React.memo(SidebarButton)

const SidebarHeader = () => (
  <Box align="center" gap="small" direction="row" margin={{ bottom: 'large' }}>
    <Stack alignSelf="start" anchor="top-right">
      <Avatar src={src} />
      <Box pad="xsmall" background="orange" round responsive={false} />
    </Stack>
    <Text>Kelp Digital</Text>
  </Box>
)

export const LeftSidebar: React.FC = () => {
  return (
    <Sidebar
      width={{ min: sidebarWidth }}
      background="background-sidebar"
      // round="small"
      header={<SidebarHeader />}
      // footer={<Button icon={<Help />} hoverIndicator />}
    >
      <Nav gap="small">
        <SidebarButtonMemo
          icon={<Time />}
          label="Timeline"
          hoverIndicator
          link={routes.private.timeline.path}
        />
        <SidebarButtonMemo
          icon={<Folder />}
          label="Albums"
          hoverIndicator
          link={routes.private.albums.path}
        />
        <SidebarButtonMemo
          icon={<FingerPrint />}
          label="Claim Copyrights"
          hoverIndicator
          link={routes.private.albums.path}
        />
        <SidebarButtonMemo
          icon={<PersonalComputer />}
          label="Devices"
          hoverIndicator
          link={routes.private.albums.path}
        />
        <SidebarButtonMemo
          icon={<Analytics />}
          label="Dashboard"
          hoverIndicator
          link={routes.private.albums.path}
        />
        <SidebarButtonMemo
          icon={<Configure />}
          label="Configure"
          hoverIndicator
          link={routes.private.albums.path}
        />
      </Nav>
    </Sidebar>
  )
}

export default LeftSidebar
