import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {lazyImport} from '@/utils/lazyImport'

const Dashboard = lazyImport(() =>
  import('@/components/console/dashboard/index').then((m) => ({
    default: m.Dashboard,
  })),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/_dashboard-layout/dashboard/',
)({
  component: withHelmet(Dashboard, 'Dashboard'),
})
