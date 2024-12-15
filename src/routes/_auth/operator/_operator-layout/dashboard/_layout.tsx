import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {OperatorDashboardLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/dashboard/_layout',
)({
  component: memo(OperatorDashboardLayout),
})
