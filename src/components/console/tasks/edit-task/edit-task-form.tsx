import {zodResolver} from '@hookform/resolvers/zod'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import {Link, useNavigate, useParams, useSearch} from '@tanstack/react-router'
import type {ParseKeys, TFunction} from 'i18next'
import type {Icon, IconProps} from 'iconsax-react'
import {
  ArrowCircleUp,
  ArrowDown,
  ArrowDown2,
  ArrowUp,
  ArrowUp2,
  Minus,
} from 'iconsax-react'
import {find, isUndefined} from 'lodash-es'
import type {FC} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import * as z from 'zod'

import type {FormSelectFieldProps} from '@/components'
import {FormDatePicker, FormTextField, IconContainer} from '@/components'
import {useBreakpointValues} from '@/hooks'
import type {TaskPriority} from '@/lib/data-provider/api/__generated'
import {
  useGetAllEmployeesSuspense,
  useGetTaskByIdSuspense,
  useUpdateTask,
} from '@/lib/data-provider/api/__generated'
import {refetchAllTasks} from '@/utils/cache'
import {dateType} from '@/utils/validations/date'

import {getColumns} from '../data'
import {FormAutoCompleteWithModalOnMobile} from './form-auto-complete-with-modal-on-mobile'
import {FormSelectWithModalOnMobile} from './form-select-with-modal-on-mobile'
import {
  transformTaskFormValuesToDto,
  transformTaskToFormValues,
} from './task-form-lib'

const getTagsOptions = (t: TFunction<'tasks'>) => [
  {
    label: t('tag-options.bug', {defaultValue: 'Bug'}),
    value: 'bug',
  },
  {
    label: t('tag-options.change', {defaultValue: 'Change'}),
    value: 'change',
  },
  {
    label: t('tag-options.issue', {defaultValue: 'Issue'}),
    value: 'issue',
  },
  {
    label: t('tag-options.meeting', {defaultValue: 'Meeting'}),
    value: 'meeting',
  },
  {
    label: t('tag-options.request', {defaultValue: 'Request'}),
    value: 'request',
  },
  {
    label: t('tag-options.risk', {defaultValue: 'Risk'}),
    value: 'risk',
  },
  {
    label: t('tag-options.ticket', {defaultValue: 'Ticket'}),
    value: 'ticket',
  },
]

interface PriorityOption {
  label: string
  value: TaskPriority
  icon: Icon
}
const getPriorityOptions = (t: TFunction<'tasks'>): PriorityOption[] => [
  {
    label: t('priority-options.critical', {
      defaultValue: 'Critical',
    }),
    value: 'critical',
    icon: ArrowCircleUp,
  },
  {
    label: t('priority-options.very-high', {
      defaultValue: 'Very High',
    }),
    value: 'very-high',
    icon: ArrowUp2,
  },
  {
    label: t('priority-options.high', {defaultValue: 'High'}),
    value: 'high',
    icon: ArrowUp,
  },
  {
    label: t('priority-options.medium', {
      defaultValue: 'Medium',
    }),
    value: 'medium',
    icon: Minus,
  },
  {
    label: t('priority-options.low', {defaultValue: 'Low'}),
    value: 'low',
    icon: ArrowDown2,
  },
  {
    label: t('priority-options.very-low', {
      defaultValue: 'Very Low',
    }),
    value: 'very-low',
    icon: ArrowDown,
  },
]

const Priority = () => {
  const {t} = useTranslation('tasks')
  const {isMobile} = useBreakpointValues()

  const renderOption: FormSelectFieldProps['renderOption'] = (() => {
    if (isMobile) return

    // eslint-disable-next-line react/no-unstable-nested-components
    return (option) => {
      const _option = find(getPriorityOptions(t), {
        value: option.value,
      }) as PriorityOption
      const Icon = _option.icon as FC<IconProps>

      return (
        <MenuItem key={option.value} value={option.value}>
          <Stack alignItems='center' direction='row' gap={1}>
            <IconContainer component={Icon} size={16} />
            <Typography mt={0.3} variant='body1'>
              {option.label}
            </Typography>
          </Stack>
        </MenuItem>
      )
    }
  })()

  return (
    <FormSelectWithModalOnMobile
      label={t('edit-task-form.priority', {defaultValue: 'Priority'})}
      name='priority'
      options={getPriorityOptions(t)}
      renderOption={renderOption}
      renderValue={(option) => {
        const {icon: Icon, label} = find(getPriorityOptions(t), {
          value: option as string,
        }) as PriorityOption
        return (
          <Stack alignItems='center' direction='row' gap={0.5}>
            <IconContainer component={Icon} size={16} />
            <Typography mt={0.3} variant='body1'>
              {label}
            </Typography>
          </Stack>
        )
      }}
    />
  )
}

interface StatusOption {
  label: string
  value: string
}
const getStatusOptions = (t: TFunction<'tasks'>): StatusOption[] =>
  getColumns(t).map((column) => ({
    label: t(`columns.${column.status}` as unknown as ParseKeys<'tasks'>),
    value: column.status,
  }))

