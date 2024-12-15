import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsEquipment = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-equipment-table'
  ).then((m) => ({default: m.ProjectDetailsEquipmentTable})),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/equipment',
)({
  component: withHelmet(ProjectDetailsEquipment, 'Project Equipments'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
