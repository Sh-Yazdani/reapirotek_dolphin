import {Box, Stack} from '@mui/material'

import {DateCalendar} from '@/components'

import {ProjectsStatusTable} from './projects-status-table'
import {WeatherForecast} from './weather-forecast'

export const Dashboard = () => {
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

      <ProjectsStatusTable />
    </Stack>
  )
}
