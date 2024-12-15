import {Box, Stack, Typography, useTheme} from '@mui/material'
import {Cloud, Document} from 'iconsax-react'
import type {CSSProperties} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {
  DropEvent,
  DropzoneOptions,
  FileRejection,
} from 'react-dropzone-esm'
import {useDropzone} from 'react-dropzone-esm'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useGetSet, useUnmount} from 'react-use'
import {toast} from 'sonner'

import {CloseIcon, IconContainer, ToastContent} from '@/components'

type FileWithPreview = File & {preview: string}

export const generateFilePreview = (file: File) => {
  const url = URL.createObjectURL(file)
  return url
}

interface FormFileUploaderProps extends Omit<DropzoneOptions, 'onDrop'> {
  name: FieldPath<FieldValues>
}

// eslint-disable-next-line max-lines-per-function
export const FormFileUploader: React.FC<FormFileUploaderProps> = ({
  name,
  ...dropzoneOptions
}) => {
  const {t} = useTranslation('form')
  const {field} = useController({name})
  const [getFiles, setFiles] = useGetSet<FileWithPreview[]>(field.value)
  const fieldValue = field.value as unknown as (File & {preview: string})[]
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => {
          // eslint-disable-next-line fp/no-mutating-assign
          return Object.assign(file, {preview: generateFilePreview(file)})
        }),
      ])

      field.onChange(getFiles())

      if (fileRejections.length) {
        toast(
          <ToastContent
            description={t(
              'form-file-uploader.file-size-limit-exceeded.description',
              {
                defaultValue:
                  "Some files couldn't be uploaded due to their size, file size should be lower than 15MB",
              },
            )}
            title={t('form-file-uploader.file-size-limit-exceeded.title', {
              defaultValue: 'File size limit exceeded',
            })}
            type='error'
          />,
        )
      }
    },
    [],
  )

  const thumbs = fieldValue.map((file) => {
    return (
      <Stack
        key={file.name}
        alignItems='center'
        border='1px solid'
        borderColor='neutrals.line'
        borderRadius={3}
        justifyContent='center'
        overflow='hidden'
        p={1}
        position='relative'
        width='100%'
      >
        <Box
          left={2}
          position='absolute'
          top={2}
          onClick={(e) => {
            e.stopPropagation()
            field.onChange(
              fieldValue.filter(
                (prevFile) => prevFile.preview !== file.preview,
              ),
            )
          }}
        >
          <CloseIcon />
        </Box>
        <IconContainer>
          <Box color='neutrals.gray' component={Document} />
        </IconContainer>
        <Typography title={file.name} variant='small' width='100%' noWrap>
          {file.name}
        </Typography>
      </Stack>
    )
  })

  const dropzone = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
      'video/*': [],
    },
    onDrop,
    ...dropzoneOptions,
  })
  const {getInputProps, getRootProps, isDragAccept, isDragReject, isFocused} =
    dropzone
  const theme = useTheme()
  const style = useMemo(() => {
    const defaultStyles = {}

    if (isFocused) {
      // eslint-disable-next-line fp/no-mutating-assign
      Object.assign(defaultStyles, {
        borderColor: theme.palette.primary.main,
      })
    }

    if (isDragAccept) {
      // eslint-disable-next-line fp/no-mutating-assign
      Object.assign(defaultStyles, {
        borderColor: theme.palette.success.light,
      })
    }

    if (isDragReject) {
      // eslint-disable-next-line fp/no-mutating-assign
      Object.assign(defaultStyles, {
        borderColor: theme.palette.error.light,
      })
    }

    return defaultStyles
  }, [isFocused, isDragAccept, isDragReject]) as CSSProperties

  useUnmount(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    fieldValue.forEach((file) => URL.revokeObjectURL(file.preview))
  })

  return (
    <section className='container'>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: {xs: 2, md: 3, lg: '40px'},
          borderWidth: 2,
          borderRadius: 2,
          borderColor: 'neutrals.line',
          borderStyle: 'dashed',
          backgroundColor: 'common.white',
          outline: 'none',
          transition: 'border .24s ease-in-out',
        }}
        {...getRootProps({className: 'dropzone', style})}
      >
        <input {...getInputProps()} />
        <Stack alignItems='center'>
          <IconContainer>
            <Box component={Cloud} size={30} />
          </IconContainer>

          <Typography fontWeight='bold' variant='t2'>
            {t('form-file-uploader.browse-files', {
              defaultValue: 'Browse files',
            })}
          </Typography>
          <Typography variant='caption'>
            {t('form-file-uploader.drag-and-drop-files-here', {
              defaultValue: 'Drag and drop files here',
            })}
          </Typography>
        </Stack>

        {thumbs.length ? (
          <Box
            display='grid'
            gap={2}
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              xl: 'repeat(5, 1fr)',
            }}
            mt={1}
            width='100%'
          >
            {thumbs}
          </Box>
        ) : null}
      </Box>
    </section>
  )
}
