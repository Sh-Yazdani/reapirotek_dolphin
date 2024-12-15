import {createFileRoute} from '@tanstack/react-router'

import {CrewTimeCard, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/crew-time-card/_layout/',
)({
  component: withHelmet(CrewTimeCard, 'Crew time card'),
})
