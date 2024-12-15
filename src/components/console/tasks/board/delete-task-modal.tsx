import type {DialogProps} from '@mui/material'
import {Button, Card, Dialog, Stack, Typography} from '@mui/material'
import React from 'react'
import {useTranslation} from 'react-i18next'

interface DeleteTaskModalProps extends DialogProps {
  onConfirm: () => void
  isPending: boolean
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isPending,
  ...props
}) => {
  const {t} = useTranslation('tasks')
  return (
    <Dialog {...props}>
      <Card sx={{p: 2}}>
        <Stack spacing={1}>
          <Typography fontWeight='medium' variant='t1'>
            {t('delete-task-popconfirm.title', {defaultValue: 'Delete Task'})}
          </Typography>
          <Typography variant='t2'>
            {t('delete-task-popconfirm.description', {
              defaultValue: 'Are you sure about this action?',
            })}
          </Typography>
        </Stack>

        <Stack direction='row' justifyContent='flex-end' mt={3} spacing={1}>
          <Button
            autoFocus
            onClick={(e) => props.onClose?.(e, 'escapeKeyDown')}
          >
            {t('delete-task-popconfirm.cancel', {defaultValue: 'Cancel'})}
          </Button>
          <Button
            disabled={isPending}
            variant='contained'
            onClick={props.onConfirm}
          >
            {t('delete-task-popconfirm.cancel', {defaultValue: 'Delete'})}
          </Button>
        </Stack>
      </Card>
    </Dialog>
  )
}
