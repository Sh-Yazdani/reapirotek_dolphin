import {createFileRoute} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {lazyImport} from '@/utils/lazyImport'

const Tasks = lazyImport(() =>
  import('@/components/console/tasks/tasks').then((m) => ({
    default: m.Tasks,
  })),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/_dashboard-layout/dashboard/tasks/',
)({
  component: withHelmet(() => <Tasks type='USER-TASKS' />, 'Tasks'),
})
