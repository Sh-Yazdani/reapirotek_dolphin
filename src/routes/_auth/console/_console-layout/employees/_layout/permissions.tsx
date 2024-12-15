import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Fragment} from 'react'

import {EmployeesWithRolesTable, withHelmet} from '@/components'
import {
  getGetAllEmployeesQueryOptions,
  getGetAllRolesQueryOptions,
} from '@/lib/data-provider/api/__generated'

const Component = () => (
  <Fragment>
    <EmployeesWithRolesTable />
    <Outlet />
  </Fragment>
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/permissions',
)({
  component: withHelmet(Component, 'Roles and permissions'),
  loader: ({context: {queryClient}}) =>
    Promise.all([
      queryClient.ensureQueryData(getGetAllEmployeesQueryOptions()),
      queryClient.ensureQueryData(getGetAllRolesQueryOptions()),
    ]),
})
