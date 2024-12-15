import {createContext, useContext} from 'react'
import type {StateCreator, StoreApi} from 'zustand'
import {createStore, useStore} from 'zustand'

import type {TaskType} from '@/components'

type SetState = StoreApi<TasksBoardStateValue>['setState']
type GetState = StoreApi<TasksBoardStateValue>['getState']

interface TasksBoardStateValue {
  type: TaskType
}

const createStoreWithInitialState =
  (initialValues: TasksBoardStateValue): StateCreator<TasksBoardStateValue> =>
  (set, get) =>
    initialValues

export const TasksContext = createContext<StoreApi<TasksBoardStateValue>>(
  undefined!,
)

export const createTasksBoardStore = (initialState: TasksBoardStateValue) =>
  createStore<TasksBoardStateValue>()(createStoreWithInitialState(initialState))

type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

export function useTasksBoardState<U>(
  selector: (state: ExtractState<StoreApi<TasksBoardStateValue>>) => U,
): U {
  const store = useContext(TasksContext)
  return useStore(store, selector)
}
