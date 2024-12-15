import {z} from 'zod'

export const projectDetailsSectionSchema = z
  .enum([
    'info',
    'employees',
    'gallery',
    'equipment',
    'materials',
    'chart',
    'tasks',
  ])
  .default('info')

export const projectsStatusSchema = z.enum([
  'Initiation',
  'Pre-Construction',
  'In-Progress',
  'Completed',
])

export type ProjectStatus = z.infer<typeof projectsStatusSchema>
