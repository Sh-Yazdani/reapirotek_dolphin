import {createFileRoute} from '@tanstack/react-router'

import {EditTaskForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/_dashboard-layout/dashboard/tasks/$taskId',
)({
  component: withHelmet(EditTaskForm, 'Edit Task'),
})
