import {Outlet, useParams} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {LayoutWithAppBar, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `projects-details-navigation-tab-${index}`,
    'aria-controls': `projects-details-navigation-tab-panel-${index}`,
  }
}

const ProjectsNavigationTabs = () => {
  const {t} = useTranslation('projects')
  const {projectId} = useParams({
    select: (s) => ({projectId: s.projectId}),
    strict: false,
  })

  const tabs: NavigationTab[] = [
    {
      label: t('info.navbar.info', {defaultValue: 'Info'}),
      value: `/console/projects/${projectId}/info`,
    },
    {
      label: t('info.navbar.employees', {defaultValue: 'Employees'}),
      value: `/console/projects/${projectId}/employees`,
    },
    {
      label: t('info.navbar.gallery', {defaultValue: 'Gallery'}),
      value: `/console/projects/${projectId}/gallery`,
    },
    {
      label: t('info.navbar.equipment', {defaultValue: 'Equipment'}),
      value: `/console/projects/${projectId}/equipment`,
    },
    {
      label: t('info.navbar.materials', {defaultValue: 'Materials'}),
      value: `/console/projects/${projectId}/materials`,
    },
    {
      label: t('info.navbar.chart', {defaultValue: 'Chart'}),
      value: `/console/projects/${projectId}/chart`,
    },
    {
      label: t('info.navbar.tasks', {defaultValue: 'Tasks'}),
      value: `/console/projects/${projectId}/tasks`,
    },
  ]

  return <NavigationTabs a11yProps={a11yProps} tabs={tabs} />
}

export const ProjectDetailsLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<ProjectsNavigationTabs />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
