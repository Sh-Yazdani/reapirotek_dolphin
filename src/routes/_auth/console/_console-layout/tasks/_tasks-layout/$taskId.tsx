import {createFileRoute} from '@tanstack/react-router'

import {EditTaskForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/tasks/_tasks-layout/$taskId',
)({
  component: withHelmet(() => <EditTaskForm assignable />, 'Edit Task'),
})
