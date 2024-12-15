import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {OperatorVideosLayout} from '@/components/operator/videos/videos-layout'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/_videos-layout',
)({
  component: memo(OperatorVideosLayout),
})
