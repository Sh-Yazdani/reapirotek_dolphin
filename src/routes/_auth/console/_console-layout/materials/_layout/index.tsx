import {createFileRoute} from '@tanstack/react-router'

import {MaterialsTable, withHelmet} from '@/components'
import {getGetAllMaterialsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout/',
)({
  component: withHelmet(MaterialsTable, 'Materials'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllMaterialsQueryOptions()),
})
