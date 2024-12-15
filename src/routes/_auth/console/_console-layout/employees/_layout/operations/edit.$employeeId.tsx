import {createFileRoute} from '@tanstack/react-router'

import {EditEmployeeForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/operations/edit/$employeeId',
)({
  component: withHelmet(EditEmployeeForm, 'Edit employee'),
})
