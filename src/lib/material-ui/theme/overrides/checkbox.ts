import {checkboxClasses} from '@mui/material'
import type {Components, Theme} from '@mui/material/styles'

export default function Checkbox(
  theme: Theme,
): Record<'MuiCheckbox', Components['MuiCheckbox']> {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.common.black,

          [`&.${checkboxClasses.checked}`]: {
            color: theme.palette.common.black,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  }
}
