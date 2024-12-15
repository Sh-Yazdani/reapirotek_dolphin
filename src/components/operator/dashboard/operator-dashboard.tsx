import {Box, Stack} from '@mui/material'

import {DateCalendar} from '@/components'
import {WeatherForecast} from '@/components/console/dashboard/weather-forecast'

export const OperatorDashboard = () => {
  return (
    <Stack direction='column' gap={2}>
      <Box
        display='grid'
        gap={2}
        gridTemplateColumns={{
          xs: '1fr',
          xl: '320px 1fr',
        }}
      >
        <Box component={DateCalendar} />
        <Box component={WeatherForecast} />
      </Box>
    </Stack>
  )
}
