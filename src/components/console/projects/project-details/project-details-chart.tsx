import {Stack, useTheme} from '@mui/material'
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import DataLabelPlugin from 'chartjs-plugin-datalabels'

import {CostChart} from '@/components/console/projects/project-details/charts/cost'
import {TimeChart} from '@/components/console/projects/project-details/charts/time'
import {WorkloadChart} from '@/components/console/projects/project-details/charts/workload'

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  DataLabelPlugin,
)
Chart.defaults.font.family = 'Geometria'

export const ProjectDetailsChart = () => {
  const theme = useTheme()
  Chart.defaults.color = theme.palette.common.black
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  Chart.defaults.borderColor = theme.palette.neutrals?.line!

  return (
    <Stack
      key={theme.palette.mode}
      direction={{xs: 'column', xl: 'row'}}
      spacing={2}
    >
      <TimeChart />
      <CostChart />
      <WorkloadChart />
    </Stack>
  )
}
