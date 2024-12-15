import EditIcon from '@mui/icons-material/Edit'
import {IconButton} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {useTranslation} from 'react-i18next'

import {BasicDataTable, IconContainer} from '@/components'
import {useGetAllEmployeesSuspense} from '@/lib/data-provider/api/__generated'
import {getEmployeesWithRoleColumns} from '@/mock/employees'

export const EmployeesWithRolesTable = () => {
  const {data: employees} = useGetAllEmployeesSuspense()
  const {t} = useTranslation('employees')
  return (
    <BasicDataTable
      columns={getEmployeesWithRoleColumns(t)}
      data={employees}
      getRowId={(row) => row.id as unknown as string}
      initialState={{
        columnPinning: {
          right: ['mrt-row-actions'],
        },
      }}
      renderRowActions={({cell}) => {
        return (
          <Link
            params={{employeeId: cell.row.original.id as unknown as string}}
            to='/console/employees/permissions/edit/$employeeId'
          >
            <IconButton>
              <IconContainer component={EditIcon} size={20} />
            </IconButton>
          </Link>
        )
      }}
      title={t('tables.permissions.title', {defaultValue: 'Users'})}
      enableRowActions
      enableSorting
    />
  )
}
