import {produce} from 'immer'
import {assign} from 'lodash-es'

import type {Employee} from '@/lib/data-provider/api/__generated'
import {removeObjectEmptyStringValues} from '@/utils/form'

import type {EmployeeFormValues} from './employee-form'

export const transformFormValuesToEmployeeDTO = (
  formValues: EmployeeFormValues,
) => {
  return produce(removeObjectEmptyStringValues(formValues), (draft) => {
    assign(draft, {})
  })
}

export const transformEmployeeToFormValues = (employee: Employee) => {
  return produce(employee, (draft) => {
    /*  */
    assign(draft, {})
  })
}
