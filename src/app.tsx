import {createRouter, RouterProvider} from '@tanstack/react-router'
import {useEffect, useMemo} from 'react'

import {DefaultErrorComponent, DefaultPendingComponent} from '@/components'
import {useAbilityContext} from '@/lib/casl'
import {queryClient} from '@/lib/react-query'
import type {AppRouteContext} from '@/routes/__root'
import {useAuthenticationStore} from '@/store/auth'

// Import the generated route tree
import {routeTree} from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: useAuthenticationStore.getState(),
    ability: undefined!,
    queryClient: undefined!,
  },
  defaultPendingComponent: DefaultPendingComponent,
  defaultErrorComponent: DefaultErrorComponent,
  defaultPendingMs: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const auth = useAuthenticationStore((s) => s)

  useEffect(() => auth.refetchSession(), [])
  const ability = useAbilityContext()
  const contextValue: AppRouteContext = useMemo(
    () => ({auth, ability, queryClient}),
    [auth, ability],
  )

  if (!auth.isInitialized) {
    return <DefaultPendingComponent />
  }

  /* TODO -> lastActiveTime isn't a good prop to be depended on */
  return (
    <RouterProvider
      key={auth.lastActiveTime}
      context={contextValue}
      router={router}
    />
  )
}

export default App
