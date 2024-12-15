import {Box, Button, Stack, Typography} from '@mui/material'
import {useNavigate, useSearch} from '@tanstack/react-router'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import * as z from 'zod'

import {CloseIcon, Dialog} from '@/components'
import {FormFileUploader} from '@/components/form-elements'

const UploadVideoFormSchema = z.object({
  files: z.any(),
})

type UploadVideoFormValues = z.infer<typeof UploadVideoFormSchema>

const UploadVideoForm = () => {
  const {t} = useTranslation('operator')
  const form = useForm({
    defaultValues: {
      files: [],
    },
  })

  const onSubmit: SubmitHandler<UploadVideoFormValues> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...form}>
      <Stack component='form' gap={2} onSubmit={form.handleSubmit(onSubmit)}>
        <FormFileUploader
          accept={{
            'video/*': [],
            'image/*': [],
          }}
          maxSize={1024 * 15 /* 15 MB */}
          name='files'
        />
        <Button sx={{alignSelf: 'flex-end'}} variant='contained'>
          {t('videos.save', {defaultValue: 'Save'})}
        </Button>
      </Stack>
    </FormProvider>
  )
}

export const UploadVideo = () => {
  const {t} = useTranslation('operator')
  const navigate = useNavigate()
  const active = useSearch({strict: false, select: (s) => s.active!})

  const onClose = () => {
    void navigate({to: '/operator/videos', search: {active}})
  }

  return (
    <Dialog maxWidth='md' fullWidth open onClose={onClose}>
      <Stack gap={2} width='100%'>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <Typography variant='t2'>
            {t('videos.upload-video', {defaultValue: 'Upload a video'})}
          </Typography>
          <CloseIcon onClick={onClose} />
        </Stack>
        <Box>
          <UploadVideoForm />
        </Box>
      </Stack>
    </Dialog>
  )
}
