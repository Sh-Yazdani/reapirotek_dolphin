import {Box, Stack, ToggleButton, ToggleButtonGroup} from '@mui/material'
import type {TFunction} from 'i18next'
import {get} from 'lodash-es'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {Select} from '@/components'
import {useGetAllProjectsSuspense} from '@/lib/data-provider/api/__generated'

import {ProjectsList} from './projects-list'
import {ProjectsTable, useFilterProjectsByStatus} from './projects-table'

const getListTypes = (t: TFunction) => [
  {
    label: t('view-mode.list', {defaultValue: 'List'}),
    value: 'List' as const,
  },
  {
    label: t('view-mode.table', {defaultValue: 'Table'}),
    value: 'Table' as const,
  },
]

type ViewType = 'List' | 'Table'

export const Projects = () => {
  const {data: projects} = useGetAllProjectsSuspense()
  const {t} = useTranslation('common')
  const [type, setType] = React.useState<ViewType>(getListTypes(t)[0].value)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string,
  ) => {
    if (newType !== null) {
      setType(newType as ViewType)
    }
  }

  const {data, filterOptions, onChange, status} = useFilterProjectsByStatus({
    initialData: projects,
  })

  const elementsMap: Record<ViewType, JSX.Element> = {
    List: <ProjectsList projects={data} />,
    Table: <ProjectsTable projects={data} />,
  }

  const element = get(elementsMap, type)
  return (
    <Stack spacing={2}>
      <Stack
        alignItems='center'
        alignSelf='flex-start'
        bgcolor='common.white'
        borderRadius={5}
        direction='row'
        gap={2}
        justifyContent='space-between'
        sx={{py: 1, px: 1}}
        width='100%'
      >
        <Box minWidth={{md: 150}}>
          <ToggleButtonGroup
            color='primary'
            size='small'
            value={type}
            exclusive
            onChange={handleChange}
          >
            {getListTypes(t).map((_type) => {
              return (
                <ToggleButton key={_type.value} value={_type.value}>
                  {_type.label}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{width: {xs: '100%', md: 220}}}>
          <Select
            options={filterOptions}
            size='small'
            value={status}
            onChange={onChange}
          />
        </Box>
      </Stack>

      {element}
    </Stack>
  )
}
