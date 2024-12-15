import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout/notifications/',
)({
  component: () => null,
  beforeLoad() {
    throw redirect({
      to: '/console/profile/notifications/$status',
      params: {status: 'all'},
    })
  },
})
