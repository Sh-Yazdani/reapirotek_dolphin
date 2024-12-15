import {createFileRoute} from '@tanstack/react-router'

import {Settings, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/settings/_layout/',
)({
  component: withHelmet(() => <Settings withCameraSettings />, 'Settings'),
})
