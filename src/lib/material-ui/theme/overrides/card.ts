import type {Components, Theme} from '@mui/material/styles'

export default function Card(
  theme: Theme,
): Record<'MuiCard', Components['MuiCard']> {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 5,
          background: theme.palette.common.white,
          padding: theme.spacing(3),

          [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
          },
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
  }
}
