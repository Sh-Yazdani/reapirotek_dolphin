import {createFileRoute} from '@tanstack/react-router'

import {EquipmentExportTable, withHelmet} from '@/components'
import {getGetAllEquipmentQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout/export',
)({
  component: withHelmet(EquipmentExportTable, 'Export Equipment'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEquipmentQueryOptions()),
})
