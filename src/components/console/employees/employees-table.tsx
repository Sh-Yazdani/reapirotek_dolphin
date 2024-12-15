import {MenuItem} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {SmsTracking, UserSquare} from 'iconsax-react'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {BasicDataTable, IconContainer} from '@/components'
import type {Employee} from '@/lib/data-provider/api/__generated'
import {useGetAllEmployeesSuspense} from '@/lib/data-provider/api/__generated'
import {getEmployeesColumns} from '@/mock/employees'

interface EmployeesTableImplProps {
  employees: Employee[]
}

export const EmployeesTableImpl: React.FC<EmployeesTableImplProps> = ({
  employees,
}) => {
  const {t} = useTranslation('employees')

  return (
    <BasicDataTable
      columns={getEmployeesColumns(t)}
      data={employees}
      getRowId={(row) => row.id as unknown as string}
      initialState={{
        columnPinning: {
          right: ['mrt-row-actions'],
        },
      }}
      renderRowActionMenuItems={({closeMenu, row}) => [
        <MenuItem key='send-message' sx={{gap: 2}} onClick={() => closeMenu()}>
          <IconContainer component={SmsTracking} size={20} />
          Send message
        </MenuItem>,

        <Link
          key='view-profile'
          params={{employeeId: row.original.id as unknown as string}}
          to='/console/employees/$employeeId'
        >
          <MenuItem sx={{gap: 2}} onClick={() => closeMenu()}>
            <IconContainer component={UserSquare} size={20} />
            View profile
          </MenuItem>
        </Link>,
      ]}
      title='Employees'
      enableRowActions
      enableSorting
    />
  )
}

export const EmployeesTable = () => {
  const {data: employees} = useGetAllEmployeesSuspense()
  return <EmployeesTableImpl employees={employees} />
}
