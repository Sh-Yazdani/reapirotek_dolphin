import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, IconButton, Tooltip} from '@mui/material'
import {Link, useRouteContext} from '@tanstack/react-router'
import type {MRT_Row} from 'material-react-table'
import {useTranslation} from 'react-i18next'
import {useDeepCompareMemo} from 'use-deep-compare'

import type {OperationsDataTableProps} from '@/components'
import {OperationsDataTable} from '@/components'
import type {Project} from '@/lib/data-provider/api/__generated'
import {
  useDeleteProject,
  useGetAllProjectsSuspense,
} from '@/lib/data-provider/api/__generated'
import {getProjectColumns} from '@/mock/projects'
import {refetchAllProjects} from '@/utils/cache'

export const ProjectsOperations: React.FC = () => {
  const {data: projects, isFetching: isFetchingProjects} =
    useGetAllProjectsSuspense()
  const ability = useRouteContext({from: '/_auth', select: (s) => s.ability})
  const {t} = useTranslation('projects')

  const {isPending: isDeletingProject, mutateAsync: deleteProject} =
    useDeleteProject({
      mutation: {
        onSuccess: () => {
          refetchAllProjects()
        },
      },
    })

  const openDeleteConfirmModal = async (row: MRT_Row<Project>) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject({id: row.original.id as unknown as string})
      refetchAllProjects()
    }
  }

  const enableRowActions =
    ability.can('edit', 'projects') || ability.can('delete', 'projects')

  const config: OperationsDataTableProps<Project> = useDeepCompareMemo(
    () => ({
      data: projects,
      columns: getProjectColumns(t),
      enableRowActions,
      renderRowActions: ({row}) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <Link
            params={{projectId: row.original.id as unknown as string}}
            to='/console/projects/operations/edit/$projectId'
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      renderTopToolbarCustomActions: () => (
        <Box mb={2}>
          <Link to='/console/projects/operations/add'>
            <Button variant='contained'>
              {t('add', {defaultValue: 'Add new project'})}
            </Button>
          </Link>
        </Box>
      ),
      initialState: {
        columnVisibility: {
          'mrt-row-actions': enableRowActions,
          id: false,
        },
      },
      state: {
        isSaving: isDeletingProject,
        showProgressBars: isFetchingProjects,
      },
    }),
    [getProjectColumns(t), isDeletingProject, isFetchingProjects],
  )
  return <OperationsDataTable {...config} />
}
