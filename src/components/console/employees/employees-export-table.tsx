import {useTranslation} from 'react-i18next'

import {ExportDataTable} from '@/components'
import {useGetAllEmployeesSuspense} from '@/lib/data-provider/api/__generated'
import {getEmployeesColumns} from '@/mock/employees'

export const EmployeesExportTable = () => {
  const {data: employees} = useGetAllEmployeesSuspense()
  const {t} = useTranslation('employees')
  return (
    <ExportDataTable
      columns={getEmployeesColumns(t)}
      data={employees}
      exportedFileNameSuffix='employees'
    />
  )
}
