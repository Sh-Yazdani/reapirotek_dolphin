import {QueryClient} from '@tanstack/react-query'
import {toast} from 'sonner'

import {ToastContent} from '@/components'
import {toClientErrorMessage} from '@/utils/error'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {retry: 0, refetchOnWindowFocus: false},
    mutations: {
      onError: (error) => {
        toast(
          <ToastContent
            description={toClientErrorMessage(error)}
            title='Error!'
            type='error'
          />,
        )
      },
    },
  },
})
