import type {QueryClient} from '@tanstack/react-query'
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {memo} from 'react'

import type {AbilityContextValue} from '@/lib/casl'
import type {AuthenticationStoreValue} from '@/store/auth'

export interface AppRouteContext {
  auth: AuthenticationStoreValue
  ability: AbilityContextValue
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<AppRouteContext>()({
  component: memo(Outlet),
})
