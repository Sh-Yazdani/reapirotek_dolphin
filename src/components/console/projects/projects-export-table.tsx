import {Box} from '@mui/material'
import {useTranslation} from 'react-i18next'

import {ExportDataTable, Select} from '@/components'
import {useFilterProjectsByStatus} from '@/components/console/projects/projects-table'
import {useBreakpointValues} from '@/hooks'
import {useGetAllProjectsSuspense} from '@/lib/data-provider/api/__generated'
import {getProjectColumns} from '@/mock/projects'

export const ProjectsExportTable = () => {
  const {data: initialData} = useGetAllProjectsSuspense()
  const {data, filterOptions, onChange, status} = useFilterProjectsByStatus({
    initialData,
  })

  const {isMobile} = useBreakpointValues()

  const funnel = (
    <Box sx={{minWidth: 200}}>
      <Select options={filterOptions} value={status} onChange={onChange} />
    </Box>
  )

  const renderTopToolbarCustomActions = () => {
    if (isMobile) return null
    return funnel
  }

  const renderTableContainerHeader = () => {
    if (!isMobile) return null
    return funnel
  }

  const {t} = useTranslation('projects')
  return (
    <ExportDataTable
      columns={getProjectColumns(t)}
      data={data}
      exportedFileNameSuffix='projects'
      initialState={{
        columnVisibility: {id: false},
      }}
      renderTableContainerHeader={renderTableContainerHeader}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  )
}
