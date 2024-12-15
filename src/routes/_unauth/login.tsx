import {Skeleton} from '@mui/material'
import {createFileRoute} from '@tanstack/react-router'

import {LoginForm, withHelmet} from '@/components'

export const Route = createFileRoute('/_unauth/login')({
  component: withHelmet(LoginForm, 'Login'),
  pendingComponent: () => {
    return <Skeleton height={461} variant='rectangular' width='100%' />
  },
})
