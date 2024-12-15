import dayjs from 'dayjs'
import {produce} from 'immer'
import {assign, get as _get, pick} from 'lodash-es'
import type {StateCreator, StoreApi} from 'zustand'
import {create} from 'zustand'
import type {PersistOptions} from 'zustand/middleware'
import {createJSONStorage, persist} from 'zustand/middleware'

import {localStorageKeys} from '@/config/constants'
import {
  applyRefreshInterceptorInstanceAuthorizationHeader,
  clearRefreshInterceptorInstanceAuthorizationHeader,
} from '@/lib/axios/auth-refresh-interceptor'
import {
  applyAxiosAuthorizationHeader,
  clearAxiosAuthorizationHeader,
} from '@/lib/axios/axios'
import type {UserPermissions, UserRole} from '@/lib/casl'
import {permissionsMap} from '@/lib/casl'
import type {LoginUser200, UserInfo} from '@/lib/data-provider/api/__generated'
import {queryClient} from '@/lib/react-query'
import {ISO8601DateTimeFormat} from '@/utils/date'

export interface AuthenticatedUser
  extends Partial<Omit<UserInfo, 'role'>>,
    Omit<LoginUser200, 'user'> {
  role?: UserRole
  permissions?: UserPermissions
  id?: string
}

export interface AuthenticationStoreValue {
  isInitialized: boolean
  isAuthenticated: boolean
  user: AuthenticatedUser | null
  remember: boolean
  refetchSession: () => void
  saveRefreshToken: (nextValue: string) => void
  login: (payload: LoginPayload) => void
  logout: () => void
  lastActiveTime: string
}

type SetState = StoreApi<AuthenticationStoreValue>['setState']
type GetState = StoreApi<AuthenticationStoreValue>['getState']

const logout = (set: SetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    state.isAuthenticated = false
    state.isInitialized = true
    state.user = null
    state.lastActiveTime = dayjs().format(ISO8601DateTimeFormat)

    clearAxiosAuthorizationHeader()
    clearRefreshInterceptorInstanceAuthorizationHeader()
    void queryClient.resetQueries()
  })
  set(nextValue)
}

const saveAccessToken = (newAccessToken: string) => (set: SetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    if (!state.user) return
    state.user.accessToken = newAccessToken
  })
  set(nextValue)
}

interface LoginPayload extends Omit<AuthenticatedUser, 'permissions'> {
  remember: boolean
}

const login = (payload: LoginPayload) => (set: SetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    state.isAuthenticated = true
    state.isInitialized = true

    if (!payload.role) return
    applyAxiosAuthorizationHeader(payload.accessToken!)
    assign(state, {
      lastActiveTime: dayjs().format(ISO8601DateTimeFormat),
      user: {
        ...payload,
        permissions: _get(permissionsMap, payload.role, permissionsMap.User),
      },
    })
  })

  set(nextValue)
}

const refetchSession = (set: SetState, get: GetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    const value = get()

    const accessToken = value.user?.accessToken

    if (accessToken) {
      applyAxiosAuthorizationHeader(accessToken)
      applyRefreshInterceptorInstanceAuthorizationHeader(accessToken)
    }

    try {
      // const user = await getUser()
      const user = value.user

      state.lastActiveTime = dayjs().format(ISO8601DateTimeFormat)

      if (!value.remember) {
        state.isInitialized = true
        state.isAuthenticated = false

        return
      }

      if (user?.email) {
        state.isAuthenticated = true
      } else {
        logout(set)
      }
      state.isInitialized = true
    } catch (error) {
      logout(set)
    }
  })
  set(nextValue)
}

const defaultAuthenticationStoreValue = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  remember: true,
}

const storeCreator: StateCreator<AuthenticationStoreValue> = (set, get) => ({
  ...defaultAuthenticationStoreValue,
  logout: () => logout(set),
  login: (payload) => login(payload)(set),
  refetchSession: () => refetchSession(set, get),
  saveRefreshToken: (payload) => saveAccessToken(payload)(set),
  lastActiveTime: dayjs().format(ISO8601DateTimeFormat),
})

function getStorage() {
  return createJSONStorage<AuthenticationStoreValue>(() => localStorage)
}

const persistOptions: PersistOptions<AuthenticationStoreValue> = {
  name: localStorageKeys.auth,
  storage: getStorage(),
  partialize: (state) =>
    pick(state, ['user', 'remember']) as AuthenticationStoreValue,
  version: 1.1,
}

const storeCreatorWithPersistance = persist<AuthenticationStoreValue>(
  storeCreator,
  persistOptions,
)

export const useAuthenticationStore = create<AuthenticationStoreValue>()(
  storeCreatorWithPersistance,
)
