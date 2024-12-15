import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from '@tanstack/react-router'
import dayjs from 'dayjs'
import {noop} from 'lodash'
import {get, reject} from 'lodash-es'
import type {ComponentProps} from 'react'
import type {UseFormProps} from 'react-hook-form'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {toast} from 'sonner'

import {ToastContent} from '@/components/common'
import {
  useCreateDailyReport,
  useCreateDamageEquipmentReport,
  useCreateInjuryEmployeeReport,
} from '@/lib/data-provider/api/__generated'
import type {ReportSubject} from '@/mock/reports'
import {reportSubjectValues} from '@/mock/reports'

import type {ReportFormValues} from './report-form'
import {getReportFormSchema, ReportForm} from './report-form'
import {transformFormValuesToReportDTO} from './report-form-lib'

const subjectOptions = reject(reportSubjectValues, (v) => v === 'all')

const defaultValues: ReportFormValues = {
  title: '',
  subject: subjectOptions[0],
  projectCode: '',
  date: dayjs(),
  files: [],
  description: '',
}

export const AddReportForm = () => {
  const navigate = useNavigate()
  const {t} = useTranslation(['reports', 'form'])
  const p: Partial<UseFormProps<ReportFormValues, unknown>> = {
    resolver: zodResolver(getReportFormSchema(t)),
    defaultValues,
    mode: 'all',
  }

  const form = useForm<ReportFormValues>(p)

  const {isPending: isAddingDailyReport, mutate: addDailyReport} =
    useCreateDailyReport()

  const {
    isPending: isAddingInjuryEmployeeReport,
    mutate: addInjuryEmployeeReport,
  } = useCreateInjuryEmployeeReport()

  const {
    isPending: isAddingDamageEquipmentReport,
    mutate: addDamageEquipmentReport,
  } = useCreateDamageEquipmentReport()

  const onSubmit: ComponentProps<typeof ReportForm>['onSubmit'] = (data) => {
    /* TODO-> here please create a value transformer to omit emploeeCode or equipmentCode based on subject value */
    console.log({data: transformFormValuesToReportDTO(data)})

    const createReportMutationFnMap: Record<
      ReportSubject,
      (...args: any[]) => any
    > = {
      daily: addDailyReport,
      'employee-accident': addInjuryEmployeeReport,
      'equipment-damage': addDamageEquipmentReport,
      other: noop,
    }

    const mutationFn = get(createReportMutationFnMap, data.subject, noop)

    toast(
      <ToastContent
        description='Under construction'
        title='Info'
        type='info'
      />,
    )
    // mutationFn(
    //   {data: transformFormValuesToReportDTO(data) as unknown as DailyReport},
    //   {
    //     onSuccess: () => {
    //       void navigate({to: '/console/reports/operations'})
    //       refetchAllReports()
    //     },
    //   },
    // )
  }

  const isPending =
    isAddingDailyReport ||
    isAddingInjuryEmployeeReport ||
    isAddingDamageEquipmentReport

  return (
    <FormProvider {...form}>
      <ReportForm isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  )
}
