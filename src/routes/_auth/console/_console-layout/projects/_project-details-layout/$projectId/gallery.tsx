import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {getGetProjectByIdQueryOptions} from '@/lib/data-provider/api/__generated'
import {lazyImport} from '@/utils/lazyImport'

const ProjectDetailsGallery = lazyImport(() =>
  import(
    '@/components/console/projects/project-details/project-details-gallery/project-details-gallery'
  ).then((m) => ({default: m.ProjectDetailsGallery})),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/gallery',
)({
  component: withHelmet(ProjectDetailsGallery, 'Project Gallery'),
  loader: ({context: {queryClient}, params: {projectId}}) =>
    queryClient.ensureQueryData(getGetProjectByIdQueryOptions(projectId)),
})
