import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsEmployees = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-employees-table'
  ).then((m) => ({default: m.ProjectDetailsEmployeesTable})),
)
export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/employees',
)({
  component: withHelmet(ProjectDetailsEmployees, 'Project Employees'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
