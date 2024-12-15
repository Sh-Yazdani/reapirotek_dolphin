import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Material} from '@/lib/data-provider/api/__generated'
import {useCreateMaterial} from '@/lib/data-provider/api/__generated'

import type {MaterialFormValues} from './material-form'
import {getMaterialFormSchema, MaterialFormView} from './material-form'
import {transformFormValuesToMaterialDTO} from './material-form-lib'

const defaultValues: MaterialFormValues = {
  name: '',
  description: '',
  value: 0,
  pricePerUnit: 0,
  unit: 'Kg',
}

export const AddMaterialForm = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['materials', 'form'])

  const {isPending, mutate: addMaterial} = useCreateMaterial()
  const form = useForm({
    resolver: zodResolver(getMaterialFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof MaterialFormView>['onSubmit'] = (
    data,
  ) => {
    addMaterial(
      {data: transformFormValuesToMaterialDTO(data) as Material},
      {
        onSuccess() {
          void navigate({to: '/console/materials/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <MaterialFormView
        isEdit={false}
        isPending={isPending}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}
