import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsMaterials = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-materials-table'
  ).then((m) => ({default: m.ProjectDetailsMaterialsTable})),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/materials',
)({
  component: withHelmet(ProjectDetailsMaterials, 'Project Materials'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
