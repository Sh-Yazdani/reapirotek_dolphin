import {useNavigate} from '@tanstack/react-router'
import {omit} from 'lodash-es'
import type {ComponentProps} from 'react'
import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import {getRoleFormResolver, RoleForm} from '@/components'
import type {RoleFormValues} from '@/components/console/permissions/role-form'
import type {Role} from '@/lib/data-provider/api/__generated'
import {useCreateRole} from '@/lib/data-provider/api/__generated'

import {createRoleFormDefaultValues, resources} from './permissions-data'

const defaultValues: RoleFormValues = {
  name: '',
  description: '',
  permissions: createRoleFormDefaultValues(resources, () => false),
}

interface AddRoleFormProps {}

export const AddRoleForm: React.FC<AddRoleFormProps> = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['employees', 'form'])
  const {isPending, mutate: createRole} = useCreateRole()
  const form = useForm<RoleFormValues>({
    defaultValues,
    resolver: getRoleFormResolver(t),
  })

  const onSubmit: ComponentProps<typeof RoleForm>['onSubmit'] = (data) => {
    createRole(
      {data: omit(data, 'permissions') as Role},
      {
        onSuccess: () => {
          void navigate({to: '/console/employees/roles'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <RoleForm isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
