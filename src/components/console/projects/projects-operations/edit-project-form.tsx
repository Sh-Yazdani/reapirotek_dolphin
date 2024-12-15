import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Project} from '@/lib/data-provider/api/__generated'
import {
  useGetProjectByIdSuspense,
  usePatchProject,
} from '@/lib/data-provider/api/__generated'

import {getProjectFormSchema, ProjectForm} from './project-form'
import {
  transformDTOToFormValues,
  transformFormValuesToDTO,
} from './project-form-lib'

export const EditProjectForm = () => {
  const projectId = useParams({
    from: '/_auth/console/_console-layout/projects/_projects-list-layout/operations/edit/$projectId',
    select: (s) => s.projectId,
  })

  const {data: project} = useGetProjectByIdSuspense(projectId, {
    query: {
      gcTime: 0,
    },
  })
  const navigate = useNavigate()
  const {isPending, mutate: updateProject} = usePatchProject()
  const {t} = useTranslation(['projects', 'form'])

  const form = useForm({
    resolver: zodResolver(getProjectFormSchema(t), {}),
    defaultValues: transformDTOToFormValues(project),
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof ProjectForm>['onSubmit'] = (data) => {
    updateProject(
      {
        id: projectId,
        data: transformFormValuesToDTO(data) as unknown as Project,
      },
      {
        onSuccess: () => {
          void navigate({to: '/console/projects/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <ProjectForm isPending={isPending} isEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}
