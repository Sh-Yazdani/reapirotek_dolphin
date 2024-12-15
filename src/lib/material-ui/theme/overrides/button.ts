import {buttonClasses, useMediaQuery} from '@mui/material'
import type {Components, Theme} from '@mui/material/styles'

import {breakpointSelectors} from '@/hooks'

export default function Button(
  theme: Theme,
): Record<'MuiButton', Components['MuiButton']> {
  const isMobile = useMediaQuery(breakpointSelectors.isMobile(theme))

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 2.5,
          [`&.${buttonClasses.disabled}.${buttonClasses.contained}`]: {
            background: theme.palette.primary.light,
            color: theme.palette.common.white,
          },
          whiteSpace: 'nowrap',
        },
        colorPrimary: {
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        containedPrimary: {
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        disabled: {
          color: theme.palette.common.white,
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        size: isMobile ? 'medium' : 'large',
      },
    },
  }
}
