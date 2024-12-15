import React, {lazy, Suspense} from 'react'

import {DefaultPendingComponent} from '@/components'

export function retry<T>(
  fn: () => Promise<T>,
  retriesLeft = 5,
  interval = 1000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error)

            return
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })
}

interface Opts {
  fallback: React.ReactNode
}
type Unpromisify<T> = T extends Promise<infer P> ? P : never
type ImportFunc<U> = () => Promise<{default: U}>

export const lazyImport = <
  T extends Promise<any>,
  U extends React.ComponentType<any>,
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = {fallback: null},
) => {
  // eslint-disable-next-line fp/no-let
  let lazyFactory: ImportFunc<U> = () => retry<{default: U}>(importFunc)

  /* chunk preload */
  void lazyFactory().then(() => {
    /*  */
  })

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then((module) => ({default: selectorFunc(module)}))
  }

  const LazyComponent = lazy(lazyFactory)

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={opts.fallback ?? <DefaultPendingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}
