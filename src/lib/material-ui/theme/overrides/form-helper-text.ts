import type {Components, Theme} from '@mui/material/styles'

export default function FormHelperText(
  theme: Theme,
): Record<'MuiFormHelperText', Components['MuiFormHelperText']> {
  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginInlineStart: 0,
          minHeight: 20,
        },
      },
    },
  }
}
