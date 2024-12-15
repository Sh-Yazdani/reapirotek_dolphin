import {createFileRoute} from '@tanstack/react-router'

import {ReportDetails, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/$reportId',
)({
  component: withHelmet(ReportDetails, 'Report details'),
})
