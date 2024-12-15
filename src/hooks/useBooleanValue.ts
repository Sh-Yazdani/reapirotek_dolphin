import {useState} from 'react'

export function useBoolean(initialState: boolean = false) {
  const [value, setValue] = useState<boolean>(initialState)
  const close = () => setValue(false)
  const open = () => setValue(true)
  const toggle = () => setValue((v) => !v)

  return [value, {close, open, toggle}] as const
}
