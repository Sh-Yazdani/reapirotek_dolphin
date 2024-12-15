import type {TFunction} from 'i18next'
import {capitalize} from 'lodash-es'
import {createMRTColumnHelper} from 'material-react-table'

import type {AdminGender, Employee} from '@/lib/data-provider/api/__generated'

interface GenderOption {
  label: string
  value: AdminGender
}
export const getGenderOptions = (t: TFunction<'employees'>): GenderOption[] => [
  {
    label: t('genders.male', {defaultValue: 'Male'}),
    value: 'male',
  },
  {
    label: t('genders.female', {defaultValue: 'Female'}),
    value: 'female',
  },
  {
    label: t('genders.other', {defaultValue: 'Other'}),
    value: 'other',
  },
]

export const getMaritalStatusOptions = (t: TFunction<'employees'>) => [
  {
    label: t('marital-status.single', {defaultValue: 'Single'}),
    value: 'Single',
  },
  {
    label: t('marital-status.married', {defaultValue: 'Married'}),
    value: 'Married',
  },
  {
    label: t('marital-status.divorced', {defaultValue: 'Divorced'}),
    value: 'Divorced',
  },
]

/* TODO -> remove this id */
const columnHelper = createMRTColumnHelper<Employee>()

export const getEmployeesColumns = (t: TFunction<'employees'>) => [
  columnHelper.accessor('employeeCode', {
    header: t('tables.columns.employee-code', {defaultValue: 'Employee Code'}),
    size: 40,
  }),
  columnHelper.accessor('firstName', {
    header: t('tables.columns.first-name', {defaultValue: 'First Name'}),
    size: 120,
  }),
  columnHelper.accessor('lastName', {
    header: t('tables.columns.last-name', {defaultValue: 'Last Name'}),
    size: 120,
  }),
  columnHelper.accessor('email', {
    header: t('tables.columns.email', {defaultValue: 'Email'}),
    size: 300,
  }),
]

export const getEmployeesWithRoleColumns = (t: TFunction<'employees'>) => [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
  }),
  columnHelper.accessor('firstName', {
    header: t('tables.columns.first-name', {defaultValue: 'First Name'}),
    size: 120,
  }),
  columnHelper.accessor('lastName', {
    header: t('tables.columns.last-name', {defaultValue: 'Last Name'}),
    size: 120,
  }),
  columnHelper.accessor('roleId', {
    header: t('tables.columns.role', {defaultValue: 'Role'}),
    size: 300,
    Cell({cell}) {
      return capitalize(cell.getValue())
    },
  }),
]
