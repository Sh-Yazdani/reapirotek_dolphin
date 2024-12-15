import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {NavigationTabs, OperatorLayoutWithAppBar} from '@/components'

function a11yProps(index: number) {
  return {
    id: `operator-dashboard-navigation-tab-${index}`,
    'aria-controls': `operator-dashboard-navigation-tabpanel-${index}`,
  }
}

const OperatorVideosLayoutNavbar = () => {
  const {t} = useTranslation('operator')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.videos', {defaultValue: 'Videos'}),
      value: '/operator/videos',
    },
    {
      label: t('navbar.record-video', {defaultValue: 'Record video'}),
      value: '/operator/videos/record',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const OperatorVideosLayout: React.FC = () => {
  return (
    <OperatorLayoutWithAppBar navbar={<OperatorVideosLayoutNavbar />}>
      <Outlet />
    </OperatorLayoutWithAppBar>
  )
}
