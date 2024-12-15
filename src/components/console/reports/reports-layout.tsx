import {Outlet, useRouteContext} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `Equipment-navigation-tab-${index}`,
    'aria-controls': `Equipment-navigation-tabpanel-${index}`,
  }
}

const ReportsNavigatioTabs = () => {
  const {t} = useTranslation('reports')

  const ability = useRouteContext({from: '/_auth', select: (s) => s.ability})
  const tabs: NavigationTab[] = (() => {
    const defaultTabs = []

    if (ability.can('read', 'reports')) {
      defaultTabs.push({
        label: t('navbar.reports-list', {defaultValue: 'Reports list'}),
        value: '/console/reports',
        index: 0,
      })
    }

    if (ability.can('read', 'reports')) {
      defaultTabs.push({
        label: t('navbar.operartions', {defaultValue: 'Operations'}),
        value: '/console/reports/operations',
        index: 1,
      })
    }

    if (ability.can('export', 'reports')) {
      defaultTabs.push({
        label: t('navbar.export', {defaultValue: 'Export'}),
        value: '/console/reports/export',
        index: 2,
      })
    }

    return defaultTabs
  })()

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const ReportsLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<ReportsNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
