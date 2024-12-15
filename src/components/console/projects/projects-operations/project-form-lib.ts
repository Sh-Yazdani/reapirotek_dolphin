import {produce} from 'immer'
import {assign} from 'lodash-es'

import type {Project} from '@/lib/data-provider/api/__generated'
import {removeObjectEmptyStringValues} from '@/utils/form'

import type {ProjectFormValues} from './project-form'

export const transformFormValuesToDTO = (formValues: ProjectFormValues) => {
  return produce(removeObjectEmptyStringValues(formValues), (draft) => {
    assign(draft, {})
  })
}

export const transformDTOToFormValues = (project: Project) => {
  return produce(project, (draft) => {
    /*  */
    assign(draft, {
      /* @ts-ignore Swagger issues */
      zoneId: draft.zoneId.id,
    })
  })
}
