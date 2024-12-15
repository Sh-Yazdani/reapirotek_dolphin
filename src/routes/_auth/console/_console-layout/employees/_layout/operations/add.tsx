import {createFileRoute} from '@tanstack/react-router'

import {AddEmployeeForm, withHelmet} from '@/components'
import {
  getGetAllEmployeesQueryOptions,
  getGetAllProjectsQueryOptions,
  getGetAllRolesQueryOptions,
} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/operations/add',
)({
  component: withHelmet(AddEmployeeForm, 'Add employee'),

  loader: ({context: {queryClient}}) =>
    Promise.all([
      queryClient.ensureQueryData(getGetAllEmployeesQueryOptions()),
      queryClient.ensureQueryData(getGetAllProjectsQueryOptions()),
      queryClient.ensureQueryData(getGetAllRolesQueryOptions()),
    ]),
})
