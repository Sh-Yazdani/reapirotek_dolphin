import type {Components, Theme} from '@mui/material/styles'

export default function Divider(
  theme: Theme,
): Record<'MuiDivider', Components['MuiDivider']> {
  return {
    MuiDivider: {
      defaultProps: {
        sx: {
          padding: '0 !important',
          margin: '0 !important',
          background: theme.palette.neutrals?.line,
        },
      },
    },
  }
}
