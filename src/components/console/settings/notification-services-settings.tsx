import {Card, Stack, Switch, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {toast} from 'sonner'

import {ToastContent} from '@/components'

type NotificationServicesStatus = NotificationPermission

const DEFAULT = 'default'
const GRANTED = 'granted'
const DENIED = 'denied'

const useNotificationStatus = () => {
  const [status, setStatus] = useState<NotificationServicesStatus>(DEFAULT)

  const checkPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.')
      return
    }

    if (Notification.permission === 'granted') {
      console.log('Permission has been granted.')
      setStatus('granted')
    } else if (Notification.permission === 'denied') {
      console.log('Permission has been denied.')
      setStatus('denied')
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Notification.requestPermission().then((permission) => {
        setStatus(permission)

        if (permission === 'granted') {
          console.log('Permission has been granted.')
        } else {
          console.log('Permission has been denied.')
        }
      })
    }
  }
  useEffect(() => {
    checkPermission()
  }, [])

  return [status, checkPermission] as const
}

const getDescription = (
  status: NotificationServicesStatus,
  t: TFunction<'settings'>,
) => {
  if (status === DEFAULT)
    return t('notifications.status.pending', {
      defaultValue: 'Notifications are pending.',
    })
  if (status === DENIED)
    return t('notifications.status.blocked', {
      defaultValue: 'Notifications are blocked.',
    })
  return t('notifications.status.enabled', {
    defaultValue: 'Notifications are enabled.',
  })
}

export const NotificationSettings = () => {
  const [status, checkPermission] = useNotificationStatus()
  const {t} = useTranslation('settings')

  const handleSwitchChange = () => {
    checkPermission()

    if (status === DEFAULT) return

    if (status === DENIED) {
      toast(
        <ToastContent
          description={t('notifications.instructions.blocked', {
            defaultValue:
              'Please reset browser permission settings and reload the page.',
          })}
          title={t('notifications.instructions.title', {defaultValue: 'Info'})}
          type='info'
        />,
      )
      return
    }

    toast(
      <ToastContent
        description={t('notifications.instructions.revoke', {
          defaultValue:
            'To revoke notification services permission, please reset browser permission settings and reload the page.',
        })}
        title={t('notifications.instructions.title', {defaultValue: 'Info'})}
        type='info'
      />,
      {
        duration: 8000,
      },
    )
  }

  const description = getDescription(status, t)

  return (
    <Card component={Stack} direction='row' justifyContent='space-between'>
      <Stack>
        <Typography color='neutrals.gray' fontWeight='medium' variant='t2'>
          {t('notifications.title', {defaultValue: 'Notification Settings'})}
        </Typography>
        <Typography color='neutrals.description'>{description}</Typography>
      </Stack>

      <Switch
        checked={status === GRANTED}
        color='secondary'
        onChange={handleSwitchChange}
      />
    </Card>
  )
}
