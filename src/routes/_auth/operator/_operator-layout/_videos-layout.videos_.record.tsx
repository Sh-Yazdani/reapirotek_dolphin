import {createFileRoute} from '@tanstack/react-router'

import {VideoRecorder, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/_videos-layout/videos/record',
)({
  component: withHelmet(VideoRecorder, 'Record video'),
})
