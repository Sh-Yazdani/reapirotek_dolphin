import {useMediaQuery} from '@mui/material'
import type {Theme} from '@mui/system'

export const breakpointSelectors = {
  isLargerThanDesktop(theme: Theme) {
    return theme.breakpoints.up('lg')
  },

  isMobile(theme: Theme) {
    return theme.breakpoints.down('md')
  },

  isDesktop(theme: Theme) {
    return theme.breakpoints.up('lg')
  },

  isTablet(theme: Theme) {
    return theme.breakpoints.between('md', 'lg')
  },

  isSmallerThanDesktop(theme: Theme) {
    return theme.breakpoints.down('lg')
  },
}

export function useBreakpointValues() {
  const isLargerThanDesktop = useMediaQuery<Theme>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    breakpointSelectors.isLargerThanDesktop,
  )
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const isMobile = useMediaQuery<Theme>(breakpointSelectors.isMobile)
  const isSmallerThanDesktop = useMediaQuery<Theme>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    breakpointSelectors.isSmallerThanDesktop,
  )
  const isTablet = useMediaQuery<Theme>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    breakpointSelectors.isTablet,
  )

  const isDesktop = useMediaQuery<Theme>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    breakpointSelectors.isDesktop,
  )
  return {
    isLargerThanDesktop,
    isMobile,
    isSmallerThanDesktop,
    isTablet,
    isDesktop,
  }
}
