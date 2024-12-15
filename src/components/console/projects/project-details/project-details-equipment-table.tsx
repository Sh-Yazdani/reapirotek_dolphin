import {useParams} from '@tanstack/react-router'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import type {Equipment} from '@/lib/data-provider/api/__generated'
import {useGetProjectByIdSuspense} from '@/lib/data-provider/api/__generated'
import {getEquipmentColumns} from '@/mock/equipment'

export const ProjectDetailsEquipmentTable = () => {
  const {projectId} = useParams({
    select: (s) => ({projectId: s.projectId!}),
    strict: false,
  })
  const {data: project} = useGetProjectByIdSuspense(projectId)
  const {t} = useTranslation('equipment')

  return (
    <BasicDataTable
      columns={getEquipmentColumns(t)}
      data={project.equipment as unknown as Equipment[]}
      enableRowActions={false}
      title='Project Equipment'
    />
  )
}
