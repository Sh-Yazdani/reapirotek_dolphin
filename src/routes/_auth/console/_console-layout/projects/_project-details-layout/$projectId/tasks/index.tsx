import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsTasks = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-tasks'
  ).then((m) => ({default: m.ProjectDetailsTasks})),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/tasks/',
)({
  component: withHelmet(ProjectDetailsTasks, 'Project Tasks'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
