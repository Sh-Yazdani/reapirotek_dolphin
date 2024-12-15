import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/$reportId/',
)({
  component: () => null,
  beforeLoad({params}) {
    throw redirect({
      to: '/console/reports/$reportId/$section',
      params: {section: 'media', reportId: params.reportId},
    })
  },
})
