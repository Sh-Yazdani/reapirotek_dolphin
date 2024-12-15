import type {Theme} from '@mui/material/styles'
import {gridClasses} from '@mui/x-data-grid'

export default function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          [`.${gridClasses.columnHeader},.${gridClasses.filler}`]: {
            background: theme.palette.common.white,
          },
        },
      },
    },
  }
}
