import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Stack, Typography, useTheme} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {assign, get, omit, trim} from 'lodash-es'
import type {ComponentProps} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {toast} from 'sonner'
import * as z from 'zod'

import {
  AuthFormSubmitButton,
  FormCheckbox,
  FormTextField,
  ToastContent,
} from '@/components'
import {useLoginUser} from '@/lib/data-provider/api/__generated'
import {useAuthenticationStore} from '@/store/auth'
import {LogoDolphin} from '../common/logoDolphin'
import {LogoDolphinDark} from '../common/logoDolphinDark'

const getLoginFormSchema = (t: TFunction<'auth'>) =>
  z.object({
    email: z
      .string({
        required_error: t('login-form.errors.email-required', {
          defaultValue: 'Email is required.',
        }),
      })
      .email({
        message: t('login-form.errors.email-invalid', {
          defaultValue: 'Your Email is incorrect',
        }),
      }),
    password: z.string().min(1, {
      message: t('login-form.errors.password-required', {
        defaultValue: 'Password is required',
      }),
    }),
    remember: z.boolean(),
  })

type LoginFormValues = z.infer<ReturnType<typeof getLoginFormSchema>>

interface LoginFormViewProps {
  onSubmit: SubmitHandler<LoginFormValues>
  isPending: boolean
}

const LoginFormView: React.FC<LoginFormViewProps> = ({isPending, onSubmit}) => {
  const {t} = useTranslation('auth')
  const form = useFormContext<LoginFormValues>()
  const theme = useTheme() 

  return (
    <Stack component='form' gap={2} onSubmit={form.handleSubmit(onSubmit)}>
      
     {
       theme.palette.mode === 'light' ? (
        <LogoDolphin widthText={70}  heightShape={40} heightText={20} />
        ) : (
        <LogoDolphinDark widthText={70}  heightShape={40} heightText={20}/>)
     }
      <Typography
        color='primary.main'
        fontWeight='bold'
        mt={-1}
        textAlign='center'
        variant='h1'
        marginTop={3}
      >
        {t('login-form.login', {defaultValue: 'Login'})}
      </Typography>
      <Stack>
        <FormTextField
          label={t('login-form.email-address', {
            defaultValue: 'Email Address',
          })}
          name='email'
          type='email'
        />
        <FormTextField
          autoComplete='new-password'
          label={t('login-form.password', {
            defaultValue: 'Password',
          })}
          name='password'
          type='password'
        />
      </Stack>
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <FormCheckbox
          label={t('login-form.remember-me', {
            defaultValue: 'Remember me',
          })}
          name='remember'
        />

        <Link to='/forget-password'>
          <Typography color='common.black' fontWeight='Medium'>
            {t('login-form.forget-password', {
              defaultValue: 'Forget password?',
            })}
          </Typography>
        </Link>
      </Stack>
      <AuthFormSubmitButton
        disabled={isPending}
        sx={{mt: -1}}
        type='submit'
        variant='contained'
        fullWidth
      >
        {t('login-form.login', {defaultValue: 'Login'})}
      </AuthFormSubmitButton>
      <Stack direction='row' justifyContent='center' spacing={0.5}>
        <Typography variant='t2'>
          {t('login-form.not-a-member', {
            defaultValue: 'Not a member?',
          })}
        </Typography>
        <Link to='/register'>
          <Typography
            fontWeight='bold'
            sx={{textDecoration: 'underline'}}
            variant='t2'
          >
            {t('login-form.register-now', {
              defaultValue: 'Register Now',
            })}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  )
}

const defaultValues: Partial<LoginFormValues> = {
  remember: true,
  email: '',
  password: '',
}

export const LoginForm = () => {
  const {t} = useTranslation('auth')
  const loginMutation = useLoginUser()
  /* TODO -> choose a better name for this variable */
  const loginAction = useAuthenticationStore((s) => s.login)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof LoginFormView>['onSubmit'] = (data) => {
    loginMutation.mutate(
      {data: {email: trim(data.email), password: trim(data.password)}},
      {
        onSuccess(response) {
          const payload = assign(
            {},
            omit(response, 'userInfo'),
            get(response, 'userInfo'),
            {remember: data.remember, role: response.userInfo?.role},
          )

          loginAction(payload)

          toast.success(
            <ToastContent
              description={t('login-form.login-successful', {
                defaultValue: 'Login was successful',
              })}
              title={t('login-form.success', {
                defaultValue: 'Success!',
              })}
              type='success'
            />,
          )
        },
      },
    )
  }

  return (
    <FormProvider {...form}>
      <LoginFormView isPending={loginMutation.isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
