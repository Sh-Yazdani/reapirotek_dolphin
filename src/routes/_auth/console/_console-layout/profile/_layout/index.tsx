import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {ProfileForm} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout/',
)({
  component: memo(ProfileForm),
})
