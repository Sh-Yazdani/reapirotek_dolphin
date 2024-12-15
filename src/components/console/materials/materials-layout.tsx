import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `equipment-navigation-tab-${index}`,
    'aria-controls': `equipment-navigation-tabpanel-${index}`,
  }
}

const MaterialsNavigatioTabs = () => {
  const {t} = useTranslation('materials')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.materials-list', {defaultValue: 'Materials list'}),
      value: '/console/materials',
    },
    {
      label: t('navbar.operartions', {defaultValue: 'Operations'}),
      value: '/console/materials/operations',
    },
    {
      label: t('navbar.export', {defaultValue: 'Export'}),
      value: '/console/materials/export',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const MaterialsLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<MaterialsNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
