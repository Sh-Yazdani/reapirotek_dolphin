import type {Dayjs} from 'dayjs'
import dayjs from 'dayjs'
import {z} from 'zod'

export const dateType: z.ZodType<Dayjs, z.ZodTypeDef, Dayjs> = z.custom(
  (val) => {
    if (dayjs.isDayjs(val)) {
      return {valid: true}
    } else {
      return {valid: false, error: 'Invalid date'}
    }
  },
)
