import {pickBy} from 'lodash-es'

export const removeObjectEmptyStringValues = <T extends object>(obj: T) => {
  return pickBy(obj, (value) => value !== '')
}
