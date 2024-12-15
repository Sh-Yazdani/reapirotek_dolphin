import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `dashboard-navigation-tab-${index}`,
    'aria-controls': `dashboard-navigation-tabpanel-${index}`,
  }
}

const DashboardNavigatioTabs = () => {
  const {t} = useTranslation('dashboard')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.dashboard', {defaultValue: 'Dashboard'}),
      value: '/console/dashboard',
    },
    {
      label: t('navbar.tasks', {defaultValue: 'Tasks'}),
      value: '/console/dashboard/tasks',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const DashboardLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<DashboardNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
