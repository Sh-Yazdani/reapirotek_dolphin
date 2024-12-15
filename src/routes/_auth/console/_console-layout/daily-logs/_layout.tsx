import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {DailyLogsLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/daily-logs/_layout',
)({
  component: memo(DailyLogsLayout),
})
