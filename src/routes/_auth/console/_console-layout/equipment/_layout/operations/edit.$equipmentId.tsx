import {createFileRoute} from '@tanstack/react-router'

import {EditEquipmentForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout/operations/edit/$equipmentId',
)({
  component: withHelmet(EditEquipmentForm, 'Edit equipment'),
})
