import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {EquipmentLayout} from '@/components'
import {defaultNoAccessCallbackUrl} from '@/lib/casl'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/equipment/_layout',
)({
  component: memo(EquipmentLayout),
  beforeLoad({context: {ability}}) {
    if (!ability.can('read', 'equipment')) {
      throw redirect({to: defaultNoAccessCallbackUrl})
    }
  },
})
