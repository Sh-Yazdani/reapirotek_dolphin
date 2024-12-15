import {createFileRoute, redirect} from '@tanstack/react-router'

import {ReportsOperations, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/operations/',
)({
  component: withHelmet(ReportsOperations, 'Reports operations'),
  beforeLoad({context: {ability}}) {
    if (!ability.can('add', 'reports')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
