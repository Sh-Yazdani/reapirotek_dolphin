import PushPin from '@mui/icons-material/PushPin'
import type {SelectChangeEvent} from '@mui/material'
import {Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {Briefcase} from 'iconsax-react'
import {filter} from 'lodash-es'
import type {ReactNode} from 'react'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {CloseIcon} from 'yet-another-react-lightbox'

import type {FormSelectFieldOptions} from '@/components'
import {BasicDataTable, IconContainer} from '@/components'
import type {Project} from '@/lib/data-provider/api/__generated'
import {
  getProjectColumns,
  getProjectStatusOptionsWithAllOption,
} from '@/mock/projects'

interface UseFilterProjectsByStatusParams<T> {
  initialData: T[]
}

export const useFilterProjectsByStatus = <T extends Project>({
  initialData,
}: UseFilterProjectsByStatusParams<T>) => {
  const {t} = useTranslation('projects')
  const filterOptions: FormSelectFieldOptions[] =
    getProjectStatusOptionsWithAllOption(t)

  const [status, setStatus] = useState(filterOptions[0].value)

  const onChange: (event: SelectChangeEvent, child: ReactNode) => void = (
    event,
  ) => {
    setStatus(event.target.value)
  }

  const data: Project[] = (() => {
    if (status === 'All') return initialData
    return filter(initialData, {status}) as Project[]
  })()

  return {status, data, filterOptions, onChange}
}

interface ProjectsTableProps {
  projects: Project[]
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({projects}) => {
  const {t} = useTranslation('projects')

  return (
    <BasicDataTable
      columns={getProjectColumns(t)}
      data={projects}
      getRowId={(row) => row.id as unknown as string}
      initialState={{
        columnPinning: {
          left: ['mrt-row-actions'],
        },
        columnVisibility: {
          id: false,
          'mrt-row-pin': false,
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
            params={{projectId: row.original.id as unknown as string}}
            to='/console/projects/$projectId/info'
          >
            <Stack>
              <IconContainer component={Briefcase} size={20} />
            </Stack>
          </Link>
        </Stack>
      )}
      title=''
      enableRowActions
      enableSorting
    />
  )
}
