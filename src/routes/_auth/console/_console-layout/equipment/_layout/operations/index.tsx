import {createFileRoute} from '@tanstack/react-router'

import {EquipmentOperations, withHelmet} from '@/components'
import {getGetAllEquipmentQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout/operations/',
)({
  component: withHelmet(EquipmentOperations, ' Equipment operations'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllEquipmentQueryOptions()),
})
