import {createFileRoute} from '@tanstack/react-router'

import {RegisterForm, withHelmet} from '@/components'

export const Route = createFileRoute('/_unauth/register')({
  component: withHelmet(RegisterForm, 'Register'),
})
