import {createFileRoute, redirect} from '@tanstack/react-router'

import {AddReportForm, withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {
  getGetAllEquipmentQueryOptions,
  getGetAllProjectsQueryOptions,
} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/operations/add',
)({
  component: withHelmet(AddReportForm, 'Add report'),
  loader: ({context: {queryClient}}) => ({
    projects: queryClient.ensureQueryData(getGetAllProjectsQueryOptions()),
    reports: queryClient.ensureQueryData(getGetAllEquipmentQueryOptions()),
    equipment: queryClient.ensureQueryData(getGetAllEquipmentQueryOptions()),
  }),
  beforeLoad({context: {ability}}) {
    if (!ability.can('add', 'reports')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
