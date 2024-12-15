import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'
import {z} from 'zod'

import {AuthLayout} from '@/components/auth'
import {createNextUrlBasedOnRole} from '@/utils/route'

export const Route = createFileRoute('/_unauth')({
  component: memo(AuthLayout),
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),

  beforeLoad({context: {auth}, search}) {
    const nextUrl = createNextUrlBasedOnRole(auth.user?.role)

    if (auth.isAuthenticated) {
      throw redirect({
        to: search.redirect ?? nextUrl,
      })
    }
  },
})
