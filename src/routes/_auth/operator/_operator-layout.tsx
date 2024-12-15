import {createFileRoute, redirect} from '@tanstack/react-router'
import {memo} from 'react'

import {OperatorLayout} from '@/components'
import {createNextUrlBasedOnRole} from '@/utils/route'

export const Route = createFileRoute('/_auth/operator/_operator-layout')({
  component: memo(OperatorLayout),
  beforeLoad({context: {auth}}) {
    const role = auth.user?.role
    const nextUrl = createNextUrlBasedOnRole(role)

    if (role !== 'Operator') {
      throw redirect({
        to: nextUrl,
      })
    }
  },
})
