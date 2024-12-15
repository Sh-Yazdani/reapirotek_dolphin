import {createFileRoute} from '@tanstack/react-router'

import {ProfileSecurity, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout/security',
)({
  component: withHelmet(ProfileSecurity, 'Security'),
})
