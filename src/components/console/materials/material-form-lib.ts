import {produce} from 'immer'
import {assign} from 'lodash-es'

import type {Material} from '@/lib/data-provider/api/__generated'
import {removeObjectEmptyStringValues} from '@/utils/form'

import type {MaterialFormValues} from './material-form'

export const transformFormValuesToMaterialDTO = (
  formValues: MaterialFormValues,
) => {
  return produce(removeObjectEmptyStringValues(formValues), (draft) => {
    assign(draft, {})
  })
}

export const transformMaterialToFormValues = (material: Material) => {
  return produce(material, (draft) => {
    /*  */
    assign(draft, {})
  })
}
