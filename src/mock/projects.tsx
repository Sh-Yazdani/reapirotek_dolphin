import dayjs from 'dayjs'
import type {TFunction} from 'i18next'
import {createMRTColumnHelper} from 'material-react-table'

import type {
  Project,
  ProjectMeasureUnit,
  ProjectStatus,
} from '@/lib/data-provider/api/__generated'
import {defaultDateTimeFormat} from '@/utils/date'

export const getProjectStatusOptions = (
  t: TFunction<'projects'>,
): {
  label: string
  value: ProjectStatus
}[] => [
  {
    label: t('status.initiation', {defaultValue: 'Initiation'}),
    value: 'Initiation',
  },
  {
    label: t('status.pre-construction', {defaultValue: 'Pre Construction'}),
    value: 'Pre-Construction',
  },
  {
    label: t('status.in-progress', {defaultValue: 'In Progress'}),
    value: 'In-Progress',
  },
  {
    label: t('status.completed', {defaultValue: 'Completed'}),
    value: 'Completed' as ProjectStatus,
  },
]

export const getProjectStatusOptionsWithAllOption = (
  t: TFunction<'projects'>,
) => [
  {label: t('status.all', {defaultValue: 'All'}), value: 'All'},
  ...getProjectStatusOptions(t),
]

interface MeasureUnitOption {
  label: string
  value: ProjectMeasureUnit
}
export const getMeasureUnitOptions = (
  t: TFunction<'projects'>,
): MeasureUnitOption[] => [
  {
    label: t('measure-unit.centimetre', {defaultValue: 'Centimetre'}),
    value: 'cm',
  },
  {
    label: t('measure-unit.inch', {defaultValue: 'Inch'}),
    value: 'in',
  },
  {
    label: t('measure-unit.meter', {defaultValue: 'Meter'}),
    value: 'm',
  },
  {
    label: t('measure-unit.foot', {defaultValue: 'Foot'}),
    value: 'ft',
  },
]

const columnHelper = createMRTColumnHelper<Project>()

export const getProjectColumns = (t: TFunction<'projects'>) => [
  columnHelper.accessor('id', {
    // header: 'Id',
    header: t('tables.columns.id', {defaultValue: 'ID'}),
  }),

  columnHelper.accessor('projectCode', {
    header: t('tables.columns.project-code', {defaultValue: 'Project Code'}),
    size: 40,
  }),

  columnHelper.accessor('title', {
    header: t('tables.columns.title', {defaultValue: 'Title'}),
  }),
  /* @ts-ignore Swagger issues */
  columnHelper.accessor('zoneId.name', {
    header: t('tables.columns.zone', {defaultValue: 'Zone'}),
  }),

  columnHelper.accessor('status', {
    header: t('tables.columns.status', {defaultValue: 'Status'}),
  }),
  columnHelper.accessor('createdAt', {
    header: t('tables.columns.issue-date', {defaultValue: 'Issue Date'}),
    Cell(props) {
      /* @ts-ignore Swagger issues */
      return dayjs(props.row.original.createdAt).format(defaultDateTimeFormat)
    },
  }),
]
