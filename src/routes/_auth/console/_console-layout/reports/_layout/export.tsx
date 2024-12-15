import {createFileRoute, redirect} from '@tanstack/react-router'

import {ReportsExportTable, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/export',
)({
  component: withHelmet(ReportsExportTable, 'Export reports'),
  beforeLoad({context: {ability}}) {
    if (!ability.can('export', 'reports')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
