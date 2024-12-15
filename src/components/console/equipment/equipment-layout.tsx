import {Outlet} from '@tanstack/react-router'
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

const EquipmentNavigatioTabs = () => {
  const {t} = useTranslation('equipment')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.equipment-list', {defaultValue: 'Equipment list'}),
      value: '/console/equipment',
    },
    {
      label: t('navbar.operartions', {defaultValue: 'Operations'}),
      value: '/console/equipment/operations',
    },
    {
      label: t('navbar.export', {defaultValue: 'Export'}),
      value: '/console/equipment/export',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const EquipmentLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<EquipmentNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