const Status = () => {
  const {t} = useTranslation('tasks')
  const {isMobile} = useBreakpointValues()

  const renderOption: FormSelectFieldProps['renderOption'] = (() => {
    if (isMobile) return

    // eslint-disable-next-line react/no-unstable-nested-components
    return (option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          <Stack alignItems='center' direction='row' gap={1}>
            <Typography mt={0.3} variant='body1'>
              {option.label}
            </Typography>
          </Stack>
        </MenuItem>
      )
    }
  })()

  return (
    <FormSelectWithModalOnMobile
      label={t('edit-task-form.status', {defaultValue: 'Status'})}
      name='status'
      options={getStatusOptions(t)}
      renderOption={renderOption}
      renderValue={(option) => {
        const _option = find(getStatusOptions(t), {
          value: option as string,
        }) as unknown as StatusOption
        return (
          <Stack alignItems='center' direction='row' gap={0.5}>
            <Typography mt={0.3} variant='body1'>
              {_option.label}
            </Typography>
          </Stack>
        )
      }}
    />
  )
}

const Assignees = () => {
  const {t} = useTranslation('tasks')
  const {data: users} = useGetAllEmployeesSuspense()
  return (
    <FormAutoCompleteWithModalOnMobile
      label={t('edit-task-form.assignees', {defaultValue: 'Assignees'})}
      name='assignees'
      options={users.map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id as unknown as string,
      }))}
      renderOption={(_props, option) => {
        /* @ts-ignore CMT */
        const {key, ...optionProps} = _props

        const currentUser = find(users, {id: option.value})
        return (
          <Box key={key} component='li' sx={{display: 'flex'}} {...optionProps}>
            <Avatar
              src={currentUser?.profilePhoto}
              sx={{height: 20, width: 20, mr: 1}}
            />
            {option.label}
          </Box>
        )
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index: number) => {
          const {key, ...tagProps} = getTagProps({index})
          const currentUser = find(users, {id: option.value})

          return (
            <Chip
              key={key}
              avatar={<Avatar alt='Natacha' src={currentUser?.profilePhoto} />}
              label={option.label}
              size='small'
              {...tagProps}
            />
          )
        })
      }
    />
  )
}

export const getEditTaskFormSchema = (t: TFunction<'form' | 'tasks'>) =>
  z.object({
    title: z.string({
      message: t('edit-task-form.errors.title-invalid', {
        defaultValue: 'Invalid title',
      }),
    }),
    description: z.string({
      message: t('edit-task-form.errors.description-invalid', {
        defaultValue: 'Invalid description',
      }),
    }),
    dueDate: dateType.optional(), // Assuming dateType is defined elsewhere
    tags: z.array(z.string()).optional(),
    priority: z.string().optional(),
    assignees: z.array(z.string()).optional(),
    status: z.string().optional(),
  })

export type EditTaskFormValues = z.infer<
  ReturnType<typeof getEditTaskFormSchema>
>

interface EditTaskFormProps {
  assignable: boolean
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({assignable}) => {
  const {t} = useTranslation(['tasks', 'form'])
  const {projectId, taskId} = useParams({
    select: (s) => ({taskId: s.taskId!, projectId: s.projectId!}),
    strict: false,
  })

  const {data: task} = useGetTaskByIdSuspense(taskId, {
    query: {
      gcTime: 0,
      staleTime: 0,
    },
  })
  const {isPending: updateTaskIsPending, mutate: updateTask} = useUpdateTask()
  const isProjectTasks = !isUndefined(projectId)
  const form = useForm<EditTaskFormValues>({
    defaultValues: {
      ...transformTaskToFormValues(task),
    } as unknown as EditTaskFormValues,
    resolver: zodResolver(getEditTaskFormSchema(t)),
  })

  const navigate = useNavigate()

  const redirect = useSearch({strict: false, select: (s) => s.redirect!})
  // const callbackUrl = (() => {
  //   if (isProjectTasks) {
  //     return {to: '/console/projects/$projectId/tasks', params: {projectId}}
  //   }

  //   return {to: '/console/tasks'}
  //
  // })()

  const onSubmit: SubmitHandler<EditTaskFormValues> = (data) => {
    updateTask(
      /* @ts-ignore TODO -> Swagger issues */
      {id: taskId, data: transformTaskFormValuesToDto(data)},
      {
        onSuccess: () => {
          refetchAllTasks()
          void navigate({to: redirect})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <Card component='form' onSubmit={form.handleSubmit(onSubmit)}>
        <Stack mt={1} spacing={1}>
          <Box display='grid' gap={2} gridTemplateColumns='repeat(3, 1fr)'>
            <Box gridColumn='1/ span 2'>
              <FormTextField
                label={t('edit-task-form.title', {defaultValue: 'Title'})}
                name='title'
              />
            </Box>
            <Status />
          </Box>
          <FormTextField
            label={t('edit-task-form.description', {
              defaultValue: 'Description',
            })}
            name='description'
            rows={4}
            multiline
          />

          <FormDatePicker
            label={t('edit-task-form.due-date', {defaultValue: 'Due Date'})}
            name='dueDate'
          />
          <FormAutoCompleteWithModalOnMobile
            label={t('edit-task-form.tags', {defaultValue: 'Tags'})}
            name='tags'
            options={getTagsOptions(t)}
          />
          <Priority />
          {isProjectTasks || assignable ? <Assignees /> : null}

          <Stack direction='row' gap={2} justifyContent='flex-end'>
            <Link to={redirect}>
              <Button variant='outlined'>
                {t('edit-task-form.cancel', {defaultValue: 'Cancel'})}
              </Button>
            </Link>

            <Button
              disabled={updateTaskIsPending}
              type='submit'
              variant='contained'
            >
              {t('edit-task-form.save', {defaultValue: 'Save'})}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
