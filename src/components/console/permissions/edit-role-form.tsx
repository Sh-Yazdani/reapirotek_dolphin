import {useNavigate, useParams} from '@tanstack/react-router'
import {omit} from 'lodash-es'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {RoleFormValues} from '@/components/console/permissions/role-form'
import {
  getRoleFormResolver,
  RoleForm,
} from '@/components/console/permissions/role-form'
import type {Role} from '@/lib/data-provider/api/__generated'
import {
  useGetRoleByIdSuspense,
  useUpdateRole,
} from '@/lib/data-provider/api/__generated'

import {roles} from './permissions-data'

interface EditRoleFormProps {}

export const EditRoleForm: React.FC<EditRoleFormProps> = () => {
  const roleId = useParams({
    strict: false,
    select: (s) => s.roleId!,
  })
  const {t} = useTranslation(['employees', 'form'])
  const navigate = useNavigate()
  const {data: role} = useGetRoleByIdSuspense(roleId, {
    query: {
      gcTime: 0,
    },
  })
  const {isPending, mutate: updateRole} = useUpdateRole()
  const defaultValues: RoleFormValues = {
    name: role.name,
    description: role.description!,
    permissions: roles[0].permissions,
  }

  const form = useForm<RoleFormValues>({
    defaultValues,
    resolver: getRoleFormResolver(t),
  })

  const onSubmit: ComponentProps<typeof RoleForm>['onSubmit'] = (data) => {
    updateRole(
      {id: roleId, data: omit(data, 'permissions') as Role},
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
