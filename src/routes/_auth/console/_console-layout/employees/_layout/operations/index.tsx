import {createFileRoute} from '@tanstack/react-router'

import {EmployeesOperations, withHelmet} from '@/components'
import {getGetAllEmployeesQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/operations/',
)({
  component: withHelmet(EmployeesOperations, 'Employees operations'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEmployeesQueryOptions()),
})
