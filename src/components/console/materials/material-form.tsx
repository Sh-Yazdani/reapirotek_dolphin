import {Box, Button, Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {Fatrows} from 'iconsax-react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {BackToLink, FormSection, FormSelect, FormTextField} from '@/components'
import {getMaterialUnitOptions} from '@/mock/materials'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'

const columnGap = 2
const rowGap = 0

const GeneralInformationFormSection = () => {
  const {t} = useTranslation('materials')
  return (
    <FormSection
      icon={Fatrows}
      title={t('material-form.general-information', {
        defaultValue: 'General Information',
      })}
    >
      <Box
        columnGap={columnGap}
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        rowGap={rowGap}
      >
        <FormTextField
          label={t('material-form.name', {defaultValue: 'Name'})}
          name='name'
        />

        <Box gridColumn={{md: '2 / span 2'}} gridRow={{md: '1'}}>
          <FormTextField
            label={t('material-form.description', {
              defaultValue: 'Description',
            })}
            name='description'
          />
        </Box>

        <FormTextField
          InputProps={{
            inputProps: {min: 0},
          }}
          label={t('material-form.value', {defaultValue: 'Value'})}
          name='value'
          type='number'
        />

        <FormTextField
          InputProps={{
            inputProps: {min: 0},
          }}
          label={t('material-form.price-per-unit', {
            defaultValue: 'Price per unit',
          })}
          name='pricePerUnit'
          type='number'
        />

        <FormSelect
          label={t('material-form.unit', {defaultValue: 'Unit'})}
          name='unit'
          options={getMaterialUnitOptions(t)}
        />
      </Box>
    </FormSection>
  )
}

export const getMaterialFormSchema = (t: TFunction<'materials'>) =>
  z.object({
    name: makeNormalStringSchema({
      t,
      message: t('material-form.errors.name-invalid', {
        defaultValue: 'Name is incorrect',
      }),
    }),
    description: makeNormalStringSchema({
      t,
      message: t('material-form.errors.description-invalid', {
        defaultValue: 'Description is incorrect',
      }),
    }),
    value: z.coerce
      .number()
      .min(0.1, {
        message: t('material-form.errors.value-invalid', {
          defaultValue: 'Value is incorrect',
        }),
      })
      .default(0),
    pricePerUnit: z.coerce
      .number()
      .min(0.1, {
        message: t('material-form.errors.price-invalid', {
          defaultValue: 'Value is incorrect',
        }),
      })
      .default(0),
    unit: z.enum(['gr', 'Kg', 'Tone'], {
      errorMap: () => ({
        message: t('material-form.errors.unit-invalid', {
          defaultValue: 'Unit is invalid',
        }),
      }),
    }),
  })

export type MaterialFormValues = z.infer<
  ReturnType<typeof getMaterialFormSchema>
>

interface MaterialFormFooterProps {
  isPending: boolean
  isEdit: boolean
}

const MaterialFormFooter: React.FC<MaterialFormFooterProps> = ({
  isEdit,
  isPending,
}) => {
  const {t} = useTranslation('materials')
  return (
    <Stack
      alignItems='center'
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Link to='/console/materials/operations'>
        <BackToLink
          caption={t('material-form.back-to-material-list', {
            defaultValue: 'Back to Material list',
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
          ? t('material-form.edit-material', {
              defaultValue: 'Edit Material',
            })
          : t('material-form.add-material', {
              defaultValue: 'Add Material',
            })}
      </Button>
    </Stack>
  )
}

interface MaterialFormViewProps {
  onSubmit: SubmitHandler<MaterialFormValues>
  isPending?: boolean
  isEdit?: boolean
}

export const MaterialFormView: React.FC<MaterialFormViewProps> = ({
  isEdit = false,
  isPending = false,
  onSubmit,
}) => {
  const form = useFormContext<MaterialFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <GeneralInformationFormSection />
      <MaterialFormFooter isEdit={isEdit} isPending={isPending} />
    </Stack>
  )
}
