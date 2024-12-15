import {createFileRoute} from '@tanstack/react-router'

import {EquipmentTable, withHelmet} from '@/components'
import {getGetAllEquipmentQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout/',
)({
  component: withHelmet(EquipmentTable, 'Equipment'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEquipmentQueryOptions()),
})
