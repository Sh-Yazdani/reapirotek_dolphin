import type {DraggableId, DraggableLocation} from '@hello-pangea/dnd'

import type {Employee, TaskStatus} from '@/lib/data-provider/api/__generated'

export type TaskType = 'PROJECT-TASKS' | 'USER-TASKS'

export interface Task {
  title: string
  projectCode: string
  date: string
  description: string
  id: string
  column: Column
  tags: string[]
  assignees: Employee[]
  priority: string
  status: TaskStatus
  dueDate: string
}
export type Id = TaskStatus

export interface Dragging {
  id: DraggableId
  location: DraggableLocation
}

export interface TaskMap {
  [key: string]: Task[]
}

export interface Column {
  status: TaskStatus
  label: string
}
