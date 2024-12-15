import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {TasksLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/tasks/_tasks-layout',
)({
  component: memo(TasksLayout),
})
