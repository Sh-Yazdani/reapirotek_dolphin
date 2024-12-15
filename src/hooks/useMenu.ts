import {useCallback, useState} from 'react'

type Element = HTMLElement | SVGSVGElement

export interface UseMenuHookReturnType {
  anchorEl: Element | null
  open: boolean
  handleClick: (event: React.MouseEvent<Element>) => void
  handleClose: (event?: any) => void
}

export function useMenu(): UseMenuHookReturnType {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback((e?: any) => {
    e?.stopPropagation()
    setAnchorEl(null)
  }, [])

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
  }
}
