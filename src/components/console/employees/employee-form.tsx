import {Box, Button, Stack, Typography} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {Call, Layer, ProfileCircle, User} from 'iconsax-react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {
  BackToLink,
  FormProfileImageUploader,
  FormSection,
  FormSelect,
  FormTextField,
} from '@/components'
import {useGetAllRolesSuspense} from '@/lib/data-provider/api/__generated'
import {getGenderOptions} from '@/mock/employees'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'

const columnGap = 2
const rowGap = 0

const PersonalInformationFormSection = () => {
  const {t} = useTranslation('employees')
  return (
    <FormSection
      icon={User}
      title={t('employee-form.personal-information', {
        defaultValue: 'Personal information',
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
          label={t('employee-form.first-name', {
            defaultValue: 'First name',
          })}
          name='firstName'
        />
        <FormTextField
          label={t('employee-form.last-name', {
            defaultValue: 'Last name',
          })}
          name='lastName'
        />
        <FormSelect
          label={t('employee-form.gender', {defaultValue: 'Gender'})}
          name='gender'
          options={getGenderOptions(t)}
        />
        <FormTextField
          label={t('employee-form.national-id', {
            defaultValue: 'National ID',
          })}
          name='nationalId'
        />
      </Box>
    </FormSection>
  )
}

const ContactInformationFormSection = () => {
  const {t} = useTranslation('employees')
  return (
    <FormSection
      icon={Call}
      title={t('employee-form.contact-information', {
        defaultValue: 'Contact Information',
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
          label={t('employee-form.email', {defaultValue: 'Email'})}
          name='email'
        />
        <FormTextField
          label={t('employee-form.telephone', {
            defaultValue: 'Telephone',
          })}
          name='telephone'
        />
        <FormTextField
          label={t('employee-form.mobile', {defaultValue: 'Mobile'})}
          name='mobile'
        />
        <Box gridColumn='1/-1'>
          <FormTextField
            label={t('employee-form.address', {
              defaultValue: 'Address',
            })}
            name='address'
          />
        </Box>
      </Box>
    </FormSection>
  )
}

const OtherFormSection = () => {
  const {t} = useTranslation('employees')
  const {data: roles} = useGetAllRolesSuspense()
  return (
    <FormSection
      icon={Layer}
      title={t('employee-form.other', {defaultValue: 'Other'})}
    >
      <Box
        columnGap={columnGap}
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          md: '2fr 3fr',
          lg: '1fr 3fr',
        }}
        rowGap={rowGap}
      >
        <FormSelect
          label={t('employee-form.role', {defaultValue: 'Role'})}
          name='roleId'
          options={roles.map((role) => ({
            label: role.name,
            value: role.id as unknown as string,
          }))}
        />
        <FormTextField
          label={t('employee-form.description', {
            defaultValue: 'Description',
          })}
          name='description'
        />
      </Box>
    </FormSection>
  )
}

const ProfileImageFormSection = () => {
  const {t} = useTranslation('employees')
  return (
    <FormSection
      icon={ProfileCircle}
      title={t('employee-form.profile', {defaultValue: 'Profile'})}
    >
      <Box
        alignItems='center'
        display='grid'
        gridTemplateColumns='repeat(2, 1fr)'
      >
        <Typography>
          {t('employee-form.profile-picture-helps', {
            defaultValue: 'A profile picture helps personalize your account',
          })}
        </Typography>

        <Box ml='auto' overflow='hidden'>
          <FormProfileImageUploader name='files' />
        </Box>
      </Box>
    </FormSection>
  )
}

export const getEmployeeFormSchema = (t: TFunction<'employees'>) =>
  z.object({
    firstName: makeNormalStringSchema({
      t,
      message: t('employee-form.errors.first-name-invalid', {
        defaultValue: 'First name is incorrect',
      }),
    }),
    lastName: makeNormalStringSchema({
      t,
      message: t('employee-form.errors.last-name-invalid', {
        defaultValue: 'Last name is incorrect',
      }),
    }),
    gender: z.string().min(2, {
      message: t('employee-form.errors.gender-invalid', {
        defaultValue: 'Gender is incorrect',
      }),
    }),
    nationalId: z.string().min(2, {
      message: t('employee-form.errors.national-id-invalid', {
        defaultValue: 'National ID is incorrect',
      }),
    }),
    telephone: z.string().optional(),
    email: z.string().email({
      message: t('employee-form.errors.email-invalid', {
        defaultValue: 'Email is incorrect',
      }),
    }),
    mobile: z.string().min(3, {
      message: t('employee-form.errors.mobile-invalid', {
        defaultValue: 'Telephone is incorrect',
      }),
    }),
    address: z.string().optional(),
    roleId: z.string().min(2, {
      message: t('employee-form.errors.role-invalid', {
        defaultValue: 'Role is incorrect',
      }),
    }),
    description: z.string().optional(),
    files: z.any(),
  })
export type EmployeeFormValues = z.infer<
  ReturnType<typeof getEmployeeFormSchema>
>

interface AddEmployeeFormFooterProps {
  isEdit: boolean
  isPending: boolean
}

const EmployeeFormFooter: React.FC<AddEmployeeFormFooterProps> = ({
  isEdit,
  isPending,
}) => {
  const {t} = useTranslation(['employees', 'form'])
  return (
    <Stack
      alignItems='center'
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Link to='/console/employees/operations'>
        <BackToLink
          caption={t('employee-form.back-to-employee-list', {
            defaultValue: 'Back to Employee list',
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
          ? t('employee-form.edit-employee', {
              defaultValue: 'Edit employee',
            })
          : t('employee-form.add-employee', {
              defaultValue: 'Add employee',
            })}
      </Button>
    </Stack>
  )
}

interface EmployeeFormProps {
  onSubmit: SubmitHandler<EmployeeFormValues>
  isEdit: boolean
  isPending?: boolean
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isEdit,
  isPending = false,
  onSubmit,
}) => {
  const form = useFormContext<EmployeeFormValues>()

  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <PersonalInformationFormSection />
      <ContactInformationFormSection />
      <OtherFormSection />
      <ProfileImageFormSection />
      <EmployeeFormFooter isEdit={isEdit} isPending={isPending} />
    </Stack>
  )
}
