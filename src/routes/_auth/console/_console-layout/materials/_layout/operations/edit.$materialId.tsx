import {createFileRoute} from '@tanstack/react-router'

import {EditMaterialForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout/operations/edit/$materialId',
)({
  component: withHelmet(EditMaterialForm, 'Edit project'),
})
