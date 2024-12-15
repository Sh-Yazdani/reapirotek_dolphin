import {useParams} from '@tanstack/react-router'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import type {Material} from '@/lib/data-provider/api/__generated'
import {useGetProjectByIdSuspense} from '@/lib/data-provider/api/__generated'
import {getMaterialsColumns} from '@/mock/materials'

export const ProjectDetailsMaterialsTable = () => {
  const {projectId} = useParams({
    select: (s) => ({projectId: s.projectId!}),
    strict: false,
  })

  const {data: project} = useGetProjectByIdSuspense(projectId)
  const {t} = useTranslation('materials')

  return (
    <BasicDataTable
      columns={getMaterialsColumns(t)}
      data={project.materials as unknown as Material[]}
      enableRowActions={false}
      title='Project Materials'
    />
  )
}
