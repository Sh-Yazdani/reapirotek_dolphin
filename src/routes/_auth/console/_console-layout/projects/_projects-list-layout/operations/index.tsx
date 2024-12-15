import {createFileRoute, redirect} from '@tanstack/react-router'

import {ProjectsOperations, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {getGetAllProjectsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout/operations/',
)({
  component: withHelmet(ProjectsOperations, 'Projects operations'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllProjectsQueryOptions()),
  beforeLoad({context: {ability}}) {
    if (!ability.can('add', 'projects') && !ability.can('edit', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
