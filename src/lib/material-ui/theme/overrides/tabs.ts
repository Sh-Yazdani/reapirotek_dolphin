import type {Components, Theme} from '@mui/material/styles'

export default function Tabs(
  theme: Theme,
): Record<'MuiTabs', Components['MuiTabs']> {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {},
        indicator: {
          height: 4,
          borderTopLeftRadius: theme.shape.borderRadius * 5,
          borderTopRightRadius: theme.shape.borderRadius * 5,
        },
      },
    },
  }
}

export function Tab(theme: Theme): Record<'MuiTab', Components['MuiTab']> {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '25px 0 !important',
          fontSize: `15px !important`,
          fontWeight: theme.typography.fontWeightMedium as number,
          minWidth: 'fit-content',

          [`&:not(:first-of-type)`]: {
            marginLeft: theme.spacing(6),
          },

          [`${theme.breakpoints.down('md')}`]: {
            padding: '14px 0 !important',

            fontSize: `13px !important`,

            [`&:not(:first-of-type)`]: {
              marginLeft: theme.spacing(3),
            },
          },

          [`${theme.breakpoints.down('sm')}`]: {
            [`&:not(:first-of-type)`]: {
              marginLeft: theme.spacing(2),
            },
          },
        },
      },
    },
  }
}
