import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {ReportsLayout} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout',
)({
  component: memo(ReportsLayout),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'reports')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
