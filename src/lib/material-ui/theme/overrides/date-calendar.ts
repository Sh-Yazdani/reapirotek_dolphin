import type {Theme} from '@mui/material/styles'
import {
  dayCalendarClasses,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
} from '@mui/x-date-pickers'

export default function DateCalendar(theme: Theme) {
  return {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          width: '100%',
          height: 300,
          padding: `0 ${theme.spacing(2)}`,
          [`& .${pickersDayClasses.today}`]: {
            borderColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.primary.main,
          },
          [`& .${pickersDayClasses.selected}`]: {
            color: `${theme.palette.common.white} !important`,
          },
          [`& .${pickersDayClasses.root}`]: {
            height: 32,
            width: 32,
          },
          [`& .${dayCalendarClasses.weekDayLabel}`]: {
            height: 32,
            width: 32,
          },
          [`& .${dayCalendarClasses.header}`]: {
            // background: 'red',
            justifyContent: 'space-between',
          },
          [`& .${dayCalendarClasses.weekContainer}`]: {
            // background: 'blue',
            justifyContent: 'space-between',
          },
          [`& .${pickersCalendarHeaderClasses.labelContainer}`]: {
            // margin: 0,
          },
          [`& .${pickersCalendarHeaderClasses.root}`]: {
            justifyContent: 'space-between',
            // background: 'red',
            padding: 0,
          },
        },
      },
    },
  }
}
