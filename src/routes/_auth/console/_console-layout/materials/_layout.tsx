import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {MaterialsLayout} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/materials/_layout',
)({
  component: memo(MaterialsLayout),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'materials')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
