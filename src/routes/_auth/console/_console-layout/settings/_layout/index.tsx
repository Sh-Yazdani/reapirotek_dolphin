import {createFileRoute} from '@tanstack/react-router'

import {Settings, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/settings/_layout/',
)({
  component: withHelmet(Settings, 'Settings'),
})
