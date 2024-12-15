import {z} from 'zod'

export const reportDetailsSectionSchema = z
  .enum(['media', 'doc', 'pdf', 'video'])
  .default('media')
