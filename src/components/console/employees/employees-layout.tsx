import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `employees-navigation-tab-${index}`,
    'aria-controls': `employees-navigation-tabpanel-${index}`,
  }
}

const EmployeesNavigatioTabs = () => {
  const {t} = useTranslation('employees')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.employees-list', {defaultValue: 'Employees list'}),
      value: '/console/employees',
    },
    {
      label: t('navbar.operartions', {defaultValue: 'Operations'}),
      value: '/console/employees/operations',
    },
    {
      label: t('navbar.export', {defaultValue: 'Export'}),
      value: '/console/employees/export',
    },
    {
      label: t('navbar.roles', {defaultValue: 'Roles'}),
      value: '/console/employees/roles',
    },
    {
      label: t('navbar.permissions', {defaultValue: 'Permissions'}),
      value: '/console/employees/permissions',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const EmployeesLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<EmployeesNavigatioTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
