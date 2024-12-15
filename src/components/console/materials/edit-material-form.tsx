import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from '@tanstack/react-router'
import type {ComponentProps} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import type {Material} from '@/lib/data-provider/api/__generated'
import {
  useGetMaterialByIdSuspense,
  useUpdateMaterial,
} from '@/lib/data-provider/api/__generated'
import {refetchAllMaterials} from '@/utils/cache'

import {getMaterialFormSchema, MaterialFormView} from './material-form'
import {
  transformFormValuesToMaterialDTO,
  transformMaterialToFormValues,
} from './material-form-lib'

export const EditMaterialForm = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['materials', 'form'])

  const materialId = useParams({strict: false, select: (s) => s.materialId!})
  const {data: material} = useGetMaterialByIdSuspense(materialId, {
    query: {
      gcTime: 0,
    },
  })
  const {isPending, mutate: updateMaterial} = useUpdateMaterial()

  const form = useForm({
    resolver: zodResolver(getMaterialFormSchema(t)),
    defaultValues: transformMaterialToFormValues(material),
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof MaterialFormView>['onSubmit'] = (
    data,
  ) => {
    updateMaterial(
      {
        id: materialId,
        data: transformFormValuesToMaterialDTO(data) as Material,
      },
      {
        onSuccess() {
          refetchAllMaterials()
          void navigate({to: '/console/materials/operations'})
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <MaterialFormView isPending={isPending} isEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}
