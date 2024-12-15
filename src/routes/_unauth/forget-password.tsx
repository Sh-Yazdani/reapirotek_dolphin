import {createFileRoute} from '@tanstack/react-router'

import {ForgetPasswordForm, withHelmet} from '@/components'

export const Route = createFileRoute('/_unauth/forget-password')({
  component: withHelmet(ForgetPasswordForm, 'Forget password'),
})
