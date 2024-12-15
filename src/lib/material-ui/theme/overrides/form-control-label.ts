import type {Components, Theme} from '@mui/material/styles'

export default function FormControlLabel(
  theme: Theme,
): Record<'MuiFormControlLabel', Components['MuiFormControlLabel']> {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body1,
        },
      },
      defaultProps: {},
    },
  }
}
