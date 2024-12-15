import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsChart = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-chart'
  ).then((m) => ({default: m.ProjectDetailsChart})),
)
export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/chart',
)({
  component: withHelmet(ProjectDetailsChart, 'Project Chart'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
