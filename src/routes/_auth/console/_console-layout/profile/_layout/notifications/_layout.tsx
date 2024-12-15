import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {NotificationsLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout/notifications/_layout',
)({
  component: memo(NotificationsLayout),
})
