import {createFileRoute} from '@tanstack/react-router'

import {EmployeesExportTable, withHelmet} from '@/components'
import {getGetAllEmployeesQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/export',
)({
  component: withHelmet(EmployeesExportTable, 'Export employees'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEmployeesQueryOptions()),
})
