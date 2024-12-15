import {produce} from 'immer'
import {noop} from 'lodash-es'
import type {StateCreator, StoreApi} from 'zustand'
import {create} from 'zustand'

type SetState = StoreApi<OnlineUsersSidebarStateValue>['setState']
type GetState = StoreApi<OnlineUsersSidebarStateValue>['getState']

interface OnlineUsersSidebarStateValue {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

const open = (set: SetState) => {
  const nextValue = produce((state: OnlineUsersSidebarStateValue) => {
    state.isOpen = true
  })
  set(nextValue)
}

const close = (set: SetState) => {
  const nextValue = produce((state: OnlineUsersSidebarStateValue) => {
    state.isOpen = false
  })
  set(nextValue)
}

const toggle = (set: SetState, get: GetState) => {
  const nextValue = produce((state: OnlineUsersSidebarStateValue) => {
    state.isOpen = !get().isOpen
  })
  set(nextValue)
}

const defaultOnlineUsersSidebarStateValue: OnlineUsersSidebarStateValue = {
  isOpen: false,
  close: noop,
  open: noop,
  toggle: noop,
}

const storeCreator: StateCreator<OnlineUsersSidebarStateValue> = (
  set,
  get,
) => ({
  ...defaultOnlineUsersSidebarStateValue,
  open: () => open(set),
  close: () => close(set),
  toggle: () => toggle(set, get),
})

export const useOnlineUsersSidebarStore =
  create<OnlineUsersSidebarStateValue>()(storeCreator)
