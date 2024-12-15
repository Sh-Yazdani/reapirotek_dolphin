import type {Components, Theme} from '@mui/material/styles'

export default function ButtonBase(
  theme: Theme,
): Record<'MuiButtonBase', Components['MuiButtonBase']> {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  }
}
