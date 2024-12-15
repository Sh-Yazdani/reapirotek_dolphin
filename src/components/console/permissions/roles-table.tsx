import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, IconButton, Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {get} from 'lodash-es'
import type {MRT_ColumnDef, MRT_Row} from 'material-react-table'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import type {Role} from '@/lib/data-provider/api/__generated'
import {
  useDeleteRole,
  useGetAllRolesSuspense,
} from '@/lib/data-provider/api/__generated'
import {refetchAllRoles} from '@/utils/cache'

const getColumns = (t: TFunction<'employees'>): MRT_ColumnDef<Role>[] => [
  {
    accessorKey: 'id',
    header: t('tables.columns.id', {defaultValue: 'ID'}),
  },
  {
    accessorKey: 'name',
    header: t('tables.columns.name', {defaultValue: 'Name'}),
    enableSorting: false,
    size: 50,
  },
  {
    accessorKey: 'description',
    header: t('tables.columns.description', {defaultValue: 'Description'}),
    enableSorting: false,
    grow: 1,
  },
]

export const RolesTable = () => {
  const {data: roles, isRefetching: isFetchingRolse} = useGetAllRolesSuspense()
  const {mutateAsync: deleteRole} = useDeleteRole()
  const {t} = useTranslation('employees')

  const openDeleteConfirmModal = async (row: MRT_Row<Role>) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this role?')) {
      await deleteRole({id: get(row.original, 'id') as unknown as string})
      refetchAllRoles()
    }
  }

  return (
    <BasicDataTable
      columns={getColumns(t)}
      data={roles}
      enableHiding={false}
      enableRowPinning={false}
      initialState={{
        columnPinning: {right: ['mrt-row-actions']},
        columnVisibility: {
          id: false,
        },
      }}
      renderRowActions={({row}) => {
        const roleId = row.original.id!
        return (
          <Stack direction='row' gap={1}>
            <Link params={{roleId}} to='/console/employees/roles/edit/$roleId'>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        )
      }}
      renderTopToolbarCustomActions={() => {
        return (
          <Link to='/console/employees/roles/add'>
            <Button variant='contained'>
              {t('roles.add', {defaultValue: 'Add Role'})}
            </Button>
          </Link>
        )
      }}
      state={{
        showProgressBars: isFetchingRolse,
      }}
      title={t('roles.title', {defaultValue: 'Roles'})}
      enableRowActions
    />
  )
}
