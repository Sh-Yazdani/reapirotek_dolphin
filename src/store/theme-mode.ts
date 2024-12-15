import type {PaletteMode} from '@mui/material'
import {produce} from 'immer'
import {noop} from 'lodash-es'
import type {StateCreator, StoreApi} from 'zustand'
import {create} from 'zustand'
import type {PersistOptions} from 'zustand/middleware'
import {createJSONStorage, persist} from 'zustand/middleware'

import {localStorageKeys} from '@/config/constants'

type SetState = StoreApi<ThemeModeStoreValue>['setState']
type GetState = StoreApi<ThemeModeStoreValue>['getState']

interface ThemeModeStoreValue {
  mode: PaletteMode
  setTheme: (nextValue: PaletteMode) => void
  toggleTheme: () => void
}

const setTheme = (theme: PaletteMode) => (set: SetState) => {
  const nextValue = produce((state: ThemeModeStoreValue) => {
    state.mode = theme
  })
  set(nextValue)
}

const toggleTheme = (set: SetState, get: GetState) => {
  const currentState = get()
  const nextMode = currentState.mode === 'light' ? 'dark' : 'light'
  setTheme(nextMode)(set)
}

const getPreferredColorScheme = (): PaletteMode => {
  try {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return isDark ? 'dark' : 'light'
  } catch (error) {
    return 'light'
  }
}

const defaultThemeStoreValue: ThemeModeStoreValue = {
  mode: getPreferredColorScheme(),
  setTheme: noop,
  toggleTheme: noop,
}

const storeCreator: StateCreator<ThemeModeStoreValue> = (set, get) => ({
  ...defaultThemeStoreValue,
  setTheme: (newValue) => setTheme(newValue)(set),
  toggleTheme: () => toggleTheme(set, get),
})

const persistOptions: PersistOptions<ThemeModeStoreValue> = {
  name: localStorageKeys.theme,
  storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
  partialize: (state) => state,
  version: 1.1,
}

const storeCreatorWithPersistance = persist<ThemeModeStoreValue>(
  storeCreator,
  persistOptions,
)

export const useThemeModeStore = create<ThemeModeStoreValue>()(
  storeCreatorWithPersistance,
)

const listen = () => {
  try {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        useThemeModeStore.setState({mode: event.matches ? 'dark' : 'light'})
      })
  } catch (error) {
    /*  */
  }
}

listen()
