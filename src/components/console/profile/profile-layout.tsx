import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `profile-navigation-tab-${index}`,
    'aria-controls': `profile-navigation-tabpanel-${index}`,
  }
}

const ProfileNavigatioTabs = () => {
  const {t} = useTranslation('profile')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.edit-profile', {defaultValue: 'Edit profile'}),
      value: '/console/profile',
    },
    {
      label: t('navbar.notification', {defaultValue: 'Notifications'}),
      value: '/console/profile/notifications',
    },
    {
      label: t('navbar.security', {defaultValue: 'Security'}),
      value: '/console/profile/security',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const ProfileLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<ProfileNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
