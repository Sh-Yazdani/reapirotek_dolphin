import dayjs from 'dayjs'
import type {TFunction} from 'i18next'
import {capitalize} from 'lodash'
import {createMRTColumnHelper} from 'material-react-table'

import type {Report} from '@/lib/data-provider/api/__generated'
import {_12HourTimeFormat, ISODateFormat} from '@/utils/date'

export type ReportType =
  | 'all'
  | 'daily'
  | 'employee-accident'
  | 'equipment-damage'
  | 'other'

export const reportSubjectValues = [
  'all',
  'daily',
  'equipment-damage',
  'employee-accident',
  'other',
] as const

export const getReportSubjects = (t: TFunction<'reports'>) =>
  reportSubjectValues.map((reportSubject) => {
    return {
      label: t(`subjects.${reportSubject}`, {
        defaultValue: capitalize(reportSubject),
      }),
      value: reportSubject,
    }
  })

export type ReportSubject = Exclude<
  ReturnType<typeof getReportSubjects>[number]['value'],
  'all'
>

export const reportsData: Report[] = []
const columnHelper = createMRTColumnHelper<Report>()

export const getReportsColumns = (t: TFunction<'reports'>) => [
  columnHelper.accessor('id', {
    header: t('tables.columns.id', {defaultValue: 'ID'}),
    size: 40,
  }),

  columnHelper.accessor('title', {
    header: t('tables.columns.title', {defaultValue: 'Title'}),
    size: 120,
  }),
  columnHelper.accessor('reportDate', {
    header: t('tables.columns.date', {defaultValue: 'Date'}),
    Cell(props) {
      return dayjs(props.row.original.reportDate).format(ISODateFormat)
    },
  }),
  columnHelper.accessor('reportTime', {
    header: t('tables.columns.time', {defaultValue: 'Time'}),
    Cell(props) {
      const reportDate = dayjs(props.row.original.reportDate).format(
        ISODateFormat,
      )
      return dayjs(`${reportDate} ${props.row.original.reportTime}`).format(
        _12HourTimeFormat,
      )
    },
  }),
]
