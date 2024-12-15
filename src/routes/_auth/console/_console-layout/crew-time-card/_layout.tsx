import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {CrewTimeCardLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/crew-time-card/_layout',
)({
  component: memo(CrewTimeCardLayout),
})
