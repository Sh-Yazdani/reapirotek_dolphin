import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/',
)({
  component: () => null,
  beforeLoad(ctx) {
    throw redirect({
      to: '/console/projects/$projectId/info',
      params: {projectId: ctx.params.projectId},
    })
  },
})
