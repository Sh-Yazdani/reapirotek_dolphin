import {createFileRoute} from '@tanstack/react-router'

import {ResetPasswordForm, withHelmet} from '@/components'

export const Route = createFileRoute('/_unauth/reset-password')({
  component: withHelmet(ResetPasswordForm, 'Reset password'),
})
