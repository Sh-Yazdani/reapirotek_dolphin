import {createFileRoute} from '@tanstack/react-router'

import {EditEmployeePermissions, withHelmet} from '@/components'
import {getGetEmployeeByIdQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/permissions/edit/$employeeId',
)({
  component: withHelmet(EditEmployeePermissions, 'Edit user roles'),
  loader: ({context: {queryClient}, params: {employeeId}}) =>
    queryClient.ensureQueryData(getGetEmployeeByIdQueryOptions(employeeId)),
})
