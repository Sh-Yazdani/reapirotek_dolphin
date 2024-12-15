import {createFileRoute} from '@tanstack/react-router'

import {AddEquipmentForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout/operations/add',
)({
  component: withHelmet(AddEquipmentForm, 'Add equipment'),
})
