import {Card, Skeleton, Stack} from '@mui/material'
import {range} from 'lodash-es'

const Weather: React.FC = () => {
  return (
    <Stack alignItems='center' flex={1}>
      <Skeleton height={17.61} variant='text' width={39} />
      <Skeleton
        height={55}
        sx={{mt: 3, mx: 'auto', flexShrink: 0}}
        width={43}
      />
      <Skeleton height={17.61} sx={{mt: 4}} variant='text' width={31} />
      <Skeleton height={17.61} sx={{mt: 2}} variant='text' width={39} />
    </Stack>
  )
}

interface WeatherForecastSkeletonProps {}

export const WeatherForecastSkeleton: React.FC<
  WeatherForecastSkeletonProps
> = () => {
  return (
    <Card>
      <Stack>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          maxWidth={120}
          mb={{xs: 2, sm: 4}}
        >
          <Skeleton variant='text' width='100%' />
        </Stack>
        <Stack
          alignItems='center'
          direction='row'
          flex={1}
          flexWrap='nowrap'
          gap={{md: 2.5}}
          justifyContent='space-between'
          overflow='auto'
          pb={1}
          whiteSpace='nowrap'
        >
          {range(0, 8).map((_, index) => {
            return <Weather key={index} />
          })}
        </Stack>
      </Stack>
    </Card>
  )
}
