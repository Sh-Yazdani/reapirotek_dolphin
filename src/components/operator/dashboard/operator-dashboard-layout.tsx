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

const OperatorDashboardNavigatioTabs = () => {
  const {t} = useTranslation('operator')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.dashboard', {defaultValue: 'Dashboard'}),
      value: '/operator/dashboard',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const OperatorDashboardLayout: React.FC = () => {
  return (
    <OperatorLayoutWithAppBar navbar={<OperatorDashboardNavigatioTabs />}>
      <Outlet />
    </OperatorLayoutWithAppBar>
  )
}
