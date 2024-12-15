import {Box, Card, Stack, Typography} from '@mui/material'
import type {AxiosHeaders} from 'axios'
import dayjs from 'dayjs'
import {capitalize, head} from 'lodash-es'
import {useTranslation} from 'react-i18next'
import {useGeolocation} from 'react-use'

import {CardWithTitle} from '@/components'
import {env} from '@/config/env'
import type {ForecastDataListItem} from '@/lib/data-provider/third-party/open-weather/api/__generated'
import {useGetForecast} from '@/lib/data-provider/third-party/open-weather/api/__generated'

import {getWeatherIcon} from './weather-forecast-icon'
import {WeatherForecastSkeleton} from './weather-forecast-skeleton'

interface Forecast {
  time: string
  degree: string
  label: string
  isCurrent: boolean
  icon: string
}

interface WeatherProps {
  forecast: Forecast
}

const Weather: React.FC<WeatherProps> = ({forecast}) => {
  const isCurrent = forecast.isCurrent
  const color = isCurrent ? 'primary.main' : 'neutrals.gray'
  const fontWeight = isCurrent ? 'bold' : 'normal'
  const Icon = getWeatherIcon(forecast.icon)
  return (
    <Stack alignItems='center' color={color} flex={1}>
      <Typography fontWeight={fontWeight} variant='caption'>
        {forecast.time}
      </Typography>

      <Box
        className='shrink-0 weather-icon'
        component={Icon!}
        height={55}
        mt={3}
        mx='auto'
        width={55}
      />

      <Typography
        color={color}
        fontWeight={fontWeight}
        mt={4}
        variant='caption'
      >
        {forecast.degree}°C
      </Typography>

      <Typography
        color={color}
        fontWeight={fontWeight}
        mt={2}
        variant='caption'
      >
        {capitalize(forecast.label)}
      </Typography>
    </Stack>
  )
}

interface WeatherForecastImplProps {
  forecasts: Forecast[]
}

export const WeatherForecastImpl: React.FC<WeatherForecastImplProps> = ({
  forecasts,
}) => {
  return (
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
      {forecasts.map((forecast) => {
        return <Weather key={forecast.time} forecast={forecast} />
      })}
    </Stack>
  )
}

const transformOpenWeatherForecastToLocalMap = (
  forecastData: ForecastDataListItem[] = [],
): Forecast[] => {
  const todayForecastData = forecastData.slice(0, 8)

  return todayForecastData.map((data, index) => {
    const weather = head(data.weather)!
    return {
      time: dayjs.unix(data.dt!).format('HH:mm'),
      /* @ts-ignore TODO -> fix this */
      degree: data.main.temp?.toFixed(0) as unknown as string,
      isCurrent: index === 0,
      label: weather.main!,
      icon: weather.icon!,
    }
  })
}

export const WeatherForecast = () => {
  const {i18n, t} = useTranslation('dashboard')
  const {error, latitude, loading, longitude} = useGeolocation()
  const {data: forecast, isLoading: isLoadingWeather} = useGetForecast(
    {
      appid: env.APP_OPEN_WEATHER_API_KEY,
      lat: latitude!,
      lon: longitude!,
      units: 'metric',
      lang: i18n.language,
    },
    {
      request: {
        baseURL: env.APP_OPEN_WEATHER_BASE_URL,
        headers: null as unknown as AxiosHeaders,
      },
      query: {enabled: !loading && !error},
    },
  )

  if (loading || isLoadingWeather) return <WeatherForecastSkeleton />

  if (error)
    return (
      <Card>
        <Stack
          alignItems='center'
          height='100%'
          justifyContent='center'
          width='100%'
        >
          <Typography color='common.black'>
            {t('weather.error', {
              defaultValue: 'Error in loading your location',
            })}
          </Typography>
        </Stack>
      </Card>
    )

  return (
    <CardWithTitle
      title={t('weather.title', {
        city: forecast?.city?.name,
        defaultValue: 'Weather in {{city}}',
      })}
    >
      <WeatherForecastImpl
        forecasts={transformOpenWeatherForecastToLocalMap(forecast?.list)}
      />
    </CardWithTitle>
  )
}
