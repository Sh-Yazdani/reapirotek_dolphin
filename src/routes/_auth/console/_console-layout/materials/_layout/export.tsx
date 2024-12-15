import {createFileRoute} from '@tanstack/react-router'

import {MaterialsExportTable, withHelmet} from '@/components'
import {getGetAllMaterialsQueryOptions} from '@/lib/data-provider/api/__generated'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout/export',
)({
  component: withHelmet(MaterialsExportTable, 'Export materials'),
  loader: ({context: {queryClient}}) =>
    queryClient.ensureQueryData(getGetAllMaterialsQueryOptions()),
})
