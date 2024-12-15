import {createFileRoute} from '@tanstack/react-router'
import {memo} from 'react'

import {SettingsLayout} from '@/components'

export const Route = createFileRoute(
  '/_auth/operator/_operator-layout/settings/_layout',
)({
  component: memo(SettingsLayout),
})
