import type {TFunction} from 'i18next'
import {find} from 'lodash-es'

import type {Task as OriginalTask} from '@/lib/data-provider/api/__generated'

import type {Column, Task, TaskMap} from './board/lib/types'

export const getColumns = (t: TFunction<'tasks'>): Column[] => {
  const todo: Column = {
    status: 'todo',
    label: t('columns.todo', {defaultValue: 'Todo'}),
  }

  const doing: Column = {
    status: 'doing',
    label: t('columns.doing', {defaultValue: 'Doing'}),
  }

  const done: Column = {
    status: 'done',
    label: t('columns.done', {defaultValue: 'Done'}),
  }

  return [todo, doing, done]
}

export const getTasks = (tasks: Task[]): Task[] => tasks

const getTasksByColumn = (column: Column, tasks: Task[]): Task[] => {
  return tasks.filter((task: Task) => task.column.status === column.status)
}

const mapColumnsIntoTasks = (tasks: OriginalTask[], t: TFunction<'tasks'>) => {
  return tasks.map((task) => ({
    ...task,
    column: find(getColumns(t), {status: task.status})!,
  })) as unknown as Task[]
}

export const getTaskMap = (tasks: Task[], t: TFunction<'tasks'>): TaskMap => {
  const taskMapWithColumn = mapColumnsIntoTasks(
    tasks as unknown as OriginalTask[],
    t,
  )
  return getColumns(t).reduce(
    (previous: TaskMap, column: Column) => ({
      ...previous,
      [column.status]: getTasksByColumn(column, taskMapWithColumn),
    }),
    {},
  )
}

export const generateTaskMap = (
  tasks: OriginalTask[],
  t: TFunction<'tasks'>,
): TaskMap => {
  const taskMapWithColumn = mapColumnsIntoTasks(tasks, t)
  return getColumns(t).reduce((previous: TaskMap, column: Column) => {
    return {
      ...previous,
      [column.status]: getTasksByColumn(column, taskMapWithColumn),
    }
  }, {})
}
