import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {EmployeesTable} from '@/components/console/employees'
import {getGetAllEmployeesQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/',
)({
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEmployeesQueryOptions()),
  component: withHelmet(EmployeesTable, 'Employees'),
})
