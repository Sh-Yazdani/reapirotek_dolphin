import type {PaletteMode} from '@mui/material'
import {Box, Drawer, Stack} from '@mui/material'
import {Outlet} from '@tanstack/react-router'
import type {IconProps} from 'iconsax-react'
import {Camera, Home, Logout, Moon, Setting2, Sun1} from 'iconsax-react'
import {get} from 'lodash-es'
import type {FC} from 'react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useShallow} from 'zustand/react/shallow'

import type {SidebarItem} from '@/components'
import {
  CloseIcon,
  DashboardLogo,
  SidebarItemImpl,
  SidebarItemsList,
} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {useAuthenticationStore} from '@/store/auth'
import {useSidebarStore} from '@/store/sidebar'
import {useThemeModeStore} from '@/store/theme-mode'

const Sidebar = () => {
  const {isMobile, isSmallerThanDesktop} = useBreakpointValues()
  const {t} = useTranslation('operator')

  const [toggle, mode] = useThemeModeStore(
    useShallow((s) => [s.toggleTheme, s.mode]),
  )

  const themeSwitchIconMap: Record<PaletteMode, FC<IconProps>> = {
    dark: Sun1,
    light: Moon,
  }

  const themeSwitchTranslationMap: Record<PaletteMode, string> = {
    dark: t('sidebar.light-mode', {defaultValue: 'Light Mode'}),
    light: t('sidebar.dark-mode', {defaultValue: 'Dark Mode'}),
  }
  const ThemeModeIcon = get(themeSwitchIconMap, mode)
  const themeModeTranslation = get(themeSwitchTranslationMap, mode)

  const mainSidebarItems = (() => {
    const defaultSidebarItems: SidebarItem[] = [
      {
        title: t('sidebar.dashboard', {defaultValue: 'Dashboard'}),
        icon: Home,
        href: '/operator/dashboard',
        exact: false,
        index: 0,
      },
      {
        title: t('sidebar.videos', {defaultValue: 'Videos'}),
        icon: Camera,
        href: '/operator/videos',
        exact: false,
        index: 0,
      },
    ]

    return defaultSidebarItems
  })()

  const upperFooterSidebarItems: SidebarItem[] = [
    {
      title: themeModeTranslation,
      icon: ThemeModeIcon,
      href: '/operator/dashboard',
      onClick: toggle,
      index: 9,
    },
  ]

  const footerSidearItems: SidebarItem[] = [
    {
      title: t('sidebar.settings', {defaultValue: 'Settings'}),
      icon: Setting2,
      href: '/operator/settings',
      index: 10,
    },
    {
      title: t('sidebar.logout', {defaultValue: 'Logout'}),
      icon: Logout,
      href: '/operator/login',
      index: 11,
      onClick: useAuthenticationStore.getState().logout,
    },
  ]

  const close = useSidebarStore((s) => s.close)
  return (
    <Stack direction='column' height='100%' mb={2}>
      <Stack
        alignItems='center'
        direction='row'
        flexShrink={0}
        height={69}
        justifyContent='space-between'
        pl={{xs: 2, md: 3, lg: 5}}
        pr={2}
        width='100%'
      >
        <DashboardLogo height={48} width={160} />
        {isSmallerThanDesktop ? <CloseIcon onClick={close} /> : null}
      </Stack>

      <Box mb={1} mt={2}>
        <SidebarItemsList
          el={SidebarItemImpl}
          sidebarItems={mainSidebarItems}
        />
      </Box>

      <Stack mt='auto' spacing={1}>
        {isMobile ? (
          <SidebarItemsList
            el={SidebarItemImpl}
            sidebarItems={upperFooterSidebarItems}
          />
        ) : null}

        <SidebarItemsList
          el={SidebarItemImpl}
          sidebarItems={footerSidearItems}
        />
      </Stack>
    </Stack>
  )
}

const SidebarContent = () => {
  return (
    <Stack
      bgcolor='common.white'
      borderRight={(t) => ({
        lg: `1px solid ${t.palette.neutrals?.line}`,
      })}
      flexShrink={0}
      height='100%'
      overflow='auto'
      width={{md: 271}}
    >
      <Sidebar />
    </Stack>
  )
}

const SidebarMobileImpl = () => {
  const [isOpen, close] = useSidebarStore(
    useShallow((s) => [s.isOpen, s.close]),
  )

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      PaperProps={{sx: {width: {xs: '100%', md: 271}}}}
      onClose={close}
    >
      <SidebarContent />
    </Drawer>
  )
}

export const OperatorLayout: React.FC = () => {
  const {isSmallerThanDesktop} = useBreakpointValues()

  const sidebar = (() => {
    if (isSmallerThanDesktop) {
      return <SidebarMobileImpl />
    }

    return <SidebarContent />
  })()
  return (
    <Stack direction='row' height='100dvh' overflow='hidden' width='100%'>
      {sidebar}
      <Box overflow='hidden' width='100%'>
        <Outlet />
      </Box>
    </Stack>
  )
}
