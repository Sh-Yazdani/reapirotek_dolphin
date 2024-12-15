import {Box} from '@mui/material'
import {Edit} from 'iconsax-react'
import {head} from 'lodash-es'
import {useCallback} from 'react'
import type {DropEvent, FileRejection} from 'react-dropzone-esm'
import {useDropzone} from 'react-dropzone-esm'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {useGetSet, useUnmount} from 'react-use'

import defaultProfileImage from '@/assets/images/default-profile-image.jpeg'
import {generateFilePreview} from '@/components'

interface FilePreviewProps {
  preview?: string
  editable: boolean
}

const FilePreview: React.FC<FilePreviewProps> = ({editable, preview}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {xs: 1, lg: '0'},
        borderWidth: 2,
        height: 80,
        width: 80,
        borderRadius: 999,
        outline: 'none',
        transition: 'border .24s ease-in-out',
        background: `url(${preview ?? defaultProfileImage})`,
        backgroundSize: 'cover',
        position: 'relative',
        cursor: editable ? 'pointer' : 'auto',
      }}
    >
      {editable ? (
        <Box
          bgcolor='primary.main'
          borderRadius={10}
          bottom={0}
          color='common.white'
          component={Edit}
          cursor='pointer'
          p={0.5}
          position='absolute'
          right={0}
          size={24}
        />
      ) : null}
    </Box>
  )
}

interface DropzoneWrapperProps {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void
  editable: boolean
  children: React.ReactNode
}

const DropzoneWrapper: React.FC<DropzoneWrapperProps> = ({
  children,
  editable,
  onDrop,
}) => {
  const dropzone = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
    multiple: false,
    disabled: !editable,
  })

  const {getInputProps, getRootProps} = dropzone

  return (
    <div {...getRootProps({className: 'dropzone'})}>
      {children}
      <input {...getInputProps()} />
    </div>
  )
}

type FileWithPreview = File & {preview: string}

interface FormFileUploaderProps {
  name: FieldPath<FieldValues>
  editable?: boolean
}

export const FormProfileImageUploader: React.FC<FormFileUploaderProps> = ({
  editable = true,
  name,
}) => {
  const {field} = useController({name})
  const [getFiles, setFiles] = useGetSet<FileWithPreview[]>(field.value)

  const fieldValue = [field.value].filter(Boolean) as unknown as
    | (File & {preview: string})[]
    | undefined

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      setFiles(
        acceptedFiles.map((file) =>
          // eslint-disable-next-line fp/no-mutating-assign
          Object.assign(file, {preview: generateFilePreview(file)}),
        ),
      )

      field.onChange(getFiles())
    },
    [],
  )

  useUnmount(
    () => fieldValue?.forEach((file) => URL.revokeObjectURL(file.preview)),
  )

  const currentFile = head(getFiles())

  return (
    <section className='container'>
      <DropzoneWrapper editable={editable} onDrop={onDrop}>
        <FilePreview editable={editable} preview={currentFile?.preview} />
      </DropzoneWrapper>
    </section>
  )
}
