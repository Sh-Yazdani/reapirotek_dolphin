import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Project} from '@/lib/data-provider/api/__generated'
import {useCreateProject} from '@/lib/data-provider/api/__generated'
import {getProjectStatusOptions} from '@/mock/projects'

import type {ProjectFormValues} from './project-form'
import {getProjectFormSchema, ProjectForm} from './project-form'
import {transformFormValuesToDTO} from './project-form-lib'

export const AddProjectForm = () => {
  const {t} = useTranslation(['projects', 'form'])
  const defaultValues = {
    title: '',
    zoneId: '',
    status: getProjectStatusOptions(t)[0].value,
    description: '',
    areaHeight: 0,
    areaLength: 0,
    areaWidth: 0,
    latitude: 0,
    longitude: 0,
    measureUnit: 'cm',
  } as ProjectFormValues
  const navigate = useNavigate()
  const {isPending, mutate} = useCreateProject()

  const form = useForm({
    resolver: zodResolver(getProjectFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof ProjectForm>['onSubmit'] = (data) => {
    mutate(
      {data: transformFormValuesToDTO(data) as unknown as Project},
      {
        onSuccess: () => {
          void navigate({to: '/console/projects/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <ProjectForm isEdit={false} isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
