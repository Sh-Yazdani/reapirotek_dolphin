import {Stack} from '@mui/material'

import {CameraSettings} from './camera-services-settings'
import {LocationServicesSettings} from './location-services-settings'
import {NotificationSettings} from './notification-services-settings'

interface SettingsProps {
  withCameraSettings?: boolean
}

export const Settings: React.FC<SettingsProps> = ({
  withCameraSettings = false,
}) => {
  return (
    <Stack spacing={2}>
      <LocationServicesSettings />
      <NotificationSettings />
      {withCameraSettings ? <CameraSettings /> : null}
    </Stack>
  )
}
