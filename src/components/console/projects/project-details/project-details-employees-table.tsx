import {useParams} from '@tanstack/react-router'

import {EmployeesTableImpl} from '@/components/console/employees'
import {useGetProjectByIdSuspense} from '@/lib/data-provider/api/__generated'

export const ProjectDetailsEmployeesTable = () => {
  const {projectId} = useParams({
    select: (s) => ({projectId: s.projectId!}),
    strict: false,
  })
  const {data: project} = useGetProjectByIdSuspense(projectId)
  /* @ts-ignore Swagger issues */
  return <EmployeesTableImpl employees={project.employees} />
}
