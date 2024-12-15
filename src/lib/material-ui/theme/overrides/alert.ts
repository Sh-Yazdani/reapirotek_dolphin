import type {Components, Theme} from '@mui/material/styles'

export default function Alert(
  theme: Theme,
): Record<'MuiAlert', Components['MuiAlert']> {
  return {
    MuiAlert: {
      styleOverrides: {
        action: {
          padding: 0,
        },
      },
    },
  }
}
