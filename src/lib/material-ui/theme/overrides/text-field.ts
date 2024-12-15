import type {Components, Theme} from '@mui/material/styles'

export default function TextField(
  theme: Theme,
): Record<'MuiTextField', Components['MuiTextField']> {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {
        InputLabelProps: {
          style: {
            color: theme.palette.common.black,
          },
        },
      },
    },
  }
}
