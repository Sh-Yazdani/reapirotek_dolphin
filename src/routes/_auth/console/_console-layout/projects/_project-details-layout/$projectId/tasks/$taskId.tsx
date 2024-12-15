import {createFileRoute} from '@tanstack/react-router'

import {EditTaskForm, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout/$projectId/tasks/$taskId',
)({
  component: withHelmet(EditTaskForm, 'Edit Task'),
})
