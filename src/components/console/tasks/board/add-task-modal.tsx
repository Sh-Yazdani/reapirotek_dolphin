import {zodResolver} from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  dialogClasses,
  DialogContent,
  paperClasses,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {useParams} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import * as React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {CloseIcon, FormTextField} from '@/components'
import type {Task, TaskStatus} from '@/lib/data-provider/api/__generated'
import {
  useCreateTask,
  useGetAllProjectsSuspense,
} from '@/lib/data-provider/api/__generated'
import {refetchAllTasks} from '@/utils/cache'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskStatus: TaskStatus
}

export const getAddTaskFormSchema = (t: TFunction<'tasks'>) =>
  z.object({
    title: z.string().min(2, {
      message: t('add-task-modal.errors.title-invalid', {
        defaultValue: 'Invalid title',
      }),
    }),
    description: z.string().min(3, {
      message: t('add-task-modal.errors.description-invalid', {
        defaultValue: 'Invalid description',
      }),
    }),
    // projectId: z.string().min(3, {
    //   message: t('add-task.errors.project-invalid', {
    //     defaultValue: 'Invalid Project',
    //   }),
    // }).optional(),
  })

type AddTaskFormValues = z.infer<ReturnType<typeof getAddTaskFormSchema>>

interface AddTaskModalFormViewProps {
  onSubmit: SubmitHandler<AddTaskFormValues>
  isPending: boolean
}

const AddTaskModalFormView: React.FC<AddTaskModalFormViewProps> = ({
  isPending,
  onSubmit,
}) => {
  const {t} = useTranslation('tasks')
  const form = useFormContext<AddTaskFormValues>()
  const {data: projects} = useGetAllProjectsSuspense()
  const projectId = useParams({
    select: (s) => s.projectId,
    strict: false,
  })
  return (
    <Stack
      component='form'
      spacing={3}
      width='100%'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Stack>
        <FormTextField
          label={t('add-task-modal.title', {defaultValue: 'Title'})}
          name='title'
          variant='outlined'
        />

        {/* {!projectId && (
          <FormAutoComplete
            label='Project'
            name='projectId'
            options={projects.map((project) => ({
              label: project.title,
              value: project.id,
            }))}
          />
        )} */}

        <FormTextField
          label={t('add-task-modal.description', {
            defaultValue: 'Description',
          })}
          name='description'
          rows={5}
          variant='outlined'
          multiline
        />
      </Stack>

      <Button disabled={isPending} type='submit' variant='contained'>
        {t('add-task-modal.add-task', {defaultValue: 'Add Task'})}
      </Button>
    </Stack>
  )
}

interface AddTaskModalFormProps {
  taskStatus: TaskStatus
  onClose: () => void
}

export const AddTaskModalForm: React.FC<AddTaskModalFormProps> = ({
  onClose,
  taskStatus,
}) => {
  const projectId = useParams({
    select: (s) => s.projectId,
    strict: false,
  })!
  const defaultValues: AddTaskFormValues = {
    title: '',
    description: '',
    // projectId,
  }
  const {isPending, mutate: createTask} = useCreateTask()
  const {t} = useTranslation('tasks')
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(getAddTaskFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: React.ComponentProps<
    typeof AddTaskModalFormView
  >['onSubmit'] = (data) => {
    createTask(
      {data: {...data, status: taskStatus} as unknown as Task},
      {
        onSuccess: () => {
          refetchAllTasks()
          onClose()
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <AddTaskModalFormView isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  taskStatus,
}) => {
  const {t} = useTranslation('tasks')
  return (
    <Dialog
      open={isOpen}
      sx={{
        [`& .${dialogClasses.container}`]: {
          [`& .${paperClasses.root}`]: {
            width: '100%',
            maxWidth: '432px',
          },
        },
      }}
      fullWidth
      onClose={onClose}
    >
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        pb={2}
        pt={3}
        px={{xs: 2, md: 3}}
      >
        <Typography fontWeight='bold' variant='t2'>
          {t('add-task-modal.add-new-task', {
            defaultValue: 'Add New Task',
          })}
        </Typography>
        <CloseIcon color='neutrals.gray' onClick={onClose} />
      </Stack>

      <React.Suspense
        fallback={<Skeleton height={308.25} variant='rectangular' />}
      >
        <DialogContent>
          <AddTaskModalForm taskStatus={taskStatus} onClose={onClose} />
        </DialogContent>
      </React.Suspense>
    </Dialog>
  )
}
