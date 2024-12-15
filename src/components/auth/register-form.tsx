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
  FormCheckbox,
  FormPasswordFieldValidationRequirements,
  FormTextField,
  ToastContent,
} from '@/components'
import {passwordSchema} from '@/utils/validations/auth'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'

const getRegisterFormSchema = (t: TFunction<'auth' | 'form'>) =>
  z.object({
    name: makeNormalStringSchema({
      t,
      message: t('register-form.errors.name-invalid', {
        defaultValue: 'Name is incorrect',
      }),
    }),
    email: z
      .string({
        required_error: t('register-form.errors.email-required', {
          defaultValue: 'Email is required.',
        }),
      })
      .email({
        message: t('register-form.errors.email-invalid', {
          defaultValue: 'Your Email is incorrect',
        }),
      }),
    password: passwordSchema,
    agree: z.literal<boolean>(true, {
      errorMap: () => ({
        message: t('register-form.errors.terms-not-agreed', {
          defaultValue: 'You must agree to the terms',
        }),
      }),
    }),
  })

type RegisterFormValues = z.infer<ReturnType<typeof getRegisterFormSchema>>

interface RegisterFormViewProps {
  onSubmit: SubmitHandler<RegisterFormValues>
}

const RegisterFormView: React.FC<RegisterFormViewProps> = ({onSubmit}) => {
  const {t} = useTranslation('auth')
  const form = useFormContext<RegisterFormValues>()
  return (
    <Stack component='form' gap={2} onSubmit={form.handleSubmit(onSubmit)}>
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
        {t('register-form.register', {defaultValue: 'Register'})}
      </Typography>

      <Stack>
        <FormTextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label={t('register-form.name', {defaultValue: 'Name'})}
          name='name'
          variant='outlined'
        />
        <FormTextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label={t('register-form.email-address', {
            defaultValue: 'Email Address',
          })}
          name='email'
          type='email'
          variant='outlined'
        />
        <FormTextField
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label={t('register-form.password', {
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
      </Stack>

      <FormPasswordFieldValidationRequirements name='password' />

      <FormCheckbox
        label={t('register-form.agree-to-terms', {
          defaultValue: 'I agree to terms and policies',
        })}
        name='agree'
      />

      <AuthFormSubmitButton
        sx={{mt: -1}}
        type='submit'
        variant='contained'
        fullWidth
      >
        {t('register-form.submit', {defaultValue: 'Submit'})}
      </AuthFormSubmitButton>

      <Stack direction='row' justifyContent='center' spacing={0.5}>
        <Typography variant='t2'>
          {t('register-form.already-have-account', {
            defaultValue: 'Already have an account?',
          })}
        </Typography>
        <Link to='/login'>
          <Typography
            fontWeight='bold'
            sx={{textDecoration: 'underline'}}
            variant='t2'
          >
            {t('register-form.log-in', {defaultValue: 'Log in'})}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  )
}

const defaultValues: RegisterFormValues = {
  email: '',
  name: '',
  password: '',
  agree: false,
}

export const RegisterForm = () => {
  const {t} = useTranslation(['auth', 'form'])
  const navigate = useNavigate()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterFormSchema(t)),
    defaultValues,
    mode: 'onSubmit',
  })

  const onSubmit: ComponentProps<typeof RegisterFormView>['onSubmit'] = (
    data,
  ) => {
    void navigate({
      to: '/email-confirmation',
      search: {
        token: nanoid(),
        redirect: '/login',
      },
    })
    toast(
      <ToastContent
        description={t('register-form.registration-successful', {
          defaultValue: 'Registration was successful.',
        })}
        title={t('register-form.success', {
          defaultValue: 'Success!',
        })}
        type='success'
      />,
    )
  }

  return (
    <FormProvider {...form}>
      <RegisterFormView onSubmit={onSubmit} />
    </FormProvider>
  )
}
