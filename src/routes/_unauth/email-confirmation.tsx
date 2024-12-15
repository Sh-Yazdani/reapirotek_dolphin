import {createFileRoute} from '@tanstack/react-router'
import * as z from 'zod'

import {EmailConfirmationForm, withHelmet} from '@/components'

export const Route = createFileRoute('/_unauth/email-confirmation')({
  component: withHelmet(EmailConfirmationForm, 'Email Confirmation'),
  validateSearch: z.object({
    token: z.string({message: 'Token Malformed'}),
    redirect: z.enum(['/login', '/reset-password']),
  }),
})
