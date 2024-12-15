import {useNavigate, useParams} from '@tanstack/react-router'

import {Dialog} from '@/components'
import {RoleModificationForm} from '@/components/console/permissions/role-modification-form'
import {useGetEmployeeByIdSuspense} from '@/lib/data-provider/api/__generated'

export const EditEmployeePermissions = () => {
  const navigate = useNavigate()
  const employeeId = useParams({
    from: '/_auth/console/_console-layout/employees/_layout/permissions/edit/$employeeId',
    select: (s) => s.employeeId,
  })

  const {data: employee} = useGetEmployeeByIdSuspense(employeeId, {
    query: {
      gcTime: 0,
    },
  })

  const onClose = () => {
    void navigate({to: '/console/employees/permissions'})
  }

  return (
    <Dialog maxWidth='xl' open onClose={onClose}>
      <RoleModificationForm
        userName={`${employee.firstName} ${employee.lastName}`}
        onClose={onClose}
      />
    </Dialog>
  )
}
