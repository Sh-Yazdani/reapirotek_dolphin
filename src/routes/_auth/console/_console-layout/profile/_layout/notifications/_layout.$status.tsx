import {createFileRoute, useParams} from '@tanstack/react-router'
import {capitalize, filter, get} from 'lodash-es'
import {memo} from 'react'
import * as z from 'zod'

import {Notifications, withHelmet} from '@/components'
import type {Notification} from '@/components/console/layout/app-bar/notifications-popover'
import {notifications} from '@/components/console/layout/app-bar/notifications-popover'

export const notificationStatusSchema = z
  .enum(['all', 'unread', 'read'])
  .default('all')

type NotificationStatus = z.infer<typeof notificationStatusSchema>

const Impl = () => {
  const status = useParams({
    from: '/_auth/console/_console-layout/profile/_layout/notifications/_layout/$status',
    select: (s) => s.status,
  })
  const notificationsStatusMap: Record<NotificationStatus, Notification[]> = {
    all: notifications,
    read: filter(notifications, {isUnread: false}),
    unread: filter(notifications, {isUnread: true}),
  }

  const C = withHelmet(
    () => <Notifications notifications={get(notificationsStatusMap, status)} />,
    `${capitalize(status)} notifications`,
  )

  return <C />
}

export const Route = createFileRoute(
  '/_auth/console/_console-layout/profile/_layout/notifications/_layout/$status',
)({
  component: memo(Impl),
  params: {
    parse: (params) =>
      z.object({status: notificationStatusSchema}).parse(params),
    stringify: (params) => ({status: `${params.status}`}),
  },
})
