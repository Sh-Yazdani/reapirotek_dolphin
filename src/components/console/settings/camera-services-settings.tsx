import {Card, Stack, Switch, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useGetSet} from 'react-use'
import {toast} from 'sonner'

import {ToastContent} from '@/components'
import {stopMediaStream} from '@/components/operator/videos/video-recorder/useVideoRecorder'

type CameraPermissionStatus = 'default' | 'denied' | 'granted'

const DEFAULT = 'default'
const GRANTED = 'granted'
const DENIED = 'denied'

const useCameraStatus = () => {
  const [getStatus, setStatus] = useGetSet<CameraPermissionStatus>(DEFAULT)

  const checkPermission = async () => {
    if (!('mediaDevices' in navigator)) {
      console.log('This browser does not support camera access.')
      return
    }

    const devices = await navigator.mediaDevices.enumerateDevices()

    const cameraDevice = devices.find((device) => device.kind === 'videoinput')

    if (cameraDevice?.deviceId) {
      setStatus(GRANTED)
    } else {
      setStatus(DENIED)
    }

    if (getStatus() === GRANTED) return

    navigator.mediaDevices
      .getUserMedia({video: true})
      .then((stream) => {
        console.log('Camera access has been granted.')
        setStatus(GRANTED)
        stopMediaStream(stream)
      })
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          console.log('Camera access has been denied.')
          setStatus(DENIED)
        } else {
          console.log('Error accessing camera:', error)
        }
      })
  }

  useEffect(() => {
    void checkPermission()
  }, [])

  return [getStatus, checkPermission] as const
}

const getDescription = (
  status: CameraPermissionStatus,
  t: TFunction<'settings'>,
) => {
  if (status === DEFAULT)
    return t('camera.status.pending', {
      defaultValue: 'Camera access is pending.',
    })
  if (status === DENIED)
    return t('camera.status.blocked', {
      defaultValue: 'Camera access is blocked.',
    })
  return t('camera.status.enabled', {defaultValue: 'Camera access is enabled.'})
}

export const CameraSettings = () => {
  const [getStatus, checkPermission] = useCameraStatus()
  const {t} = useTranslation('settings')

  const handleSwitchChange = () => {
    void checkPermission()

    if (getStatus() === DEFAULT) return

    if (getStatus() === DENIED) {
      toast(
        <ToastContent
          description={t('camera.instructions.blocked', {
            defaultValue:
              'Please reset browser permission settings and reload the page.',
          })}
          title={t('camera.instructions.title', {defaultValue: 'Info'})}
          type='info'
        />,
      )
      return
    }

    toast(
      <ToastContent
        description={t('camera.instructions.revoke', {
          defaultValue:
            'To revoke camera access permission, please reset browser permission settings and reload the page.',
        })}
        title={t('camera.instructions.title', {defaultValue: 'Info'})}
        type='info'
      />,
      {
        duration: 8000,
      },
    )
  }

  const description = getDescription(getStatus(), t)

  return (
    <Card component={Stack} direction='row' justifyContent='space-between'>
      <Stack>
        <Typography color='neutrals.gray' fontWeight='medium' variant='t2'>
          {t('camera.title', {defaultValue: 'Camera Settings'})}
        </Typography>
        <Typography color='neutrals.description'>{description}</Typography>
      </Stack>

      <Switch
        checked={getStatus() === GRANTED}
        color='secondary'
        onChange={handleSwitchChange}
      />
    </Card>
  )
}
