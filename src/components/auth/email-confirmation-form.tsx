import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Stack, Typography} from '@mui/material'
import {Link, useNavigate, useSearch} from '@tanstack/react-router'
import dayjs from 'dayjs'
import type {TFunction} from 'i18next'
import {Refresh} from 'iconsax-react'
import type {ComponentProps} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useEffectOnce} from 'react-use'
import {toast} from 'sonner'
import {useTimer} from 'use-timer'
import * as z from 'zod'

import Logo from '@/assets/illustrations/auth-logo.svg?react'
import {
  AuthFormSubmitButton,
  BackToLink,
  FormOtpInput,
  ToastContent,
} from '@/components'

const getForgetPasswordFormSchema = (t: TFunction<'auth'>) =>
  z.object({
    code: z
      .string({
        required_error: t('email-confirmation.errors.code-required', {
          defaultValue: 'Code is required.',
        }),
      })
      .min(6, {
        message: t('email-confirmation.errors.code-min-length', {
          defaultValue: 'Code must be 6 characters long.',
        }),
      }),
  })

type ForgetPasswordFormValues = z.infer<
  ReturnType<typeof getForgetPasswordFormSchema>
>

interface ForgetPasswordFormViewProps {
  onSubmit: SubmitHandler<ForgetPasswordFormValues>
  isPasswordResetRequest: boolean
}

const ForgetPasswordFormView: React.FC<ForgetPasswordFormViewProps> = ({
  isPasswordResetRequest,
  onSubmit,
}) => {
  const {t} = useTranslation('auth')
  const form = useFormContext<ForgetPasswordFormValues>()
  const {reset, start, status, time} = useTimer({
    timerType: 'DECREMENTAL',
    endTime: 0,
    initialTime: 60,
    autostart: false,
  })
  const d = dayjs.duration(time, 'seconds')
  const remainingTime = d.format('mm:ss')

  useEffectOnce(start)

  return (
    <Stack
      alignItems='center'
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
        {t('email-confirmation.confirm-email', {
          defaultValue: 'Confirm Email',
        })}
      </Typography>

      <Typography
        alignSelf='center'
        maxWidth={314}
        textAlign='center'
        variant='t2'
      >
        {t('email-confirmation.enter-verification-code', {
          defaultValue: 'Enter the verification code sent to your email below:',
        })}
      </Typography>

      <FormOtpInput name='code' />
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='center'
        spacing={4}
      >
        {status !== 'STOPPED' && (
          <Typography
            color='neutrals.gray'
            fontWeight='medium'
            sx={{fontVariantNumeric: 'tabular-nums'}}
            variant='t2'
          >
            {remainingTime}
          </Typography>
        )}
        <AuthFormSubmitButton
          disabled={status !== 'STOPPED'}
          startIcon={<Refresh size={16} strokeWidth={3} />}
          sx={{fontWeight: 'bold'}}
          variant='text'
          onClick={() => {
            if (status === 'STOPPED') {
              return start()
            }

            return reset()
          }}
        >
          {t('email-confirmation.resend', {
            defaultValue: 'Resend',
          })}
        </AuthFormSubmitButton>
      </Stack>

      <AuthFormSubmitButton
        sx={{mt: -2}}
        type='submit'
        variant='contained'
        fullWidth
      >
        {t('email-confirmation.confirm', {
          defaultValue: 'Confirm',
        })}
      </AuthFormSubmitButton>

      {isPasswordResetRequest ? (
        <Link to='/forget-password'>
          <BackToLink
            caption={t('email-confirmation.change-email', {
              defaultValue: 'Change Email',
            })}
          />
        </Link>
      ) : null}
    </Stack>
  )
}

export const EmailConfirmationForm = () => {
  const {t} = useTranslation('auth')
  const navigate = useNavigate()
  const redirect = useSearch({
    from: '/_unauth/email-confirmation',
    select: (s) => s.redirect,
  })
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(getForgetPasswordFormSchema(t)),
    mode: 'onSubmit',
  })
  const isPasswordResetRequest = redirect === '/reset-password'

  const onSubmit: ComponentProps<typeof ForgetPasswordFormView>['onSubmit'] = (
    data,
  ) => {
    toast(
      <ToastContent
        description={t('email-confirmation.email-confirmed', {
          defaultValue: 'Email successfully confirmed.',
        })}
        title={t('email-confirmation.success', {
          defaultValue: 'Success!',
        })}
        type='success'
      />,
    )
    void navigate({to: redirect})
  }

  return (
    <FormProvider {...form}>
      <ForgetPasswordFormView
        isPasswordResetRequest={isPasswordResetRequest}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}
