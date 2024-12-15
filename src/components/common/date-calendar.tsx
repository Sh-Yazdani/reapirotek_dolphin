import {Box, styled} from '@mui/material'
import type {DateCalendarProps as OriginalDateCaledarProps} from '@mui/x-date-pickers/DateCalendar'
import {DateCalendar as OriginalDateCalendar} from '@mui/x-date-pickers/DateCalendar'
import type dayjs from 'dayjs'
import type React from 'react'

const DateCaledarContainer = styled(Box)(({theme}) => ({
  padding: `${theme.spacing(1)}px 0px !important`,
  background: theme.palette.common.white,
  position: 'relative',
  paddingTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 5,
  overflow: 'hidden',

  '&:before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 16,
    width: '100%',
    background: theme.palette.primary.main,
    zIndex: 0,
  },
}))

export const DateCalendar: React.FC<OriginalDateCaledarProps<dayjs.Dayjs>> = ({
  className,
  ...props
}) => {
  return (
    <DateCaledarContainer className={className}>
      <OriginalDateCalendar {...props} />
    </DateCaledarContainer>
  )
}
