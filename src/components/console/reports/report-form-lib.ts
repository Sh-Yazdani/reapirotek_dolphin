import dayjs from 'dayjs'
import {produce} from 'immer'
import {unset} from 'lodash'
import {assign} from 'lodash-es'

import type {Report} from '@/lib/data-provider/api/__generated'
import {_24HourTimeFormat, ISODateFormat} from '@/utils/date'

import type {ReportFormValues} from './report-form'

export const transformFormValuesToReportDTO = (
  formValues: ReportFormValues,
) => {
  return produce(formValues, (draft) => {
    assign(draft, {
      reportDate: draft.date.utc().format(ISODateFormat),
      reportTime: draft.date.utc().format(_24HourTimeFormat),
    })

    unset(draft, 'date')
  })
}

export const transformReportToFormDto = (report: Report) => {
  return produce(report, (draft) => {
    /*  */
    assign(draft, {
      date: dayjs(`${draft.reportDate} ${draft.reportTime}`)
        .utc()
        .format(ISODateFormat),
    })
  })
}
