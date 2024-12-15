import {Box, Button, Stack, Typography} from '@mui/material'
import {Link} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {Note} from 'iconsax-react'
import {find, get, reject} from 'lodash-es'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import type {FormSelectFieldOptions} from '@/components'
import {
  BackToLink,
  FormAutoComplete,
  FormDateTimePicker,
  FormFileUploader,
  FormSection,
  FormSelect,
  FormTextField,
} from '@/components'
import {
  useGetAllEmployeesSuspense,
  useGetAllEquipmentSuspense,
  useGetAllProjectsSuspense,
} from '@/lib/data-provider/api/__generated'
import type {ReportSubject} from '@/mock/reports'
import {getReportSubjects, reportSubjectValues} from '@/mock/reports'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'
import {dateType} from '@/utils/validations/date'

const columnGap = 2
const rowGap = 0

interface GeneralInformationFormSectionProps {
  isEdit: boolean
}

const GeneralInformationFormSection: React.FC<
  GeneralInformationFormSectionProps
  // eslint-disable-next-line max-lines-per-function
> = ({isEdit}) => {
  const {t} = useTranslation('reports')
  const subjectOptions = reject(getReportSubjects(t), {value: 'all'})
  const {data: employees} = useGetAllEmployeesSuspense()
  const {data: projects} = useGetAllProjectsSuspense()
  const {data: equipment} = useGetAllEquipmentSuspense()

  const projectCodeOptions = projects.map((project) => ({
    label: project.projectCode.toString(),
    value: project.projectCode.toString(),
  }))

  const employeesOptions = employees.map((employee) => ({
    label: get(employee, 'id') as unknown as string,
    value: get(employee, 'id') as unknown as string,
  }))

  const form = useFormContext<ReportFormValues>()

  const _equipment = find(equipment, {
    id: form.watch().equipmentCode,
  })

  const employee = find(employees, {
    id: form.watch().employeeCode,
  })

  const fieldsMap: Record<ReportSubject, JSX.Element | null> = {
    'equipment-damage': (
      <Stack direction='row' gap={2} width='100%'>
        <FormAutoComplete
          label={t('report-form.equipment-code', {
            defaultValue: 'Equipment Code',
          })}
          name='equipmentCode'
          options={equipment.map((_equipmentItem) => ({
            label: get(_equipmentItem, 'id') as unknown as string,
            value: get(_equipmentItem, 'id') as unknown as string,
          }))}
          fullWidth
        />
        <Typography fontWeight='medium' mt={1.5} width='100%'>
          {_equipment?.name}
        </Typography>
      </Stack>
    ),
    'employee-accident': (
      <Stack direction='row' gap={2} width='100%'>
        <FormAutoComplete
          label={t('report-form.employee-code', {
            defaultValue: 'Employee Code',
          })}
          name='employeeCode'
          options={employeesOptions}
          fullWidth
        />
        <Typography fontWeight='medium' mt={1.5} width='100%'>
          {employee?.firstName} {employee?.lastName}
        </Typography>
      </Stack>
    ),
    daily: null,
    other: null,
  }
  const formValues = form.watch()
  const fields = get(fieldsMap, formValues.subject)
  return (
    <FormSection
      icon={Note}
      title={
        isEdit
          ? t('report-form.edit-report', {defaultValue: 'Edit Report'})
          : t('report-form.add-report', {defaultValue: 'Add Report'})
      }
    >
      <Box>
        <Box
          columnGap={columnGap}
          display='grid'
          gridTemplateColumns={{
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          rowGap={rowGap}
        >
          <FormTextField
            label={t('report-form.title', {defaultValue: 'Title'})}
            name='title'
          />
          <FormSelect
            label={t('report-form.subject', {defaultValue: 'Subject'})}
            name='subject'
            options={subjectOptions as unknown as FormSelectFieldOptions[]}
          />
        </Box>

        <Box
          key={form.watch().subject}
          columnGap={columnGap}
          display='grid'
          gridTemplateColumns={{
            xs: '1fr',
          }}
          rowGap={rowGap}
        >
          {fields}
        </Box>

        <Box
          columnGap={columnGap}
          display='grid'
          gridTemplateColumns={{
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          rowGap={rowGap}
        >
          <FormAutoComplete
            label={t('report-form.project-code', {
              defaultValue: 'Project Code',
            })}
            name='projectCode'
            options={projectCodeOptions}
          />
          <FormDateTimePicker
            label={t('report-form.date-and-time-of-report', {
              defaultValue: 'Date and Time of Report',
            })}
            name='date'
          />
        </Box>

        <Box
          columnGap={columnGap}
          display='grid'
          gridTemplateColumns='1fr'
          rowGap={rowGap}
        >
          <Box pb={{xs: 2.5, md: 5}}>
            <FormFileUploader name='files' />
          </Box>
        </Box>

        <Box
          columnGap={columnGap}
          display='grid'
          gridTemplateColumns={{
            xs: '1fr',
          }}
          rowGap={rowGap}
        >
          <FormTextField
            label={t('report-form.description', {
              defaultValue: 'Description',
            })}
            name='description'
            rows={3}
            multiline
          />
        </Box>
      </Box>
    </FormSection>
  )
}

export const getInitialReportFormSchema = (t: TFunction<'reports'>) =>
  z.object({
    title: makeNormalStringSchema({
      t,
      message: t('report-form.errors.title-invalid', {
        defaultValue: 'Title is incorrect',
      }),
    }),
    subject: z.enum(reportSubjectValues, {
      errorMap: () => ({
        message: t('report-form.errors.subject-invalid', {
          defaultValue: 'Subject is invalid',
        }),
      }),
    }),
    projectCode: z.string().min(2, {
      message: t('report-form.errors.project-code-invalid', {
        defaultValue: 'Project code is invalid',
      }),
    }),
    date: dateType,
    files: z.array(z.instanceof(File), {
      message: t('report-form.errors.files-invalid', {
        defaultValue: 'Files are invalid',
      }),
    }),
    description: z.string().optional(),
    employeeCode: z.string().optional(),
    equipmentCode: z.string().optional(),
  })

export const getReportFormSchema = (t: TFunction<'reports'>) =>
  getInitialReportFormSchema(t).superRefine((values, ctx) => {
    if (values.subject === 'employee-accident') {
      if (!values.employeeCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('report-form.errors.employee-code-invalid', {
            defaultValue: 'Invalid value',
          }),
          path: ['employeeCode'],
        })
      }
    } else if (values.subject === 'equipment-damage') {
      if (!values.equipmentCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('report-form.errors.equipment-code-invalid', {
            defaultValue: 'Invalid value',
          }),
          path: ['equipmentCode'],
        })
      }
    }
  })

export type ReportFormValues = z.infer<ReturnType<typeof getReportFormSchema>>

interface ReportFormFooterProps extends GeneralInformationFormSectionProps {
  isPending: boolean
}

const ReportFormFooter: React.FC<ReportFormFooterProps> = ({
  isEdit,
  isPending,
}) => {
  const {t} = useTranslation('reports')
  return (
    <Stack
      alignItems='center'
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Link to='/console/reports/operations'>
        <BackToLink
          caption={t('report-form.back-to-report-list', {
            defaultValue: 'Back to Report List',
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
          ? t('report-form.edit-report', {defaultValue: 'Edit Report'})
          : t('report-form.add-report', {defaultValue: 'Add Report'})}
      </Button>
    </Stack>
  )
}

interface ReportFormProps {
  onSubmit: SubmitHandler<ReportFormValues>
  isEdit?: boolean
  isPending?: boolean
}

export const ReportForm: React.FC<ReportFormProps> = ({
  isEdit = false,
  isPending = false,
  onSubmit,
}) => {
  const form = useFormContext<ReportFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <GeneralInformationFormSection isEdit={isEdit} />
      <ReportFormFooter isEdit={isEdit} isPending={isPending} />
    </Stack>
  )
}
