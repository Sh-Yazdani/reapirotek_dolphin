import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {SettingsLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/console/_console-layout/settings/_layout',
)({
  component: memo(SettingsLayout),
})
