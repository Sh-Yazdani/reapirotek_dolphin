import {LinearProgress, Stack} from '@mui/material'
import type {TFunction} from 'i18next'
import type {MRT_ColumnDef} from 'material-react-table'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import type {Project} from '@/lib/data-provider/api/__generated'
import {
  ProjectStatus,
  useGetAllProjectsSuspense,
} from '@/lib/data-provider/api/__generated'

const calculateProjectProgressBasedOnStatus = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.Initiation:
      return 0

    case 'Pre-Construction' as ProjectStatus:
      return 25

    case 'In-Progress':
      return 50

    case 'Completed' as ProjectStatus:
      return 100

    default:
      return 0
  }
}

const getColumns = (t: TFunction<'projects'>): MRT_ColumnDef<Project>[] => [
  {
    accessorKey: 'id',
    header: t('tables.columns.id', {defaultValue: 'ID'}),
    size: 40,
    enableSorting: false,
  },
  {
    accessorKey: 'projectCode',
    header: t('tables.columns.project-code', {
      defaultValue: 'Project Code',
    }),
    size: 100,
  },
  {
    accessorKey: 'title',
    header: t('tables.columns.title', {defaultValue: 'Title'}),
    size: 100,
  },
  /*  {
    accessorKey: 'dueDate',
    header: 'Due date',
    size: 100,
  }, */
  {
    accessorKey: 'progress',
    header: t('tables.columns.progress', {defaultValue: 'Progress'}),
    size: 100,
    Cell({row}) {
      return calculateProjectProgressBasedOnStatus(row.original.status!)
    },
  },
  {
    accessorKey: 'progressValue',
    header: t('tables.columns.value', {defaultValue: 'Value'}),

    size: 200,
    Cell({row}) {
      return (
        <Stack height='100%' justifyContent='center'>
          <LinearProgress
            value={calculateProjectProgressBasedOnStatus(row.original.status!)}
            variant='determinate'
          />
        </Stack>
      )
    },
  },
]

export const ProjectsStatusTable = () => {
  const {data: projects} = useGetAllProjectsSuspense()
  const {t} = useTranslation('projects')
  return (
    <BasicDataTable
      columns={getColumns(t)}
      data={projects}
      enableRowActions={false}
      initialState={{
        columnVisibility: {
          id: false,
        },
      }}
      title={t('tables.status.title', {
        defaultValue: 'Project status',
      })}
    />
  )
}
