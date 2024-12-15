import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Stack, Typography} from '@mui/material'
import {Link, useNavigate} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import type {ComponentProps} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {toast} from 'sonner'
import * as z from 'zod'

import Logo from '@/assets/illustrations/auth-logo.svg?react'
import {
  AuthFormSubmitButton,
  BackToLink,
  FormPasswordFieldValidationRequirements,
  FormTextField,
  ToastContent,
} from '@/components'
import {passwordSchema} from '@/utils/validations/auth'

const getResetPasswordFormSchema = (t: TFunction<'auth'>) =>
  z.object({
    password: passwordSchema,
  })

type ResetPasswordFormValues = z.infer<
  ReturnType<typeof getResetPasswordFormSchema>
>

interface ResetPasswordFormViewProps {
  onSubmit: SubmitHandler<ResetPasswordFormValues>
}

const ResetPasswordFormView: React.FC<ResetPasswordFormViewProps> = ({
  onSubmit,
}) => {
  const {t} = useTranslation('auth')
  const form = useFormContext<ResetPasswordFormValues>()
  return (
    <Stack
      component='form'
      gap={{xs: 2, md: 3}}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Box
        alignSelf='center'
        component={Logo}
        height={80}
        mx='auto'
        width={92}
      />

      <Typography
        color='primary.main'
        fontWeight='bold'
        mt={-1}
        textAlign='center'
        variant='h1'
      >
        {t('reset-password-form.reset-password', {
          defaultValue: 'Reset Password',
        })}
      </Typography>

      <Typography
        alignSelf='center'
        maxWidth={314}
        mt={-2}
        textAlign='center'
        variant='t2'
      >
        {t('reset-password-form.enter-new-password', {
          defaultValue: 'Please enter your new password',
        })}
      </Typography>

      <FormTextField
        label={t('reset-password-form.password', {
          defaultValue: 'Password',
        })}
        name='password'
        type='password'
        variant='outlined'
        removeBottomSpacing
        onChange={() => {
          void form.trigger('password', {shouldFocus: true})
        }}
      />

      <FormPasswordFieldValidationRequirements name='password' />

      <AuthFormSubmitButton type='submit' variant='contained' fullWidth>
        {t('reset-password-form.confirm', {
          defaultValue: 'Confirm',
        })}
      </AuthFormSubmitButton>

      <Link to='/login'>
        <BackToLink
          caption={t('reset-password-form.go-to-login', {
            defaultValue: 'Go to login',
          })}
        />
      </Link>
    </Stack>
  )
}

const defaultValues: ResetPasswordFormValues = {
  password: '',
}

export const ResetPasswordForm = () => {
  const {t} = useTranslation('auth')
  const navigate = useNavigate()
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(getResetPasswordFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof ResetPasswordFormView>['onSubmit'] = (
    data,
  ) => {
    void navigate({to: '/login'})
    toast(
      <ToastContent
        description={t('reset-password-form.password-reset-successful', {
          defaultValue:
            'Your password reset successfuly, Login with new password',
        })}
        title={t('reset-password-form.success', {
          defaultValue: 'Success!',
        })}
        type='success'
      />,
    )
  }

  return (
    <FormProvider {...form}>
      <ResetPasswordFormView onSubmit={onSubmit} />
    </FormProvider>
  )
}
