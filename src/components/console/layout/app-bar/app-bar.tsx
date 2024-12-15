import {Box, Container, Stack} from '@mui/material'
import {HambergerMenu} from 'iconsax-react'
import type {ReactNode} from 'react'

import {DashboardLogo} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {useSidebarStore} from '@/store/sidebar'

import {EmailsPopover} from './emails-popover'
import {LanguagePopover} from './language-poprover'
import {NotificationsPopover} from './notifications-popover'
import {ThemeSwitch} from './theme-switch'

interface MainPanelLayoutAppBarProps {
  children: ReactNode
  hasNotification?: boolean
  hasEmail?: boolean
}

export const AppBar: React.FC<MainPanelLayoutAppBarProps> = ({
  children,
  hasEmail = true,
  hasNotification = true,
}) => {
  const open = useSidebarStore((s) => s.open)

  const {isMobile, isSmallerThanDesktop} = useBreakpointValues()
  const iconSize = isSmallerThanDesktop ? 20 : 24

  return (
    <Box bgcolor='common.white'>
      <Stack
        alignItems='center'
        borderBottom={(t) => `1px solid ${t.palette.neutrals?.line}`}
        direction='row'
        flexShrink={0}
        height={{xs: 48, md: 69}}
        justifyContent='space-between'
        // px={2}
        spacing={0}
      >
        {isSmallerThanDesktop ? (
          <Stack alignItems='center' direction='row' pl={2} spacing={1}>
            <HambergerMenu
              className='cursor-pointer'
              size={24}
              onClick={open}
            />
            <DashboardLogo hasName={!isMobile} height={36} />
          </Stack>
        ) : null}

        {!isSmallerThanDesktop ? (
          <Box flex={1} flexShrink={1} minWidth={0}>
            <Container sx={{px: (t) => `${t.spacing(2)} !important`}}>
              {children}
            </Container>
          </Box>
        ) : null}

        <Stack
          alignItems='center'
          direction='row'
          flexShrink={0}
          justifyContent='flex-end'
          pr={2}
          spacing={{xs: 2.5, md: 3}}
          width={{lg: 276}}
        >
          {hasNotification ? (
            <NotificationsPopover iconSize={iconSize} />
          ) : null}
          {hasEmail ? <EmailsPopover iconSize={iconSize} /> : null}
          <LanguagePopover iconSize={iconSize} />
          {!isMobile && <ThemeSwitch iconSize={iconSize} />}
        </Stack>
      </Stack>
      {isSmallerThanDesktop ? (
        <Box
          borderBottom={(t) => `1px solid ${t.palette.neutrals?.line}`}
          px={{xs: 2, md: 2}}
        >
          {children}
        </Box>
      ) : null}
    </Box>
  )
}
