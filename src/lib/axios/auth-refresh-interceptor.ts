import type {AxiosError, AxiosInstance} from 'axios'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import {env} from '@/config/env'
import type {RefreshToken200} from '@/lib/data-provider/api/__generated'
import {useAuthenticationStore} from '@/store/auth'

import {applyAxiosAuthorizationHeader} from './axios'

const refreshInterceptorInstance = axios.create({
  baseURL: env.APP_API_SERVICE_URL,
})

export const applyRefreshInterceptorInstanceAuthorizationHeader = (
  accessToken: string,
) => {
  refreshInterceptorInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
}

export const clearRefreshInterceptorInstanceAuthorizationHeader = () => {
  refreshInterceptorInstance.defaults.headers.Authorization = null
}

const refreshAuthLogic = (failedRequest: AxiosError) => {
  const auth = useAuthenticationStore.getState()
  const refreshToken = auth.user?.refreshToken

  if (!refreshToken) {
    return Promise.reject(failedRequest)
  }

  return refreshInterceptorInstance
    .post<RefreshToken200>(`/auth/refreshToken`, {refreshToken})
    .then((refreshTokenResponse) => {
      const newAccessToken = refreshTokenResponse.data.accessToken!
      auth.saveRefreshToken(newAccessToken)

      if (!failedRequest.response) return

      failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`
      applyAxiosAuthorizationHeader(newAccessToken)
      // return Promise.resolve()
      return true
    })
    .catch(() => {
      /* Clear tokens and data invalidation */
      auth.logout()
      //   void getQueryClient().invalidateQueries({ queryKey: ["user"] });
      throw failedRequest // This causes react query to enter the failed state
    })
}

export const applyAuthRefreshInterceptor = (instance: AxiosInstance) =>
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
