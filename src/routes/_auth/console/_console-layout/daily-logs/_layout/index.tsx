import {createFileRoute} from '@tanstack/react-router'

import {DailyLogsTable, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/daily-logs/_layout/',
)({
  component: withHelmet(DailyLogsTable, 'Daily logs'),
})
