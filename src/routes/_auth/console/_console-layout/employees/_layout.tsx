import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {EmployeesLayout} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout',
)({
  component: memo(EmployeesLayout),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'employees')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
