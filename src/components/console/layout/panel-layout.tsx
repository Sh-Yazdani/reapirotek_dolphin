import type {PaletteMode} from '@mui/material'
import {Avatar, Box, Drawer, Stack, Tooltip, Typography} from '@mui/material'
import {Link, Outlet, useRouteContext} from '@tanstack/react-router'
import type {IconProps} from 'iconsax-react'
import {
  Box1,
  Briefcase,
  Clock,
  Fatrows,
  Home,
  Logout,
  Moon,
  Note,
  Notepad2,
  Profile2User,
  Setting2,
  Sun1,
  TaskSquare,
  User,
} from 'iconsax-react'
import {get, isFunction, orderBy} from 'lodash-es'
import type {FC} from 'react'
import React, {useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {useShallow} from 'zustand/react/shallow'

import {CloseIcon, IconContainer} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {useOverflow} from '@/hooks/useOverflow'
import {useAuthenticationStore} from '@/store/auth'
import {useSidebarStore} from '@/store/sidebar'
import {useThemeModeStore} from '@/store/theme-mode'

import {DashboardLogo} from './dashboard-logo'

export interface SidebarItem {
  title: string
  icon: React.FC<IconProps>
  onClick?: () => void
  href?: string
  exact?: boolean
  index: number
}

interface SidebarItemImplProps extends SidebarItem {}

export const SidebarItemImpl = ({
  exact = false,
  href,
  icon: Icon,
  onClick,
  title,
}: SidebarItemImplProps) => {
  const {isMobile} = useBreakpointValues()

  const close = useSidebarStore((s) => s.close)

  const component = isFunction(onClick) ? Box : Link
  const linkProps = (() => {
    if (isFunction(onClick)) return {}
    return {activeProps: {className: 'active'}, activeOptions: {exact}}
  })()
  const sidebarItemTextRef = useRef<HTMLParagraphElement>(null!)
  const overflowing = useOverflow(sidebarItemTextRef)
  return (
    <Box
      {...linkProps}
      component={component}
      sx={{
        color: 'neutrals.gray',
        '&.active': {color: 'primary.main'},
      }}
      to={href}
      onClick={() => {
        close()
        onClick?.()
      }}
    >
      <Stack
        alignItems='center'
        direction='row'
        pl={{xs: 2, md: 3, lg: 5}}
        pr={2}
        py={{xs: 0.5, md: 1}}
        spacing={{xs: 2, md: 3}}
        sx={{cursor: 'pointer'}}
      >
        <IconContainer
          component={Icon}
          flexShrink={0}
          size={isMobile ? 20 : 24}
        />

        <Tooltip title={overflowing.refXOverflowing ? title : ''}>
          <Typography
            ref={sidebarItemTextRef}
            color='inherit'
            variant='t2'
            noWrap
          >
            {title}
          </Typography>
        </Tooltip>
      </Stack>
    </Box>
  )
}

interface SidebarItemsListProps {
  sidebarItems: SidebarItem[]
  el: React.FC<SidebarItemImplProps>
}

export const SidebarItemsList = ({
  el: El,
  sidebarItems,
}: SidebarItemsListProps) => {
  const content = orderBy(sidebarItems, 'index').map((item) => {
    return <El key={item.title} {...item} />
  })

  return <Stack spacing={1}>{content}</Stack>
}

const SidebarProfileDropdown = () => {
  const {isMobile} = useBreakpointValues()
  const close = useSidebarStore((s) => s.close)

  return (
    <Link to='/console/profile' onClick={close}>
      <Stack
        alignItems='center'
        direction='row'
        pl={{xs: 2, md: 3, lg: 5}}
        pr={2}
        py={{xs: 0.5, md: 1}}
        spacing={{xs: 2, md: 3}}
      >
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            height: isMobile ? 20 : 25,
            width: isMobile ? 20 : 25,
            p: 0.5,
          }}
        >
          <User />
        </Avatar>

        <Typography color='secondary.main' fontWeight='medium' variant='t2'>
          John Doe
        </Typography>
      </Stack>
    </Link>
  )
}

// eslint-disable-next-line max-lines-per-function
const Sidebar = () => {
  const {isMobile, isSmallerThanDesktop} = useBreakpointValues()
  const {t} = useTranslation('sidebar')
  const ability = useRouteContext({from: '/_auth', select: (s) => s.ability})
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
        title: t('sidebar.home', {defaultValue: 'Home'}),
        icon: Home,
        href: '/console/dashboard',
        exact: false,
        index: 0,
      },
      {
        title: t('sidebar.projects', {defaultValue: 'Projects'}),
        icon: Briefcase,
        href: '/console/projects',
        index: 1,
      },
      {
        title: t('sidebar.daily-logs', {defaultValue: 'Daily logs'}),
        icon: Notepad2,
        href: '/console/daily-logs',
        index: 5,
      },
      {
        title: t('sidebar.crew-time-card', {defaultValue: 'Crew Time Card'}),
        icon: Clock,
        href: '/console/crew-time-card',
        index: 6,
      },
      {
        title: t('sidebar.reports', {defaultValue: 'Reports'}),
        icon: Note,
        href: '/console/reports',
        index: 7,
      },
    ]

    if (ability.can('manage', 'tasks')) {
      defaultSidebarItems.push({
        title: t('sidebar.task', {defaultValue: 'Tasks'}),
        icon: TaskSquare,
        href: '/console/tasks',
        exact: false,
        index: 8,
      })
    }

    if (ability.can('read', 'employees')) {
      defaultSidebarItems.push({
        title: t('sidebar.user-management', {defaultValue: 'user-management'}),
        icon: Profile2User,
        href: '/console/employees',
        index: 2,
      })
    }

    if (ability.can('read', 'equipment')) {
      defaultSidebarItems.push({
        title: t('sidebar.equipment', {defaultValue: 'Equipment'}),
        icon: Box1,
        href: '/console/equipment',
        index: 3,
      })
    }

    if (ability.can('read', 'materials')) {
      defaultSidebarItems.push({
        title: t('sidebar.materials', {defaultValue: 'Materials'}),
        icon: Fatrows,
        href: '/console/materials',
        index: 4,
      })
    }

    return defaultSidebarItems
  })()

  const upperFooterSidebarItems: SidebarItem[] = [
    {
      title: themeModeTranslation,
      icon: ThemeModeIcon,
      href: '/console',
      onClick: toggle,
      index: 9,
    },
  ]

  const footerSidearItems: SidebarItem[] = [
    {
      title: t('sidebar.setting', {defaultValue: 'Setting'}),
      icon: Setting2,
      href: '/console/settings',
      index: 10,
    },
    {
      title: t('sidebar.logout', {defaultValue: 'Logout'}),
      icon: Logout,
      href: '/console/login',
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
        <SidebarProfileDropdown />
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

export const PanelLayout: React.FC = () => {
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
