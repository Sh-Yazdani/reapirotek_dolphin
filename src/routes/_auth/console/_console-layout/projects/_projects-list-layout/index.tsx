import {createFileRoute, redirect} from '@tanstack/react-router'

import {Projects, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {getGetAllProjectsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout/',
)({
  component: withHelmet(Projects, 'Projects'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllProjectsQueryOptions()),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
