import {Box, Button, Card, Stack, tabClasses} from '@mui/material'
import {Outlet, useParams} from '@tanstack/react-router'
import React from 'react'
import {useTranslation} from 'react-i18next'

import type {NavigationTab} from '@/components'
import {NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `project-files-navigation-tab-${index}`,
    'aria-controls': `project-files-navigation-tabpanel-${index}`,
  }
}

interface NotificationsListNavigationTabsProps {}

const NotificationTabs: React.FC<NotificationsListNavigationTabsProps> = () => {
  const {t} = useTranslation('profile')

  const tabs: NavigationTab[] = [
    {
      label: t('notifications.navbar.all', {defaultValue: 'All'}),
      value: `/console/profile/notifications/all`,
    },
    {
      label: t('notifications.navbar.unread', {defaultValue: 'Unread'}),
      value: `/console/profile/notifications/unread`,
    },
    {
      label: t('notifications.navbar.read', {defaultValue: 'Read'}),
      value: `/console/profile/notifications/read`,
    },
  ]

  return (
    <NavigationTabs
      a11yProps={a11yProps}
      tabs={tabs}
      tabsProps={{
        sx: {
          py: 0,
          [`.${tabClasses.root}`]: {
            py: `1px !important`,
          },
        },
      }}
    />
  )
}

export const NotificationsLayout = () => {
  const status = useParams({
    from: '/_auth/console/_console-layout/profile/_layout/notifications/_layout/$status',
    select: (s) => s.status,
  })
  return (
    <Card sx={{pt: 1}}>
      <Stack gap={3}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <NotificationTabs />
          {status !== 'read' && (
            <Button size='small' variant='text'>
              Mark all as read
            </Button>
          )}
        </Stack>
        <Box>
          <Outlet />
        </Box>
      </Stack>
    </Card>
  )
}
