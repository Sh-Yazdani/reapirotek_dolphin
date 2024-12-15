import type {TFunction} from 'i18next'
import {z} from 'zod'

interface MakeNormalStringSchema {
  message: string
  t: TFunction<any | 'form'>
}

export const makeNormalStringSchema = ({message, t}: MakeNormalStringSchema) =>
  z
    .string()
    .min(2, {message})
    .regex(/^[a-zA-Z ]+$/, {
      message: t('form:validation-errors.normal-string-schema', {
        defaultValue: 'Must only contain letters and spaces',
      }),
    })
