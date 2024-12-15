// custom-instance.ts
import type {AxiosError, AxiosRequestConfig} from 'axios'
import axios from 'axios'

import {env} from '@/config/env'

import {applyAuthRefreshInterceptor} from './auth-refresh-interceptor'

const instance = axios.create({
  baseURL: env.APP_API_SERVICE_URL,
})

applyAuthRefreshInterceptor(instance)

export const applyAxiosAuthorizationHeader = (accessToken: string) => {
  instance.defaults.headers.Authorization = `Bearer ${accessToken}`
}

export const clearAxiosAuthorizationHeader = () => {
  instance.defaults.headers.Authorization = null
}

// add a second `options` argument here if you want to pass extra options to each generated query
export const axiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = instance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({data}) => data)

  // @ts-ignore ignore cm
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

export {instance}
