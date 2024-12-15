import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button, InputAdornment, Stack} from '@mui/material'
import {useNavigate} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {TickCircle} from 'iconsax-react'
import type {ComponentProps} from 'react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {
  DefaultPendingComponent,
  FormDatePicker,
  FormProfileImageUploader,
  FormSection,
  FormSelect,
  FormTextField,
} from '@/components'
import {roles} from '@/components/console/permissions/permissions-data'
import type {Employee} from '@/lib/data-provider/api/__generated'
import {getGenderOptions, getMaritalStatusOptions} from '@/mock/employees'
import {dateType} from '@/utils/validations/date'

import {useTransformProfileDataToFormValues} from './profile-form-lib'

const columnGap = 2
const rowGap = 0

interface FormViewProps {
  editable: boolean
}

// eslint-disable-next-line max-lines-per-function
const FormView: React.FC<FormViewProps> = ({editable}) => {
  const {t} = useTranslation('employees')
  return (
    <FormSection>
      <Box
        columnGap={columnGap}
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        pt={1}
        rowGap={rowGap}
      >
        <FormTextField
          disabled={!editable}
          label={t('profile-form.first-name', {
            defaultValue: 'First Name',
          })}
          name='firstName'
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.last-name', {
            defaultValue: 'Last Name',
          })}
          name='lastName'
        />
        <FormTextField
          label={t('profile-form.employee-code', {
            defaultValue: 'Employee Code',
          })}
          name='employeeCode'
          disabled
        />
        <FormSelect
          disabled={!editable}
          label={t('profile-form.gender', {defaultValue: 'Gender'})}
          name='gender'
          options={getGenderOptions(t)}
          readOnly={!editable}
        />
        <FormTextField
          disabled={!editable}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Box color='success.light' component={TickCircle} />
              </InputAdornment>
            ),
          }}
          label={t('profile-form.email', {defaultValue: 'Email'})}
          name='email'
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.telephone', {
            defaultValue: 'Telephone',
          })}
          name='telephone'
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.mobile', {defaultValue: 'Mobile'})}
          name='mobile'
        />
        <FormDatePicker
          disabled={!editable}
          label={t('profile-form.date-of-birth', {
            defaultValue: 'Date of Birth',
          })}
          name='dateOfBirth'
        />
        <FormSelect
          disabled={!editable}
          label={t('profile-form.marital-status', {
            defaultValue: 'Marital status',
          })}
          name='maritalStatus'
          options={getMaritalStatusOptions(t)}
        />
        <FormSelect
          label={t('profile-form.role', {defaultValue: 'Role'})}
          name='role'
          options={roles.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
          disabled
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.job', {defaultValue: 'Job'})}
          name='job'
        />
        <FormTextField
          label={t('profile-form.last-activity', {
            defaultValue: 'Last activity',
          })}
          name='lastActivity'
          disabled
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.national-id', {
            defaultValue: 'National ID',
          })}
          name='nationalId'
        />
        <FormTextField
          disabled={!editable}
          label={t('profile-form.years-of-experience', {
            defaultValue: 'Years of experience',
          })}
          name='yearsOfExperience'
          type='number'
        />
        <Box gridColumn='1/-1'>
          <FormTextField
            disabled={!editable}
            label={t('profile-form.address', {
              defaultValue: 'Address',
            })}
            name='address'
            rows={2}
          />
          <FormTextField
            disabled={!editable}
            label={t('profile-form.skill-description', {
              defaultValue: 'Skill Description',
            })}
            name='skillDescription'
          />
          <FormTextField
            disabled={!editable}
            label={t('profile-form.description', {
              defaultValue: 'Description',
            })}
            name='description'
          />
        </Box>
      </Box>
    </FormSection>
  )
}

export const getEditProfileFormSchema = (t: TFunction<'employees'>) =>
  z.object({
    firstName: z.string().min(3, {
      message: t('profile-form.errors.first-name-invalid', {
        defaultValue: 'Invalid first name',
      }),
    }),
    lastName: z.string().min(3, {
      message: t('profile-form.errors.last-name-invalid', {
        defaultValue: 'Invalid last name',
      }),
    }),
    employeeCode: z.string().optional(),
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({
        message: t('profile-form.errors.gender-invalid', {
          defaultValue: 'Invalid gender',
        }),
      }),
    }),
    email: z
      .string()
      .email({
        message: t('profile-form.errors.email-invalid', {
          defaultValue: 'Invalid email address',
        }),
      })
      .min(1, {
        message: t('profile-form.errors.email-required', {
          defaultValue: 'Invalid email address',
        }),
      }),
    telephone: z.string().optional(),
    mobile: z.string().min(3, {
      message: t('profile-form.errors.mobile-invalid', {
        defaultValue: 'Invalid mobile',
      }),
    }),
    address: z.string().min(3, {
      message: t('profile-form.errors.address-invalid', {
        defaultValue: 'Invalid address',
      }),
    }),
    dateOfBirth: dateType.optional(),
    maritalStatus: z.enum(['Single', 'Married', 'Divorced'], {
      errorMap: () => ({
        message: t('profile-form.errors.marital-status-invalid', {
          defaultValue: 'Invalid Marital Status',
        }),
      }),
    }),
    profileImage: z.string().optional(),
    job: z.string().min(3, {
      message: t('profile-form.errors.job-invalid', {
        defaultValue: 'Invalid job',
      }),
    }),
    nationalId: z.string().optional(),
    yearsOfExperience: z.coerce.number().optional(),
    skillDescription: z.string().optional(),
    description: z.string().optional(),
    lastActivity: z.string().optional(),
    role: z.string().optional(),
    profilePhoto: z.any().optional(),
  })

export type EditProfileFormValues = z.infer<
  ReturnType<typeof getEditProfileFormSchema>
>

const FormFooter = () => {
  const {t} = useTranslation('employees')
  return (
    <Stack
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Button type='submit' variant='contained'>
        {t('profile-form.save', {defaultValue: 'Save'})}
      </Button>
    </Stack>
  )
}

interface EditProfileFormViewProps {
  onSubmit: SubmitHandler<EditProfileFormValues>
  editable: boolean
}

const EditProfileFormView: React.FC<EditProfileFormViewProps> = ({
  editable,
  onSubmit,
}) => {
  const form = useFormContext<EditProfileFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <Stack alignItems={{lg: 'flex-start'}} direction={{lg: 'row'}} gap={2}>
        <Stack
          direction='row'
          justifyContent={{xs: 'center', lg: 'flex-start'}}
        >
          <FormProfileImageUploader editable={editable} name='profilePhoto' />
        </Stack>

        <Box flex={1}>
          <FormView editable={editable} />
        </Box>
      </Stack>
      {editable ? <FormFooter /> : null}
    </Stack>
  )
}

interface ProfileFormImplProps {
  editable?: boolean
  formValues: EditProfileFormValues
}

export const ProfileFormImpl: React.FC<ProfileFormImplProps> = ({
  editable = true,
  formValues,
}) => {
  const navigate = useNavigate()
  const {t} = useTranslation('employees')
  const form = useForm({
    resolver: zodResolver(getEditProfileFormSchema(t)),
    defaultValues: formValues,
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
      <EditProfileFormView editable={editable} onSubmit={onSubmit} />
    </FormProvider>
  )
}

interface ProfileFormProps {
  employee: Employee
  editable: boolean
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  editable,
  employee,
}) => {
  const {formValues, isLoading} = useTransformProfileDataToFormValues(employee)
  if (isLoading || !formValues) return <DefaultPendingComponent />
  return <ProfileFormImpl editable={editable} formValues={formValues} />
}
