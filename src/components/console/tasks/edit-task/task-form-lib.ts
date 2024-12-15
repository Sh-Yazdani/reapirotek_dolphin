import dayjs from 'dayjs'
import {produce} from 'immer'
import {set, unset} from 'lodash'
import {assign} from 'lodash-es'

import type {Task} from '@/lib/data-provider/api/__generated'
import {ISODateFormat} from '@/utils/date'
import {removeObjectEmptyStringValues} from '@/utils/form'

import type {EditTaskFormValues} from './edit-task-form'

export const transformTaskFormValuesToDto = (
  formValues: EditTaskFormValues,
) => {
  return produce(removeObjectEmptyStringValues(formValues), (draft) => {
    unset(draft, 'createdAt')
    unset(draft, 'updatedAt')
    unset(draft, 'id')

    assign(draft, {
      dueDate: draft.dueDate
        ? dayjs(draft.dueDate).utc().format(ISODateFormat)
        : undefined,
    })

    /* @ts-ignore Todo -> Swagger issues */
    if (!draft.tags.length) {
      set(draft, 'tags', [])
    }

    /* @ts-ignore Todo -> Swagger issues */
    if (!draft.assignees.length) {
      set(draft, 'assignees', [])
    }
  })
}

export const transformTaskToFormValues = (task: Task) => {
  return produce(task, (draft) => {
    assign(draft, {
      dueDate: draft.dueDate ? dayjs(draft.dueDate) : undefined,
      /* @ts-ignore TODO -> Swagger issues */
      assignees: task.assignees?.map((assignee) => assignee.id),
    })

    /* @ts-ignore TODO -> Swagger issues */
    // if (!draft.assignees?.length) {
    //   set(draft, 'assignees', [])
    // }

    // /* @ts-ignore TODO -> Swagger issues */
    // if (!draft.tags?.length) {
    //   set(draft, 'tags', [])
    // }
  })
}
