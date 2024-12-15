import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, useParams} from '@tanstack/react-router'
import dayjs from 'dayjs'
import {produce} from 'immer'
import {find, set} from 'lodash-es'
import type {ComponentProps} from 'react'
import {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import Profile1 from '@/assets/images/profiles/profile-1.jpg'
import type {Report} from '@/lib/data-provider/api/__generated'

import type {ReportFormValues} from './report-form'
import {getReportFormSchema, ReportForm} from './report-form'

const fileURLs = [Profile1]

interface EditReportImplProps {
  defaultValues: ReportFormValues
}

const EditReportImpl: React.FC<EditReportImplProps> = ({defaultValues}) => {
  const {t} = useTranslation(['reports', 'form'])

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(getReportFormSchema(t)),
    defaultValues,
    mode: 'all',
  })

  const navigate = useNavigate()

  const onSubmit: ComponentProps<typeof ReportForm>['onSubmit'] = (data) => {
    /* TODO-> here please create a value transformer to omit emploeeCode or equipmentCode based on subject value */
    console.log({data})
    void navigate({to: '/console/reports/operations'})
  }

  return (
    <FormProvider {...form}>
      <ReportForm isEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}

export const EditReportForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [defaultValues, setDefaultValues] = useState<
    ReportFormValues | undefined
  >()
  const reportId = useParams({
    from: '/_auth/console/_console-layout/reports/_layout/operations/edit/$reportId',
    select: (s) => s.reportId,
  })

  const transformReportToFormValues = async (report: Report) => {
    const files = await Promise.all(
      fileURLs.map(async (fileURL) => {
        return fetch(Profile1)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], fileURL, {
              type: blob.type,
            })
            return file
          })
      }),
    )

    const transformedValues = produce(report, (draft) => {
      /* @ts-ignore swagger issues */
      set(draft, 'from', dayjs(report.time))
      /* @ts-ignore swagger issues */
      set(draft, 'to', dayjs(report.time))
      /* @ts-ignore swagger issues */
      set(draft, 'date', dayjs(report.date))
      set(draft, 'files', files)
    })

    setDefaultValues(transformedValues as unknown as ReportFormValues)
    setIsLoading(false)
  }

  const report = find([], {id: reportId})!
  useEffect(() => {
    void transformReportToFormValues(report as any)
  }, [])

  if (isLoading) return null
  if (!report) return 'Under construction'

  return <EditReportImpl defaultValues={defaultValues!} />
}
