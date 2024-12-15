import {createFileRoute} from '@tanstack/react-router'
import * as z from 'zod'

import {withHelmet} from '@/components'
import {lazyImport} from '@/utils/lazyImport'
import {reportDetailsSectionSchema} from '@/utils/validations/reports'

const ReportFilesList = lazyImport(() =>
  import('@/components/console/reports/report-files-list').then((m) => ({
    default: m.ReportFilesList,
  })),
)

export const Route = createFileRoute(
  '/_auth/console/_console-layout/reports/_layout/$reportId/$section',
)({
  component: withHelmet(ReportFilesList, 'Files list'),
  params: {
    parse: (params) =>
      z
        .object({section: reportDetailsSectionSchema, reportId: z.string()})
        .parse(params),
    stringify: (params) => ({
      reportId: `${params.reportId}`,
      section: `${params.section}`,
    }),
  },
})
