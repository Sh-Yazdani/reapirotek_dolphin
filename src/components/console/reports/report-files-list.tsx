import {Box, Stack, tabClasses, Typography} from '@mui/material'
import {useParams} from '@tanstack/react-router'
import dayjs from 'dayjs'
import {filter, get, groupBy, map} from 'lodash-es'
import React from 'react'

import Docs from '@/assets/icons/file-type/docs.png'
import File from '@/assets/icons/file-type/file.png'
import Pdf from '@/assets/icons/file-type/pdf.png'
import type {NavigationTab} from '@/components'
import {IconContainer, NavigationTabs} from '@/components'

function a11yProps(index: number) {
  return {
    id: `project-files-navigation-tab-${index}`,
    'aria-controls': `project-files-navigation-tabpanel-${index}`,
  }
}

interface FilesListNavigationTabsProps {
  tabs: NavigationTab[]
}

const FilesListNavigationTabs: React.FC<FilesListNavigationTabsProps> = ({
  tabs,
}) => {
  return (
    <NavigationTabs
      a11yProps={a11yProps}
      tabs={tabs}
      tabsProps={{
        centered: true,
        variant: 'fullWidth',

        sx: {
          py: 0,
          [`.${tabClasses.root}`]: {
            mx: '0 !important',
            py: `1px !important`,
          },
        },
      }}
    />
  )
}

type FileType = 'doc' | 'media' | 'pdf' | 'video'

interface File {
  type: FileType
  name: string
  description: string
  date: string
  size: string
}

interface FileContentProps extends File {}

const FileContent: React.FC<FileContentProps> = ({
  date,
  description,
  name,
  size,
  type,
}) => {
  const fileIconMap: Record<FileType, string> = {
    doc: Docs,
    media: File,
    pdf: Pdf,
    video: File,
  }

  const fileIcon = get(fileIconMap, type)
  return (
    <Stack alignItems='center' direction='row' spacing={1} width='100%'>
      <IconContainer>
        <Box component='img' height={40} src={fileIcon} width={40} />
      </IconContainer>

      <Stack>
        <Typography color='neutrals.gray' variant='caption'>
          {name}
        </Typography>
        <Typography color='neutrals.gray' sx={{opacity: 0.8}} variant='small'>
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}

const files: File[] = [
  {
    type: 'pdf',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'pdf',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'pdf',
    name: 'Report.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'pdf',
    name: 'Report-1.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'pdf',
    name: 'Report-2.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'pdf',
    name: 'Report-3.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'pdf',
    name: 'Manual.pdf',
    date: '2020-04-04',
    description: 'uploaded on 2020-04-07',
    size: '64kb',
  },
  {
    type: 'pdf',
    name: 'Guide.pdf',
    date: '2020-05-05',
    description: 'uploaded on 2020-05-12',
    size: '1024kb',
  },

  {
    type: 'media',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'media',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'media',
    name: 'Report.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'media',
    name: 'Report-1.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'media',
    name: 'Report-2.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'media',
    name: 'Report-3.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'media',
    name: 'Manual.pdf',
    date: '2020-04-04',
    description: 'uploaded on 2020-04-07',
    size: '64kb',
  },
  {
    type: 'media',
    name: 'Guide.pdf',
    date: '2020-05-05',
    description: 'uploaded on 2020-05-12',
    size: '1024kb',
  },

  {
    type: 'doc',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'doc',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'doc',
    name: 'Report.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'doc',
    name: 'Report-1.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'doc',
    name: 'Report-2.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'doc',
    name: 'Report-3.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'doc',
    name: 'Manual.pdf',
    date: '2020-04-04',
    description: 'uploaded on 2020-04-07',
    size: '64kb',
  },
  {
    type: 'doc',
    name: 'Guide.pdf',
    date: '2020-05-05',
    description: 'uploaded on 2020-05-12',
    size: '1024kb',
  },

  {
    type: 'video',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'video',
    name: 'Document.pdf',
    date: '2020-02-02',
    description: 'uploaded on 2020-02-05',
    size: '256kb',
  },
  {
    type: 'video',
    name: 'Report.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'video',
    name: 'Report-1.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'video',
    name: 'Report-2.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'video',
    name: 'Report-3.pdf',
    date: '2020-03-03',
    description: 'uploaded on 2020-03-10',
    size: '512kb',
  },
  {
    type: 'video',
    name: 'Manual.pdf',
    date: '2020-04-04',
    description: 'uploaded on 2020-04-07',
    size: '64kb',
  },
  {
    type: 'video',
    name: 'Guide.pdf',
    date: '2020-05-05',
    description: 'uploaded on 2020-05-12',
    size: '1024kb',
  },
]

interface FileGroupProps {
  date: string
  files: File[]
}

const FileGroup: React.FC<FileGroupProps> = ({date, files: _files}) => {
  return (
    <Stack
      pb={1}
      sx={{
        '&:not(:last-of-type)': {
          borderBottomStyle: 'solid',
          borderBottomColor: 'neutrals.line',
          borderBottomWidth: 1,
        },
      }}
    >
      <Typography
        bgcolor='common.white'
        color='neutrals.gray'
        fontWeight='medium'
        left={0}
        position='sticky'
        px={1}
        py={1}
        right={0}
        top={0}
        zIndex={1}
      >
        {dayjs(date).format('MMMM YYYY')}
      </Typography>

      <Stack p={1} spacing={0.5}>
        {_files.map((file, index) => (
          <FileContent {...file} key={index} />
        ))}
      </Stack>
    </Stack>
  )
}

export const ReportFilesList = () => {
  const section = useParams({
    from: '/_auth/console/_console-layout/reports/_layout/$reportId/$section',
    select: (s) => s.section,
  })

  const grouppedFiles = map(
    groupBy(filter(files, {type: section}), 'date'),
    (_files, date) => ({
      date,
      files: _files,
    }),
  )

  const {reportId} = useParams({
    from: '/_auth/console/_console-layout/reports/_layout/$reportId/$section',
    select: (s) => ({reportId: s.reportId, section: s.section}),
  })

  const tabs: NavigationTab[] = [
    {
      label: 'media (10)',
      value: `/console/reports/${reportId}/media`,
    },
    {
      label: 'doc (2)',
      value: `/console/reports/${reportId}/doc`,
    },
    {
      label: 'pdf (1)',
      value: `/console/reports/${reportId}/pdf`,
    },
    {
      label: 'video (3)',
      value: `/console/reports/${reportId}/video`,
    },
  ]

  return (
    <Stack
      height='100%'
      p={1}
      sx={{
        borderWidth: 1,
        borderColor: 'neutrals.line',
        borderStyle: 'solid',
        borderRadius: 5,
      }}
    >
      <FilesListNavigationTabs tabs={tabs} />

      <Stack key={section} height={350} mt={2} overflow='auto' spacing={0}>
        {grouppedFiles.map(({date, files: _files}, index) => {
          return <FileGroup key={date} date={date} files={_files} />
        })}
      </Stack>
    </Stack>
  )
}
