import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsInfo = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-info'
  ).then((m) => ({default: m.ProjectDetailsInfo})),
)
export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/info',
)({
  component: withHelmet(ProjectDetailsInfo, 'Project Info'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
