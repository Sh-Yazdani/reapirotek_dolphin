import {createFileRoute, redirect} from '@tanstack/react-router'

import {EditProjectForm, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout/operations/edit/$projectId',
)({
  component: withHelmet(EditProjectForm, 'Edit project'),

  beforeLoad({context: {ability}}) {
    if (!ability.can('edit', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
