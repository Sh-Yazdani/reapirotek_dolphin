import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {DashboardLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/_dashboard-layout',
)({
  component: memo(DashboardLayout),
})
