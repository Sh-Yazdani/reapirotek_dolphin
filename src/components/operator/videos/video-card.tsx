import {Card, Stack, Typography} from '@mui/material'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {useBoolean} from '@/hooks/useBooleanValue'
import {shortDateFormat} from '@/utils/date'

import {DeleteVideoModal} from './delete-video-modal'
import {VideoPlayer} from './video-player'
import type {Video} from './videos'

export const VideoCard: React.FC<Video> = ({id, name, uploadedDate, url}) => {
  const [isDeleteVideoModalOpen, {close}] = useBoolean()
  const {t} = useTranslation('operator')
  return (
    <Card>
      <Stack gap={2}>
        <Typography fontWeight='bold' variant='t2'>
          {name}
        </Typography>

        <VideoPlayer src={url} />

        <Stack
          flexDirection='row'
          gap={2}
          justifyContent='space-between'
          width='100%'
        >
          <Typography fontWeight='bold'>
            {t('videos.uploaded-date', {defaultValue: 'Uploaded Date'})}
          </Typography>

          <Typography>{uploadedDate.format(shortDateFormat)}</Typography>
        </Stack>
      </Stack>

      <DeleteVideoModal
        open={isDeleteVideoModalOpen}
        onClose={close}
        onConfirm={close}
      />
    </Card>
  )
}
