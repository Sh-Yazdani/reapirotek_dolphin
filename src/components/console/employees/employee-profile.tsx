import {useParams} from '@tanstack/react-router'
import React from 'react'

import {ProfileForm} from '@/components'
import {useGetEmployeeByIdSuspense} from '@/lib/data-provider/api/__generated'

export const EmployeeProfile = () => {
  const employeeId = useParams({
    from: '/_auth/console/_console-layout/employees/_layout/$employeeId',
    select: (s) => s.employeeId,
  })
  const {data: employee} = useGetEmployeeByIdSuspense(employeeId)
  return <ProfileForm editable={false} employee={employee} />
}
