import {createFileRoute, redirect} from '@tanstack/react-router'

import {withHelmet} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'
import {lazyImport} from '@/utils/lazyImport'

const Tasks = lazyImport(() =>
  import('@/components/console/tasks/tasks').then((m) => ({
    default: m.Tasks,
  })),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/tasks/_tasks-layout/',
)({
  component: withHelmet(() => <Tasks type='USER-TASKS' />, 'Tasks'),
  beforeLoad({context: {ability}}) {
    if (!ability.can('manage', 'tasks')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
