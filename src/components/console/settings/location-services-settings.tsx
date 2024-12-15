import {Card, CircularProgress, Stack, Switch, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import {isNumber} from 'lodash-es' // Assuming lodash is used for isNumber function
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useGeolocation} from 'react-use'
import type {IGeolocationPositionError} from 'react-use/lib/useGeolocation'
import {toast} from 'sonner'

import {ToastContent} from '@/components'

type LocationServicesStatus = PermissionState

const PROMPT = 'prompt'
const GRANTED = 'granted'
const DENIED = 'denied'

const useLocationStatus = (
  latitude: number | null,
  error: Error | IGeolocationPositionError | undefined,
) => {
  const [status, setStatus] = useState<LocationServicesStatus>(PROMPT)

  useEffect(() => {
    if (isNumber(latitude)) {
      setStatus(GRANTED)
    }
  }, [latitude])

  useEffect(() => {
    if (error instanceof GeolocationPositionError) {
      setStatus(DENIED)
    }
  }, [error])

  return [status, setStatus] as const
}

const getDescription = (
  status: LocationServicesStatus,
  hasBlockedLocationServices: boolean,
  t: TFunction<'settings'>,
) => {
  if (status === PROMPT)
    return t('location.status.pending', {
      defaultValue: 'Location service permissions are pending.',
    })
  if (hasBlockedLocationServices)
    return t('location.status.pending', {
      defaultValue: "'Location services are blocked.'",
    })
  return t('location.status.blocked', {
    defaultValue: 'Location services are enabled.',
  })
}

export const LocationServicesSettings = () => {
  const {error, latitude, loading} = useGeolocation({maximumAge: Infinity})
  const hasBlockedLocationServices = error instanceof GeolocationPositionError
  const [status, setStatus] = useLocationStatus(latitude, error)
  const {t} = useTranslation('settings')

  const checkPermission = async () => {
    const permission = await navigator.permissions.query({name: 'geolocation'})

    if (hasBlockedLocationServices) {
      setStatus(DENIED)
      return
    }

    if (status !== GRANTED) {
      setStatus(permission.state)
    }
  }

  const handleSwitchChange = async () => {
    await checkPermission()

    if (hasBlockedLocationServices) {
      toast(
        <ToastContent
          description={t('location.instructions.blocked', {
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
        description={t('location.instructions.revoke', {
          defaultValue:
            'To revoke location services permission, please reset browser permission settings and reload the page.',
        })}
        title={t('notifications.instructions.title', {defaultValue: 'Info'})}
        type='info'
      />,
      {duration: 8000},
    )
  }

  const description = getDescription(status, hasBlockedLocationServices, t)

  return (
    <Card
      alignItems='center'
      component={Stack}
      direction='row'
      justifyContent='space-between'
    >
      <Stack>
        <Typography color='neutrals.gray' fontWeight='medium' variant='t2'>
          {t('location.title', {defaultValue: 'Location Services'})}
        </Typography>
        <Typography color='neutrals.description'>{description}</Typography>
      </Stack>
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Switch checked={status === GRANTED} onChange={handleSwitchChange} />
      )}
    </Card>
  )
}
