import {createFileRoute} from '@tanstack/react-router'

import {RolesTable, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/roles/',
)({
  component: withHelmet(RolesTable, 'Roles'),
})
