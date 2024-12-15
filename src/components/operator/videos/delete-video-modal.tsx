import type {DialogProps} from '@mui/material'
import {Button, Card, Dialog, Stack, Typography} from '@mui/material'
import React from 'react'
import {useTranslation} from 'react-i18next'

interface DeleteVideoModal extends DialogProps {
  onConfirm: () => void
}

export const DeleteVideoModal: React.FC<DeleteVideoModal> = (props) => {
  const {t} = useTranslation('operator')
  return (
    <Dialog {...props}>
      <Card sx={{p: 2}}>
        <Stack spacing={1}>
          <Typography fontWeight='medium' variant='t1'>
            {t('videos.delete-video', {defaultValue: 'Delete Video'})}
          </Typography>
          <Typography variant='t2'>
            {t('videos.delete-video-confirmation', {
              defaultValue: 'Are you sure about this action?',
            })}
          </Typography>
        </Stack>

        <Stack direction='row' justifyContent='flex-end' mt={3} spacing={1}>
          <Button
            autoFocus
            onClick={(e) => props.onClose?.(e, 'escapeKeyDown')}
          >
            {t('videos.cancel', {defaultValue: 'Cancel'})}
          </Button>
          <Button variant='contained' onClick={props.onConfirm}>
            {t('videos.delete', {defaultValue: 'Delete'})}
          </Button>
        </Stack>
      </Card>
    </Dialog>
  )
}
