import {produce} from 'immer'
import {assign} from 'lodash-es'

import type {Equipment} from '@/lib/data-provider/api/__generated'
import {removeObjectEmptyStringValues} from '@/utils/form'

import type {EquipmentFormFormValues} from './equipment-form'

export const transformFormValuesToEquipmentDTO = (
  formValues: EquipmentFormFormValues,
) => {
  return produce(removeObjectEmptyStringValues(formValues), (draft) => {
    assign(draft, {})
  })
}

export const transformEquipmentToFormValues = (equipment: Equipment) => {
  return produce(equipment, (draft) => {
    /*  */
    assign(draft, {})
  })
}
