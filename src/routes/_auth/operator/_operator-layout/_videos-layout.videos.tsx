import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Fragment} from 'react'
import {z} from 'zod'

import {Videos, withHelmet} from '@/components'

const Impl = () => {
  return (
    <Fragment>
      <Videos />
      <Outlet />
    </Fragment>
  )
}

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/_videos-layout/videos',
)({
  component: withHelmet(Impl, ' Videos'),
  validateSearch: z.object({
    active: z.enum(['detected', 'undetected']).optional().default('detected'),
  }),
})
