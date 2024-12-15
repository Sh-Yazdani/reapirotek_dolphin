import {produce} from 'immer'
import {noop} from 'lodash-es'
import type {StateCreator, StoreApi} from 'zustand'
import {create} from 'zustand'

type SetState = StoreApi<SidebarStoreValue>['setState']
type GetState = StoreApi<SidebarStoreValue>['getState']

interface SidebarStoreValue {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

const open = (set: SetState) => {
  const nextValue = produce((state: SidebarStoreValue) => {
    state.isOpen = true
  })
  set(nextValue)
}

const close = (set: SetState) => {
  const nextValue = produce((state: SidebarStoreValue) => {
    state.isOpen = false
  })
  set(nextValue)
}

const toggle = (set: SetState, get: GetState) => {
  const nextValue = produce((state: SidebarStoreValue) => {
    state.isOpen = !get().isOpen
  })
  set(nextValue)
}

const defaultSidebarStoreValue: SidebarStoreValue = {
  isOpen: false,
  close: noop,
  open: noop,
  toggle: noop,
}

const storeCreator: StateCreator<SidebarStoreValue> = (set, get) => ({
  ...defaultSidebarStoreValue,
  open: () => open(set),
  close: () => close(set),
  toggle: () => toggle(set, get),
})

export const useSidebarStore = create<SidebarStoreValue>()(storeCreator)
