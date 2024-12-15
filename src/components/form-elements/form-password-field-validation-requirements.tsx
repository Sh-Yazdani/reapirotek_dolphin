import {Stack, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import React from 'react'
import {useController} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type {ZodSchema} from 'zod'
import {z} from 'zod'

import CheckIcon from '@/assets/icons/check.svg?react'

interface Requirement {
  label: string
  schema: ZodSchema
}
const getRequirements = (t: TFunction<'auth'>): Requirement[] => [
  {
    label: t('password-requirements.at-least-8-characters', {
      defaultValue: 'Be at least 8 characters',
    }),
    schema: z.string().min(8, {message: ''}),
  },
  {
    label: t('password-requirements.at-least-lowercase', {
      defaultValue: 'At least lowercase character',
    }),
    schema: z.string().regex(/[a-z]/, {
      message: '',
    }),
  },
  {
    label: t('password-requirements.at-least-uppercase', {
      defaultValue: 'At least uppercase character',
    }),
    schema: z.string().regex(/[A-Z]/, {
      message: '',
    }),
  },
  {
    label: t('password-requirements.contain-numbers', {
      defaultValue: 'Contain numbers',
    }),
    schema: z.string().regex(/\d/, {message: ''}),
  },
  {
    label: t('password-requirements.contain-special-characters', {
      defaultValue: 'Contain special characters',
    }),
    schema: z.string().regex(/[@$!%*?&#]/, {
      message: '',
    }),
  },
]

interface FormPasswordFieldValidationRequirementsProps {
  name: string
}

export const FormPasswordFieldValidationRequirements: React.FC<
  FormPasswordFieldValidationRequirementsProps
> = ({name}) => {
  const controller = useController({name})
  const value = controller.field.value
  const {t} = useTranslation('auth')
  return (
    <Stack>
      {getRequirements(t).map((requirement) => {
        const {success: isValid} = requirement.schema.safeParse(value)

        const color = (() => {
          if (isValid) return 'success.main'
          return 'neutrals.gray'
        })()

        const leadingIcon = (() => {
          if (isValid) return <CheckIcon />
          return (
            <Typography fontWeight='bold' textAlign='center' width={13}>
              •
            </Typography>
          )
        })()
        return (
          <Stack
            key={requirement.label}
            alignItems='center'
            direction='row'
            spacing={0.8}
          >
            {leadingIcon}
            <Typography color={color}>{requirement.label}</Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}
