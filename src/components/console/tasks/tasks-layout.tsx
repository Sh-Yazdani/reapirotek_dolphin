import {Outlet} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `tasks-navigation-tab-${index}`,
    'aria-controls': `tasks-navigation-tabpanel-${index}`,
  }
}

const TasksNavigationTabs = () => {
  const {t} = useTranslation('tasks')
  const tabs: NavigationTab[] = [
    {
      label: t('navbar.all-tasks', {defaultValue: 'All Tasks'}),
      value: '/console/tasks',
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const TasksLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<TasksNavigationTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
