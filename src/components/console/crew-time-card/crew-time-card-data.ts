import type {TFunction} from 'i18next'

import type {MinimalTableData} from '@/components'

export interface Project {
  title: string
  key: string
  data: MinimalTableData
}

export const createProjectsCrewTimeCardData = (
  title: string,
  t: TFunction<'crewTimeCard'>,
) =>
  ({
    title,
    header: [
      {
        text: t('table.headers.employee', {defaultValue: 'Employee'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.time-card-day', {
          defaultValue: 'Time Card Day',
        }),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.start', {defaultValue: 'Start'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.finish', {defaultValue: 'Finish'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.total-hours', {defaultValue: 'Total Hours'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.ot-pay-rate', {defaultValue: 'OT Pay Rate'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.wage-rate', {defaultValue: 'Wage Rate'}),
        colSpan: 1,
        align: 'left',
      },
      {
        text: t('table.headers.total', {defaultValue: 'Total'}),
        colSpan: 1,
        align: 'left',
      },
    ],
    rows: [
      {
        cells: [
          {text: 'John Doe', colSpan: 1},
          {text: '2023-05-01', colSpan: 1},
          {text: '8:00 AM', colSpan: 1},
          {text: '1:00 PM', colSpan: 1},
          {text: '5.00', colSpan: 1},
          {text: '30', colSpan: 1},
          {text: '20', colSpan: 1},
          {text: '100', colSpan: 1},
        ],
      },
      {
        cells: [
          {
            text: t('table.headers.total', {defaultValue: 'Total'}),
            colSpan: 1,
          },
          {text: '19.00', colSpan: 6, align: 'center'},
          {text: '380', colSpan: 1},
        ],
      },
    ],
  }) as MinimalTableData
