import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {PanelLayout} from '@/components'
import {createNextUrlBasedOnRole} from '@/utils/route'

export const Route = createFileRoute('/_auth/console/_console-layout')({
  component: memo(PanelLayout),
  beforeLoad({context: {auth}}) {
    const role = auth.user?.role
    const nextUrl = createNextUrlBasedOnRole(role)

    if (role === 'Operator') {
      throw redirect({
        to: nextUrl,
      })
    }
  },
})
