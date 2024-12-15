import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Employee} from '@/lib/data-provider/api/__generated'
import {
  useGetEmployeeByIdSuspense,
  useUpdateEmployee,
} from '@/lib/data-provider/api/__generated'
import {refetchAllEmployees} from '@/utils/cache'

import {EmployeeForm, getEmployeeFormSchema} from './employee-form'
import {
  transformEmployeeToFormValues,
  transformFormValuesToEmployeeDTO,
} from './employee-form-lib'

export const EditEmployeeForm = () => {
  const employeeId = useParams({
    from: '/_auth/console/_console-layout/employees/_layout/operations/edit/$employeeId',
    select: (s) => s.employeeId,
  })
  const {t} = useTranslation('employees')

  const {data: employee} = useGetEmployeeByIdSuspense(employeeId, {
    query: {
      gcTime: 0,
    },
  })
  const {isPending, mutate: updateEmployee} = useUpdateEmployee()

  const form = useForm({
    defaultValues: transformEmployeeToFormValues(employee),
    resolver: zodResolver(getEmployeeFormSchema(t)),
  })
  const navigate = useNavigate()

  const onSubmit: ComponentProps<typeof EmployeeForm>['onSubmit'] = (data) => {
    updateEmployee(
      {
        id: employeeId,
        data: transformFormValuesToEmployeeDTO(data) as unknown as Employee,
      },
      {
        onSuccess() {
          refetchAllEmployees()
          void navigate({to: '/console/employees/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <EmployeeForm isPending={isPending} isEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}
