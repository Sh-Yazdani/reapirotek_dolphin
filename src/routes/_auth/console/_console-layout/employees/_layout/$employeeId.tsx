import {createFileRoute} from '@tanstack/react-router'

import {EmployeeProfile, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/$employeeId',
)({
  component: withHelmet(EmployeeProfile, 'User profile'),
})
