import {Outlet, useRouteContext} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `projects-navigation-tab-${index}`,
    'aria-controls': `projects-navigation-tab-panel-${index}`,
  }
}

const ProjectsNavigationTabs = () => {
  const {t} = useTranslation('projects')
  const ability = useRouteContext({from: '/_auth', select: (s) => s.ability})
  const tabs = (() => {
    const defaultTabs: NavigationTab[] = []

    if (ability.can('read', 'projects')) {
      defaultTabs.push({
        label: t('navbar.projects-list', {defaultValue: 'Projects list'}),
        value: '/console/projects',
        index: 0,
      })
    }

    if (ability.can('add', 'projects') || ability.can('edit', 'projects')) {
      defaultTabs.push({
        label: t('navbar.operations', {defaultValue: 'Operations'}),
        value: '/console/projects/operations',
        index: 1,
      })
    }

    if (ability.can('export', 'projects')) {
      defaultTabs.push({
        label: t('navbar.export', {defaultValue: 'Export'}),
        value: '/console/projects/export',
        index: 2,
      })
    }

    return defaultTabs
  })()

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const ProjectsListLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<ProjectsNavigationTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
