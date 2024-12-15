import type {TableProps} from '@mui/material'
import {
  Box,
  Button,
  Card,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {filter} from 'lodash'
import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {MinimalTableData} from '@/components'
import {FormAutoComplete, Table, TableCell, TableHeadCell} from '@/components'
import {createProjectsCrewTimeCardData} from '@/components/console/crew-time-card/crew-time-card-data'
import type {Project} from '@/lib/data-provider/api/__generated'
import {useGetAllProjectsSuspense} from '@/lib/data-provider/api/__generated'
import {exportPDF} from '@/utils/pdf'

interface ProjectTableProps {
  title: string
  project: MinimalTableData
}

const ProjectTable: React.FC<ProjectTableProps> = ({project, title}) => {
  return (
    <Stack gap={2}>
      <Typography fontWeight='bold' variant='t2'>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            {project.header.map((item) => {
              return (
                <TableHeadCell
                  key={item.text}
                  align={item.align as unknown as TableProps['align']}
                  colSpan={item.colSpan}
                >
                  {item.text}
                </TableHeadCell>
              )
            })}
          </TableHead>

          {project.rows.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex}>
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <TableCell
                      key={cellIndex}
                      align={cell.align as unknown as TableProps['align']}
                      colSpan={cell.colSpan}
                    >
                      {cell.text}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </Table>
      </TableContainer>
    </Stack>
  )
}

interface FormValues {
  projectId: string
}

interface FunnelProps {
  projects: Project[]
}

const Funnel: React.FC<FunnelProps> = ({projects}) => {
  const {t} = useTranslation('crewTimeCard')
  const options = [
    {
      label: t('funnel.all-projects', {defaultValue: 'All Projects'}),
      value: 'all',
    },
    ...projects.map((project) => ({
      label: project.title,
      value: project.id as unknown as string,
    })),
  ]
  return (
    <FormAutoComplete
      hasErrorMessageLabel={false}
      label=''
      name='projectId'
      options={options}
      size='small'
      sx={{minWidth: {md: 220}}}
      disableClearable
      fullWidth
    />
  )
}

export const CrewTimeCard = () => {
  const {t} = useTranslation('crewTimeCard')
  const {data: _projects} = useGetAllProjectsSuspense()

  const defaultValues: FormValues = {
    projectId: 'all' as unknown as string,
  }

  const form = useForm<FormValues>({defaultValues})
  const projects = (() => {
    if (form.watch().projectId === 'all') return _projects
    return filter(_projects, {id: form.watch().projectId})
  })()

  const extra = (
    <Stack alignItems='center' direction='row' spacing={2}>
      <Funnel projects={_projects} />
      <Button
        className='shrink-0'
        size='medium'
        variant='contained'
        onClick={() => {
          if (!projects) return
          exportPDF(
            projects.map((project) =>
              createProjectsCrewTimeCardData(project.title, t),
            ),
            'crew-time-card',
          )
        }}
      >
        {t('export', {defaultValue: 'Export'})}
      </Button>
    </Stack>
  )

  return (
    <FormProvider {...form}>
      <Stack gap={2}>
        <Stack
          alignItems={{md: 'center'}}
          bgcolor='common.white'
          borderRadius={3}
          direction={{xs: 'column', md: 'row'}}
          gap={1}
          px={{xs: 2, md: 3}}
          py={1}
        >
          <Typography fontWeight='bold' variant='t2' noWrap>
            {t('title', {defaultValue: 'Crew time card'})}
          </Typography>
          <Box ml='auto' width={{xs: '100%', md: 'fit-content'}}>
            {extra}
          </Box>
        </Stack>

        <Stack component={Card} gap={3}>
          {projects.map((project) => {
            return (
              <ProjectTable
                key={project.id}
                project={createProjectsCrewTimeCardData(project.title, t)}
                title={project.title}
              />
            )
          })}
        </Stack>
      </Stack>
    </FormProvider>
  )
}
