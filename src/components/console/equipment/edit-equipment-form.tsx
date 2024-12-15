import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Equipment} from '@/lib/data-provider/api/__generated'
import {
  useGetEquipmentByIdSuspense,
  useUpdateEquipment,
} from '@/lib/data-provider/api/__generated'
import {refetchAllEquipment} from '@/utils/cache'

import {EquipmentForm, getEquipmentFormSchema} from './equipment-form'
import {
  transformEquipmentToFormValues,
  transformFormValuesToEquipmentDTO,
} from './equipment-form-lib'

export const EditEquipmentForm = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['equipment', 'form'])

  const {isPending, mutate: updateEquipment} = useUpdateEquipment()
  const equipmentId = useParams({strict: false, select: (s) => s.equipmentId!})
  const {data: equipment} = useGetEquipmentByIdSuspense(equipmentId, {
    query: {gcTime: 0},
  })
  const form = useForm({
    resolver: zodResolver(getEquipmentFormSchema(t)),
    defaultValues: transformEquipmentToFormValues(equipment),
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof EquipmentForm>['onSubmit'] = (data) => {
    updateEquipment(
      {
        id: equipmentId,
        data: transformFormValuesToEquipmentDTO(data) as unknown as Equipment,
      },
      {
        onSuccess: () => {
          refetchAllEquipment()
          void navigate({to: '/console/equipment/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <EquipmentForm isPending={isPending} isEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}
