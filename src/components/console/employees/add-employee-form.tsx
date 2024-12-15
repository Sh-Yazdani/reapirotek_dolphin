import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Employee} from '@/lib/data-provider/api/__generated'
import {useCreateEmployee} from '@/lib/data-provider/api/__generated'
import {refetchAllEmployees} from '@/utils/cache'

import type {EmployeeFormValues} from './employee-form'
import {EmployeeForm, getEmployeeFormSchema} from './employee-form'
import {transformFormValuesToEmployeeDTO} from './employee-form-lib'

const defaultValues: EmployeeFormValues = {
  firstName: '',
  lastName: '',
  gender: '',
  nationalId: '',
  roleId: '',
  telephone: '',
  address: '',
  description: '',
  email: '',
  mobile: '',
}

export const AddEmployeeForm = () => {
  const navigate = useNavigate()
  const {isPending, mutate} = useCreateEmployee()
  const {t} = useTranslation('employees')
  const form = useForm({
    resolver: zodResolver(getEmployeeFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof EmployeeForm>['onSubmit'] = (data) => {
    mutate(
      {
        data: {
          ...transformFormValuesToEmployeeDTO(data),
          password: data.email,
        } as unknown as Employee,
      },
      {
        onSuccess: () => {
          /*  */
          refetchAllEmployees()
          void navigate({to: '/console/employees/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <EmployeeForm isEdit={false} isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
