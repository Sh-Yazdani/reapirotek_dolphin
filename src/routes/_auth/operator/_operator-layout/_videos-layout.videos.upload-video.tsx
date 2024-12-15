import {createFileRoute} from '@tanstack/react-router'

import {UploadVideo, withHelmet} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/_videos-layout/videos/upload-video',
)({
  component: withHelmet(UploadVideo, 'Upload video'),
})
