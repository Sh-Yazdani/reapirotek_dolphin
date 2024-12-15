import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Stack, Typography} from '@mui/material'
import {Link, useNavigate} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {nanoid} from 'nanoid'
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
  FormTextField,
  ToastContent,
} from '@/components'

const getForgetPasswordFormSchema = (t: TFunction<'auth'>) =>
  z.object({
    email: z
      .string({
        required_error: t('forget-password-form.errors.email-required', {
          defaultValue: 'Email is required.',
        }),
      })
      .email({
        message: t('forget-password-form.errors.email-invalid', {
          defaultValue: 'Your Email is incorrect.',
        }),
      }),
  })

type ForgetPasswordFormValues = z.infer<
  ReturnType<typeof getForgetPasswordFormSchema>
>

interface ForgetPasswordFormViewProps {
  onSubmit: SubmitHandler<ForgetPasswordFormValues>
}

const ForgetPasswordFormView: React.FC<ForgetPasswordFormViewProps> = ({
  onSubmit,
}) => {
  const {t} = useTranslation('auth')
  const form = useFormContext<ForgetPasswordFormValues>()
  return (
    <Stack
      component='form'
      gap={{xs: 2, md: 4}}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Stack gap={2}>
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
          textAlign='center'
          variant='h1'
        >
          {t('forget-password-form.forget-password', {
            defaultValue: 'Forget Password',
          })}
        </Typography>

        <Typography
          alignSelf='center'
          maxWidth={314}
          textAlign='center'
          variant='t2'
        >
          {t('forget-password-form.enter-email', {
            defaultValue:
              'To set a new password, please enter the email associated with your account.',
          })}
        </Typography>
      </Stack>

      <FormTextField
        label={t('forget-password-form.email', {
          defaultValue: 'Email',
        })}
        name='email'
        type='email'
        variant='outlined'
      />
      <AuthFormSubmitButton type='submit' variant='contained'>
        {t('forget-password-form.confirm', {
          defaultValue: 'Confirm',
        })}
      </AuthFormSubmitButton>

      <Link to='/login'>
        <BackToLink
          caption={t('forget-password-form.back-to-login', {
            defaultValue: 'Back to login',
          })}
        />
      </Link>
    </Stack>
  )
}

const defaultValues: Partial<ForgetPasswordFormValues> = {
  email: '',
}

export const ForgetPasswordForm = () => {
  const {t} = useTranslation('auth')
  const navigate = useNavigate()
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(getForgetPasswordFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof ForgetPasswordFormView>['onSubmit'] = (
    data,
  ) => {
    void navigate({
      to: '/email-confirmation',
      search: {
        token: nanoid(),
        redirect: '/reset-password',
      },
    })
    toast(
      <ToastContent
        description={t('forget-password-form.reset-password-email-sent', {
          defaultValue: 'Reset passsword email sent.',
        })}
        title={t('forget-password-form.success', {
          defaultValue: 'Success!',
        })}
        type='success'
      />,
    )
  }

  return (
    <FormProvider {...form}>
      <ForgetPasswordFormView onSubmit={onSubmit} />
    </FormProvider>
  )
}
