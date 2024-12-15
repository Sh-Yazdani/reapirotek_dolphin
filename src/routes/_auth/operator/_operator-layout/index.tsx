import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/operator/_operator-layout/')({
  component: () => null,
  beforeLoad() {
    throw redirect({
      to: '/operator/dashboard',
    })
  },
})
