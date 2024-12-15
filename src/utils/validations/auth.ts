import {z} from 'zod'

export const passwordSchema = z
  .string()
  .min(8, {message: 'Invalid'})
  .regex(/[a-z]/, {message: 'Invalid'})
  .regex(/[A-Z]/, {message: 'Invalid'})
  .regex(/\d/, {message: 'Invalid'})
  .regex(/[@$!%*?&#]/, {message: 'Invalid'})
