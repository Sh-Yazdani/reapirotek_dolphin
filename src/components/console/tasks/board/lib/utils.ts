import {capitalize, kebabCase, upperCase} from 'lodash-es'

export const createTaskNameBasedOnTaskStatus = (status: string) =>
  capitalize(upperCase(kebabCase(status)))
