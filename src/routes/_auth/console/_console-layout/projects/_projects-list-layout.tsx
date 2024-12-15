import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {ProjectsListLayout} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_projects-list-layout',
)({
  component: memo(ProjectsListLayout),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'projects')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
