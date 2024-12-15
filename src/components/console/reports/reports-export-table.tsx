import {Box} from '@mui/material'
import {useTranslation} from 'react-i18next'

import {ExportDataTable, Select} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {getReportsColumns} from '@/mock/reports'

import {useFilterReportsBySubject} from './reports-table'

export const ReportsExportTable = () => {
  const {data, filterOptions, onChange, subject} = useFilterReportsBySubject({})
  const {isLargerThanDesktop} = useBreakpointValues()
  const {t} = useTranslation('reports')
  const funnel = (
    <Box sx={{minWidth: 150}}>
      <Select options={filterOptions} value={subject} onChange={onChange} />
    </Box>
  )

  const renderTopToolbarCustomActions = () => {
    if (!isLargerThanDesktop) return null
    return funnel
  }

  const renderTableContainerHeader = () => {
    if (isLargerThanDesktop) return null
    return funnel
  }

  return (
    <ExportDataTable
      columns={getReportsColumns(t)}
      data={data}
      exportedFileNameSuffix='reports'
      initialState={{
        columnVisibility: {
          id: false,
        },
      }}
      renderTableContainerHeader={renderTableContainerHeader}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  )
}
