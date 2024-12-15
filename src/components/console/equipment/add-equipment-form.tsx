import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Equipment} from '@/lib/data-provider/api/__generated'
import {useCreateEquipment} from '@/lib/data-provider/api/__generated'
import {refetchAllEquipment} from '@/utils/cache'

import type {EquipmentFormFormValues} from './equipment-form'
import {EquipmentForm, getEquipmentFormSchema} from './equipment-form'

const defaultValues: EquipmentFormFormValues = {
  name: '',
  equipmentModel: '',
  Manufacturer: '',
  count: 0,
  description: '',
  pricePerHour: 0,
  VIN: '',
  VRM: '',
}

export const AddEquipmentForm = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['equipment', 'form'])
  const {isPending, mutate: createEquipment} = useCreateEquipment()
  const form = useForm({
    resolver: zodResolver(getEquipmentFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof EquipmentForm>['onSubmit'] = (data) => {
    createEquipment(
      {data: data as unknown as Equipment},
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
      <EquipmentForm isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
