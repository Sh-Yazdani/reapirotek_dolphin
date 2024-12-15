import {createFileRoute} from '@tanstack/react-router'

import {AddRoleForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/roles/add',
)({
  component: withHelmet(AddRoleForm, 'Add role'),
})
