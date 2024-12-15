import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button, Stack} from '@mui/material'
import {useNavigate} from '@tanstack/react-router'
import {Lock} from 'iconsax-react'
import type {ComponentProps} from 'react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {z} from 'zod'

import {FormSection, FormTextField} from '@/components'

const columnGap = 2
const rowGap = 0

const FormView = () => {
  return (
    <FormSection icon={Lock} title='Reset password'>
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
          label='Old password'
          name='oldPassword'
          type='password'
        />
        <FormTextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label='New Password'
          name='newPassword'
          type='password'
        />
        <FormTextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label='Confirm Password'
          name='confirmPassword'
          type='password'
        />
      </Box>
    </FormSection>
  )
}

const EditProfileFormSchema = z
  .object({
    oldPassword: z.string().min(1, 'Invalid old password'),
    newPassword: z
      .string()
      .optional()
      .or(z.string().min(8, 'New password must be at least 8 characters')),
    confirmPassword: z
      .string()
      .or(z.string().min(1, {message: 'Confirm password is required'})),
  })
  .refine(
    (data) => {
      if (data.oldPassword) {
        return Boolean(data.newPassword)
      }

      return true
    },
    {
      message: 'New password is required',
      path: ['newPassword'],
    },
  )
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type EditProfileFormValues = z.infer<typeof EditProfileFormSchema>

const FormFooter = () => {
  return (
    <Stack alignItems='flex-end' justifyContent='flex-end' spacing={3}>
      <Button type='submit' variant='contained'>
        Save
      </Button>
    </Stack>
  )
}

interface EditProfileFormViewProps {
  onSubmit: SubmitHandler<EditProfileFormValues>
}

const EditProfileFormView: React.FC<EditProfileFormViewProps> = ({
  onSubmit,
}) => {
  const form = useFormContext<EditProfileFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <FormView />
      <FormFooter />
    </Stack>
  )
}

const defaultValues: EditProfileFormValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const ProfileSecurity = () => {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit: ComponentProps<typeof EditProfileFormView>['onSubmit'] = (
    data,
  ) => {
    console.log({data})
    // void navigate({to: '/materials/operations'})
  }

  return (
    <FormProvider {...form}>
      <EditProfileFormView onSubmit={onSubmit} />
    </FormProvider>
  )
}
