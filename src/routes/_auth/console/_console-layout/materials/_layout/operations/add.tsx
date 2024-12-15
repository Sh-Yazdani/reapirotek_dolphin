import {createFileRoute} from '@tanstack/react-router'

import {AddMaterialForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout/operations/add',
)({
  component: withHelmet(AddMaterialForm, 'Add material'),
})
