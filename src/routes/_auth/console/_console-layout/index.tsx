import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/console/_console-layout/')({
  component: () => null,
  beforeLoad() {
    throw redirect({
      to: '/console/dashboard',
    })
  },
})
