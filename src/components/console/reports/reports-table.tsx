import CloseIcon from '@mui/icons-material/Close'
import PushPin from '@mui/icons-material/PushPin'
import type {SelectChangeEvent} from '@mui/material'
import {Box, Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {Note} from 'iconsax-react'
import {filter} from 'lodash-es'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'

import type {FormSelectFieldOptions} from '@/components'
import {BasicDataTable, IconContainer, Select} from '@/components'
import {useBreakpointValues} from '@/hooks'
import type {Report} from '@/lib/data-provider/api/__generated'
import {useGetAllDailyReportsSuspense} from '@/lib/data-provider/api/__generated'
import {getReportsColumns, getReportSubjects} from '@/mock/reports'

interface UseFilterReportsBySubjectParams {}

export const useFilterReportsBySubject = (
  params: UseFilterReportsBySubjectParams,
) => {
  const {t} = useTranslation('reports')
  const filterOptions = getReportSubjects(
    t,
  ) as unknown as FormSelectFieldOptions[]

  const [subject, setSubject] = useState(filterOptions[0].value)

  const onChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value)
  }

  const {data: reportsData} = useGetAllDailyReportsSuspense()

  const data: Report[] = (() => {
    if (subject === 'all') return reportsData
    return filter(reportsData, {subject})
  })()

  return {subject, data, setSubject, filterOptions, onChange}
}

export const ReportsTable = () => {
  const {data, filterOptions, onChange, subject} = useFilterReportsBySubject({})
  const {t} = useTranslation('reports')

  const {isMobile} = useBreakpointValues()

  const funnel = (
    <Box sx={{minWidth: 200}}>
      <Select options={filterOptions} value={subject} onChange={onChange} />
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

  return (
    <BasicDataTable
      columns={getReportsColumns(t)}
      data={data}
      getRowId={(row) => row.id as unknown as string}
      initialState={{
        columnPinning: {
          left: ['mrt-row-actions'],
        },
        columnVisibility: {
          'mrt-row-pin': false,
          id: false,
        },
        columnSizing: {
          'mrt-row-actions': 80,
        },
      }}
      renderRowActions={({row}) => (
        <Stack alignItems='center' direction='row' gap={2}>
          <IconContainer
            className='cursor-pointer'
            color='neutrals.gray'
            component={row.getIsPinned() ? CloseIcon : PushPin}
            height={20}
            sx={{transform: row.getIsPinned() ? 'none' : 'rotate(135deg)'}}
            width={20}
            onClick={() => {
              row.pin(row.getIsPinned() ? false : 'top')
            }}
          />

          <Link
            key='view-report'
            params={{reportId: row.original.id as unknown as string}}
            to='/console/reports/$reportId'
          >
            <Stack>
              <IconContainer component={Note} size={20} />
            </Stack>
          </Link>
        </Stack>
      )}
      renderTableContainerHeader={renderTableContainerHeader}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      title=''
      enableRowActions
      enableSorting
    />
  )
}
