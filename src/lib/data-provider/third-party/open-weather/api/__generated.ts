/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * OpenWeatherMap API
 * API documentation for OpenWeatherMap weather data
 * OpenAPI spec version: 2.5
 */
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import {useQuery} from '@tanstack/react-query'

import type {ErrorType} from '../../../../axios/axios'
import {axiosInstance} from '../../../../axios/axios'

export type GetOnecallUnits =
  (typeof GetOnecallUnits)[keyof typeof GetOnecallUnits]

export const GetOnecallUnits = {
  standard: 'standard',
  metric: 'metric',
  imperial: 'imperial',
} as const

export interface GetOnecallParams {
  /**
   * Latitude
   */
  lat: number
  /**
   * Longitude
   */
  lon: number
  /**
   * Exclude specific weather data blocks (e.g., 'current,minutely,hourly,daily,alerts')
   */
  exclude?: string
  /**
   * Your OpenWeatherMap API key
   */
  appid: string
  /**
   * Units for temperature (standard, metric, or imperial)
   */
  units?: GetOnecallUnits
  /**
   * Language code for response translation
   */
  lang?: string
}

export type GetForecastUnits =
  (typeof GetForecastUnits)[keyof typeof GetForecastUnits]

export const GetForecastUnits = {
  standard: 'standard',
  metric: 'metric',
  imperial: 'imperial',
} as const

export interface GetForecastParams {
  /**
   * City name, state code, and country code divided by comma
   */
  q?: string
  /**
   * City ID
   */
  id?: number
  /**
   * Latitude
   */
  lat?: number
  /**
   * Longitude
   */
  lon?: number
  /**
   * Zip code
   */
  zip?: string
  /**
   * Your OpenWeatherMap API key
   */
  appid: string
  /**
   * Units for temperature (standard, metric,            imperial)
   */
  units?: GetForecastUnits
  /**
   * Language code for response translation (e.g., 'en', 'es', 'fr', 'de')
   */
  lang?: string
}

export type GetWeatherUnits =
  (typeof GetWeatherUnits)[keyof typeof GetWeatherUnits]

export const GetWeatherUnits = {
  standard: 'standard',
  metric: 'metric',
  imperial: 'imperial',
} as const

export interface GetWeatherParams {
  /**
   * City name, state code, and country code divided by comma (e.g., 'London,uk'), or city ID, or zip code
   */
  q?: string
  /**
   * City ID
   */
  id?: number
  /**
   * Latitude
   */
  lat?: number
  /**
   * Longitude
   */
  lon?: number
  /**
   * Zip code
   */
  zip?: string
  /**
   * Your OpenWeatherMap API key
   */
  appid: string
  /**
   * Units for temperature (standard, metric, or imperial)
   */
  units?: GetWeatherUnits
  /**
   * Language code for response translation (e.g., 'en', 'es', 'fr', 'de')
   */
  lang?: string
}

export interface OneCallDataHourlyItemWeatherItem {
  description?: string
  icon?: string
  id?: number
  main?: string
}

export interface OneCallDataHourlyItem {
  clouds?: number
  dew_point?: number
  dt?: number
  feels_like?: number
  humidity?: number
  pop?: number
  pressure?: number
  temp?: number
  uvi?: number
  visibility?: number
  weather?: OneCallDataHourlyItemWeatherItem[]
  wind_deg?: number
  wind_speed?: number
}

export interface OneCallData {
  alerts?: OneCallDataAlertsItem[]
  current?: OneCallDataCurrent
  daily?: OneCallDataDailyItem[]
  hourly?: OneCallDataHourlyItem[]
  lat?: number
  lon?: number
  timezone?: string
  timezone_offset?: number
}

export interface OneCallDataDailyItemWeatherItem {
  description?: string
  icon?: string
  id?: number
  main?: string
}

export interface OneCallDataDailyItemTemp {
  day?: number
  eve?: number
  max?: number
  min?: number
  morn?: number
  night?: number
}

export interface OneCallDataDailyItemFeelsLike {
  day?: number
  eve?: number
  morn?: number
  night?: number
}

