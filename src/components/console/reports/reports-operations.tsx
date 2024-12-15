import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Button, IconButton, Stack, Tooltip} from '@mui/material'
import {Link, useRouteContext} from '@tanstack/react-router'
import type {MRT_Row} from 'material-react-table'
import {useTranslation} from 'react-i18next'
import {useDeepCompareMemo} from 'use-deep-compare'

import type {OperationsDataTableProps} from '@/components'
import {OperationsDataTable} from '@/components'
import type {Report} from '@/lib/data-provider/api/__generated'
import {
  useDeleteDailyReport,
  useGetAllDailyReportsSuspense,
} from '@/lib/data-provider/api/__generated'
import {getReportsColumns} from '@/mock/reports'
import {refetchAllReports} from '@/utils/cache'

export const ReportsOperations = () => {
  const ability = useRouteContext({from: '/_auth', select: (s) => s.ability})
  const {t} = useTranslation('reports')

  // call READ hook
  const {data: fetchedReports = [], isFetching: isFetchingReports} =
    useGetAllDailyReportsSuspense()

  // call DELETE hook
  const {isPending: isDeletingReport, mutateAsync: deleteReport} =
    useDeleteDailyReport()

  // DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<Report>) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this report?')) {
      /* @ts-ignore TODO -> Swagger issues */
      await deleteReport({id: row.original.id})
      refetchAllReports()
    }
  }

  const enableRowActions =
    ability.can('edit', 'reports') || ability.can('delete', 'reports')

  const config: OperationsDataTableProps<Report> = useDeepCompareMemo(
    () => ({
      data: fetchedReports,
      columns: getReportsColumns(t),
      enableRowActions,

      initialState: {
        columnVisibility: {
          'mrt-row-actions': enableRowActions,
          id: false,
        },
      },

      renderRowActions: ({row}) => {
        if (!enableRowActions) return null
        return (
          <Stack direction='row' spacing={1}>
            {ability.can('edit', 'reports') ? (
              <Link
                params={{reportId: row.original.id as unknown as string}}
                to='/console/reports/operations/edit/$reportId'
              >
                <Tooltip title='Edit'>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : null}

            {ability.can('delete', 'reports') ? (
              <Tooltip title='Delete'>
                <IconButton
                  color='error'
                  onClick={() => openDeleteConfirmModal(row)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Stack>
        )
      },

      renderTopToolbarCustomActions: () => (
        <Stack direction='row' mb={2} spacing={2}>
          <Link to='/console/reports/operations/add'>
            <Button variant='contained'>
              {t('add', {defaultValue: 'Add new report'})}
            </Button>
          </Link>
        </Stack>
      ),
      state: {
        isSaving: isDeletingReport,
        showProgressBars: isFetchingReports,
      },
    }),
    [getReportsColumns(t), isDeletingReport, isFetchingReports],
  )
  return <OperationsDataTable {...config} />
}
