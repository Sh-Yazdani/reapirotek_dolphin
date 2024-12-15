import {createFileRoute} from '@tanstack/react-router'

import {OperatorDashboard, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/dashboard/_layout/',
)({
  component: withHelmet(OperatorDashboard, 'Dashboard'),
})
