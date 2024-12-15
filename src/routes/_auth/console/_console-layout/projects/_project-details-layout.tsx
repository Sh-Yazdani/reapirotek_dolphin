import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {ProjectDetailsLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/projects/_project-details-layout',
)({
  component: memo(ProjectDetailsLayout),
})
