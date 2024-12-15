import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {memo} from 'react'

export const Route = createFileRoute('/_auth')({
  component: memo(Outlet),

  beforeLoad({context: {auth}, location}) {
    if (!auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
