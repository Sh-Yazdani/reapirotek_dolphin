import {toggleButtonClasses} from '@mui/material'
import type {Components, Theme} from '@mui/material/styles'

export default function ToggleButtonGroup(
  theme: Theme,
): Record<
  'MuiToggleButton' | 'MuiToggleButtonGroup',
  Components['MuiToggleButton'] | Components['MuiToggleButtonGroup']
> {
  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.common.white,
          borderRadius: theme.shape.borderRadius * 3,
          overflow: 'hidden',
          border: 'none',
          width: '100%',
          justifyContent: 'space-between',
          padding: theme.spacing(1),
          gap: theme.spacing(2),
        },
      },
      defaultProps: {},
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.common.white,
          border: 'none',
          borderRadius: `${theme.shape.borderRadius * 3}px !important`,
          flex: 1,
          height: 34,
          '&:hover': {},

          [`&.${toggleButtonClasses.selected}`]: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover': {
              background: theme.palette.primary.main,
            },
          },
        },
      },
    },
  }
}
