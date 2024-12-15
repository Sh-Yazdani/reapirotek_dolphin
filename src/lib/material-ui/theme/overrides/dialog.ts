import type {Components, Theme} from '@mui/material/styles'

export default function Dialog(
  theme: Theme,
): Record<
  'MuiDialog' | 'MuiDialogContent',
  Components['MuiDialog'] | Components['MuiDialogContent']
> {
  return {
    MuiDialog: {
      styleOverrides: {},
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          // padding: theme.spacing(3),
          [theme.breakpoints.down('md')]: {
            // padding: theme.spacing(2),
          },
        },
      },
    },
  }
}
