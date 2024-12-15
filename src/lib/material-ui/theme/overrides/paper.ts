import type {Components, Theme} from '@mui/material/styles'

export default function Paper(
  theme: Theme,
): Record<'MuiPaper', Components['MuiPaper']> {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
        },
      },
      defaultProps: {},
    },
  }
}
