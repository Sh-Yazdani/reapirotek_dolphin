import {createFileRoute, redirect} from '@tanstack/react-router'

import {ProjectsExportTable, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {getGetAllProjectsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout/export',
)({
  component: withHelmet(ProjectsExportTable, 'Export projects'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllProjectsQueryOptions()),
  beforeLoad({context: {ability}}) {
    if (!ability.can('export', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
