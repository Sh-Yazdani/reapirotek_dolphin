import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {ProfileLayout} from '@/components/console/profile'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout',
)({
  component: memo(ProfileLayout),
})
