import {createFileRoute} from '@tanstack/react-router'

import {EditRoleForm, withHelmet} from '@/components'
import {getGetRoleByIdQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/employees/_layout/roles/edit/$roleId',
)({
  component: withHelmet(EditRoleForm, 'Edit role'),
  loader: ({context: {queryClient}, params: {roleId}}) =>
    queryClient.ensureQueryData(getGetRoleByIdQueryOptions(roleId)),
})
