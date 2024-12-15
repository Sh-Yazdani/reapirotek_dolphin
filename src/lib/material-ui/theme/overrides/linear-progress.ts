import type {Components, Theme} from '@mui/material/styles'

export default function LinearProgress(
  theme: Theme,
): Record<'MuiLinearProgress', Components['MuiLinearProgress']> {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: theme.shape.borderRadius * 5,
        },
        bar: {
          borderRadius: theme.shape.borderRadius * 5,
        },
        colorPrimary: {
          background: theme.palette.background.default,
        },
      },
    },
  }
}
