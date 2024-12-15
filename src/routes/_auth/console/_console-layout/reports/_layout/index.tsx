import {createFileRoute} from '@tanstack/react-router'

import {ReportsTable, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/',
)({
  component: withHelmet(ReportsTable, 'Reports'),
})
