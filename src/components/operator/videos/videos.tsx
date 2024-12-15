import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import {Link, useSearch} from '@tanstack/react-router'
import dayjs, {Dayjs} from 'dayjs'
import type {TFunction} from 'i18next'
import {useTranslation} from 'react-i18next'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

import {VideoCard} from './video-card'

export interface Video {
  id: string
  name: string
  uploadedDate: Dayjs
  url: string
}

function createData(
  id: string,
  name: string,
  uploadedDate: Dayjs,
  url: string,
): Video {
  return {id, name, uploadedDate, url}
}

const detected = [
  createData(
    '1',
    'video-262-1',
    dayjs(),
    '/assets/videos/detection/detected/sample1.mp4',
  ),
  createData(
    '2',
    'video-159-2',
    dayjs(),
    '/assets/videos/detection/detected/sample2.mp4',
  ),
  createData(
    '3',
    'video-237-3',
    dayjs(),
    '/assets/videos/detection/detected/sample3.mp4',
  ),
  createData(
    '4',
    'video-356-4',
    dayjs(),
    '/assets/videos/detection/detected/sample4.mp4',
  ),
]

const undetected = [
  createData(
    '1',
    'video-262-5',
    dayjs(),
    '/assets/videos/detection/undetected/sample1.mp4',
  ),
  createData(
    '2',
    'video-159-6',
    dayjs(),
    '/assets/videos/detection/undetected/sample2.mp4',
  ),
  createData(
    '3',
    'video-237-7',
    dayjs(),
    '/assets/videos/detection/undetected/sample3.mp4',
  ),
  createData(
    '4',
    'video-356-8',
    dayjs(),
    '/assets/videos/detection/undetected/sample4.mp4',
  ),
  createData(
    '5',
    'video-452-9',
    dayjs(),
    '/assets/videos/detection/undetected/sample6.mp4',
  ),
]

const getColumns = (t: TFunction<'operator'>) =>
  [
    {
      label: t('videos.status.detected', {defaultValue: 'Detected'}),
      status: 'detected',
    },
    {
      label: t('videos.status.undetected', {defaultValue: 'Undetected'}),
      status: 'undetected',
    },
  ] as const

export const Videos = () => {
  const {t} = useTranslation('operator')
  const active = useSearch({strict: false, select: (s) => s.active!})
  const dataSource = active === 'detected' ? detected : undetected
  const content = dataSource.map((video) => {
    return <VideoCard {...video} key={video.name} />
  })
  const list = (
    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1366: 3}}>
      <Masonry gutter='16px'>{content}</Masonry>
    </ResponsiveMasonry>
  )

  const actions = (
    <Stack
      alignItems='center'
      bgcolor='common.white'
      direction='row'
      gap={2}
      justifyContent='space-between'
      pr={1}
    >
      <Box>
        <ToggleButtonGroup
          aria-label='Platform'
          color='primary'
          size='small'
          value={active}
          exclusive
        >
          {getColumns(t).map((_column) => (
            <Link
              key={_column.status}
              search={{active: _column.status}}
              to='/operator/videos'
            >
              <ToggleButton value={_column.status}>
                {_column.label}
              </ToggleButton>
            </Link>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Stack alignItems='flex-end'>
        <Link search={{active}} to='/operator/videos/upload-video'>
          <Button size='small' sx={{height: 34}} variant='contained'>
            {t('videos.upload', {defaultValue: 'Upload'})}
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
  return (
    <Stack gap={2}>
      {actions}
      {list}
    </Stack>
  )
}