export interface OneCallDataDailyItem {
  clouds?: number
  dew_point?: number
  dt?: number
  feels_like?: OneCallDataDailyItemFeelsLike
  humidity?: number
  moon_phase?: number
  moonrise?: number
  moonset?: number
  pop?: number
  pressure?: number
  sunrise?: number
  sunset?: number
  temp?: OneCallDataDailyItemTemp
  uvi?: number
  weather?: OneCallDataDailyItemWeatherItem[]
  wind_deg?: number
  wind_speed?: number
}

export interface OneCallDataCurrentWeatherItem {
  description?: string
  icon?: string
  id?: number
  main?: string
}

export interface OneCallDataCurrent {
  clouds?: number
  dew_point?: number
  dt?: number
  feels_like?: number
  humidity?: number
  pressure?: number
  sunrise?: number
  sunset?: number
  temp?: number
  uvi?: number
  visibility?: number
  weather?: OneCallDataCurrentWeatherItem[]
  wind_deg?: number
  wind_speed?: number
}

export interface OneCallDataAlertsItem {
  description?: string
  end?: number
  event?: string
  sender_name?: string
  start?: number
  tags?: string[]
}

export interface ForecastData {
  city?: ForecastDataCity
  list?: ForecastDataListItem[]
}

export interface ForecastDataListItemWind {
  deg?: number
  speed?: number
}

export interface ForecastDataListItemWeatherItem {
  description?: string
  icon?: string
  id?: number
  main?: string
}

export interface ForecastDataListItemMain {
  feels_like?: number
  humidity?: number
  pressure?: number
  temp?: number
  temp_max?: number
  temp_min?: number
}

export interface ForecastDataListItemClouds {
  all?: number
}

export interface ForecastDataListItem {
  clouds?: ForecastDataListItemClouds
  dt?: number
  dt_txt?: string
  main?: ForecastDataListItemMain
  weather?: ForecastDataListItemWeatherItem[]
  wind?: ForecastDataListItemWind
}

export interface ForecastDataCityCoord {
  lat?: number
  lon?: number
}

export interface ForecastDataCity {
  coord?: ForecastDataCityCoord
  country?: string
  id?: number
  name?: string
  population?: number
  sunrise?: number
  sunset?: number
  timezone?: number
}

export interface WeatherDataWind {
  deg?: number
  speed?: number
}

export interface WeatherDataWeatherItem {
  description?: string
  icon?: string
  id?: number
  main?: string
}

export interface WeatherDataSys {
  country?: string
  id?: number
  sunrise?: number
  sunset?: number
  type?: number
}

export interface WeatherDataMain {
  feels_like?: number
  humidity?: number
  pressure?: number
  temp?: number
  temp_max?: number
  temp_min?: number
}

export interface WeatherDataCoord {
  lat?: number
  lon?: number
}

export interface WeatherDataClouds {
  all?: number
}

