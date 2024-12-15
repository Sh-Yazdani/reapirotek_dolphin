import {createFileRoute} from '@tanstack/react-router'

import {MaterialsOperations, withHelmet} from '@/components'
import {getGetAllMaterialsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout/operations/',
)({
  component: withHelmet(MaterialsOperations, 'Materials operations'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllMaterialsQueryOptions()),
})
