import {createFileRoute, redirect} from '@tanstack/react-router'

import {AddProjectForm, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {getGetAllZonesQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout/operations/add',
)({
  component: withHelmet(AddProjectForm, 'Add project'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllZonesQueryOptions()),
  beforeLoad({context: {ability}}) {
    if (!ability.can('add', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
