import type {Components, Theme} from '@mui/material/styles'

export default function MenuItem(
  theme: Theme,
): Record<'MuiMenuItem', Components['MuiMenuItem']> {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        selected: {
          background: 'inherit',
        },
      },
      defaultProps: {
        dense: true,
      },
    },
  }
}