export interface WeatherData {
  base?: string
  clouds?: WeatherDataClouds
  cod?: number
  coord?: WeatherDataCoord
  dt?: number
  id?: number
  main?: WeatherDataMain
  name?: string
  sys?: WeatherDataSys
  timezone?: number
  visibility?: number
  weather?: WeatherDataWeatherItem[]
  wind?: WeatherDataWind
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * Retrieve current weather information for a specific location by city name, city ID, geographic coordinates, or zip code.
 * @summary Get current weather data
 */
export const getWeather = (
  params: GetWeatherParams,
  options?: SecondParameter<typeof axiosInstance>,
  signal?: AbortSignal,
) => {
  return axiosInstance<WeatherData>(
    {url: `/weather`, method: 'GET', params, signal},
    options,
  )
}

export const getGetWeatherQueryKey = (params: GetWeatherParams) => {
  return [`/weather`, ...(params ? [params] : [])] as const
}

export const getGetWeatherQueryOptions = <
  TData = Awaited<ReturnType<typeof getWeather>>,
  TError = ErrorType<void>,
>(
  params: GetWeatherParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getWeather>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
) => {
  const {query: queryOptions, request: requestOptions} = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetWeatherQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getWeather>>> = ({
    signal,
  }) => getWeather(params, requestOptions, signal)

  return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
    Awaited<ReturnType<typeof getWeather>>,
    TError,
    TData
  > & {queryKey: QueryKey}
}

export type GetWeatherQueryResult = NonNullable<
  Awaited<ReturnType<typeof getWeather>>
>
export type GetWeatherQueryError = ErrorType<void>

/**
 * @summary Get current weather data
 */
export const useGetWeather = <
  TData = Awaited<ReturnType<typeof getWeather>>,
  TError = ErrorType<void>,
>(
  params: GetWeatherParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getWeather>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
  const queryOptions = getGetWeatherQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Retrieve a 5-day weather forecast for a specific city.
 * @summary Get 5-day weather forecast
 */
export const getForecast = (
  params: GetForecastParams,
  options?: SecondParameter<typeof axiosInstance>,
  signal?: AbortSignal,
) => {
  return axiosInstance<ForecastData>(
    {url: `/forecast`, method: 'GET', params, signal},
    options,
  )
}

export const getGetForecastQueryKey = (params: GetForecastParams) => {
  return [`/forecast`, ...(params ? [params] : [])] as const
}

export const getGetForecastQueryOptions = <
  TData = Awaited<ReturnType<typeof getForecast>>,
  TError = ErrorType<void>,
>(
  params: GetForecastParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getForecast>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
) => {
  const {query: queryOptions, request: requestOptions} = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetForecastQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getForecast>>> = ({
    signal,
  }) => getForecast(params, requestOptions, signal)

  return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
    Awaited<ReturnType<typeof getForecast>>,
    TError,
    TData
  > & {queryKey: QueryKey}
}

export type GetForecastQueryResult = NonNullable<
  Awaited<ReturnType<typeof getForecast>>
>
export type GetForecastQueryError = ErrorType<void>

/**
 * @summary Get 5-day weather forecast
 */
export const useGetForecast = <
  TData = Awaited<ReturnType<typeof getForecast>>,
  TError = ErrorType<void>,
>(
  params: GetForecastParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getForecast>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
  const queryOptions = getGetForecastQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Retrieve comprehensive weather data for a specific location using latitude and longitude.
 * @summary Get current weather, hourly forecast, and daily forecast
 */
export const getOnecall = (
  params: GetOnecallParams,
  options?: SecondParameter<typeof axiosInstance>,
  signal?: AbortSignal,
) => {
  return axiosInstance<OneCallData>(
    {url: `/onecall`, method: 'GET', params, signal},
    options,
  )
}

export const getGetOnecallQueryKey = (params: GetOnecallParams) => {
  return [`/onecall`, ...(params ? [params] : [])] as const
}

export const getGetOnecallQueryOptions = <
  TData = Awaited<ReturnType<typeof getOnecall>>,
  TError = ErrorType<void>,
>(
  params: GetOnecallParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getOnecall>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
) => {
  const {query: queryOptions, request: requestOptions} = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetOnecallQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getOnecall>>> = ({
    signal,
  }) => getOnecall(params, requestOptions, signal)

  return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
    Awaited<ReturnType<typeof getOnecall>>,
    TError,
    TData
  > & {queryKey: QueryKey}
}

export type GetOnecallQueryResult = NonNullable<
  Awaited<ReturnType<typeof getOnecall>>
>
export type GetOnecallQueryError = ErrorType<void>

/**
 * @summary Get current weather, hourly forecast, and daily forecast
 */
export const useGetOnecall = <
  TData = Awaited<ReturnType<typeof getOnecall>>,
  TError = ErrorType<void>,
>(
  params: GetOnecallParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getOnecall>>, TError, TData>
    >
    request?: SecondParameter<typeof axiosInstance>
  },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
  const queryOptions = getGetOnecallQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey
  }

  query.queryKey = queryOptions.queryKey

  return query
}