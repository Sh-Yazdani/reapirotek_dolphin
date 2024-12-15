import {Box, Button, InputAdornment, Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {Box1} from 'iconsax-react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {BackToLink, FormSection, FormTextField} from '@/components'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'

const columnGap = 2
const rowGap = 0

const GeneralInformationFormSection = () => {
  const {t} = useTranslation('equipment')
  return (
    <FormSection
      icon={Box1}
      title={t('equipment-form.general-information', {
        defaultValue: 'General information',
      })}
    >
      <Box
        columnGap={columnGap}
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        rowGap={rowGap}
      >
        <FormTextField
          label={t('equipment-form.name', {defaultValue: 'Name'})}
          name='name'
        />
        <FormTextField
          label={t('equipment-form.model', {defaultValue: 'Model'})}
          name='equipmentModel'
        />
        <FormTextField
          label={t('equipment-form.manufacturer', {
            defaultValue: 'Manufacturer',
          })}
          name='Manufacturer'
        />
        <FormTextField
          label={t('equipment-form.description', {
            defaultValue: 'Description',
          })}
          name='description'
        />
        <FormTextField
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            inputProps: {min: 0},
          }}
          label={t('equipment-form.price-per-hour', {
            defaultValue: 'Price per hour',
          })}
          name='pricePerHour'
          type='number'
        />
        <FormTextField
          InputProps={{
            inputProps: {min: 0},
          }}
          label={t('equipment-form.count', {defaultValue: 'Count'})}
          name='count'
          type='number'
        />
        <FormTextField
          label={t('equipment-form.vin', {defaultValue: 'VIN'})}
          name='VIN'
        />
        <FormTextField
          label={t('equipment-form.vrm', {defaultValue: 'VRM'})}
          name='VRM'
        />
      </Box>
    </FormSection>
  )
}

export const getEquipmentFormSchema = (t: TFunction<'equipment'>) =>
  z.object({
    name: makeNormalStringSchema({
      t,
      message: t('equipment-form.errors.name-invalid', {
        defaultValue: 'Name is incorrect',
      }),
    }),
    equipmentModel: makeNormalStringSchema({
      t,
      message: t('equipment-form.errors.model-invalid', {
        defaultValue: 'Model is incorrect',
      }),
    }),
    Manufacturer: z.string().min(1, {
      message: t('equipment-form.errors.manufacturer-required', {
        defaultValue: 'Manufacturer is required',
      }),
    }),
    description: z.string().optional(),
    pricePerHour: z.coerce.number().default(0),
    count: z.coerce.number().default(0),
    VIN: z.string().max(17, {
      message: t('equipment-form.errors.vin-length', {
        defaultValue: 'VIN must be a maximum of 17 characters long',
      }),
    }),
    VRM: z.string().optional(),
  })

export type EquipmentFormFormValues = z.infer<
  ReturnType<typeof getEquipmentFormSchema>
>

interface FormFooterProps {
  isEdit: boolean
  isPending: boolean
}

const FormFooter: React.FC<FormFooterProps> = ({isEdit, isPending}) => {
  const {t} = useTranslation('equipment')
  return (
    <Stack
      alignItems='center'
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Link to='/console/equipment/operations'>
        <BackToLink
          caption={t('equipment-form.back-to-equipment-list', {
            defaultValue: 'Back to Equipment list',
          })}
          fontWeight='regular'
          underline={false}
        />
      </Link>
      <Button
        disabled={isPending}
        size='large'
        sx={{width: 280, height: 52}}
        type='submit'
        variant='contained'
      >
        {isEdit
          ? t('equipment-form.edit-equipment', {
              defaultValue: 'Edit Equipment',
            })
          : t('equipment-form.add-equipment', {
              defaultValue: 'Add Equipment',
            })}
      </Button>
    </Stack>
  )
}

interface EquipmentFormProps {
  onSubmit: SubmitHandler<EquipmentFormFormValues>
  isEdit?: boolean
  isPending: boolean
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({
  isEdit = false,
  isPending,
  onSubmit,
}) => {
  const form = useFormContext<EquipmentFormFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <GeneralInformationFormSection />
      <FormFooter isEdit={isEdit} isPending={isPending} />
    </Stack>
  )
}
