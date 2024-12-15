import {Box, Stack, Typography} from '@mui/material'
import {Notification as NotificationIcon} from 'iconsax-react'
import React, {Fragment} from 'react'

import {IconContainer} from '@/components'
import type {Notification} from '@/components/console/layout/app-bar/notifications-popover'

interface NotificationBoxProps extends Notification {}

export const NotificationBox: React.FC<NotificationBoxProps> = ({
  isUnread,
  preview,
  time,
  title,
}) => {
  return (
    <Stack
      alignItems='center'
      className='cursor-pointer'
      direction='row'
      gap={1}
      height={36}
      overflow='hidden'
      sx={{
        opacity: isUnread ? 1 : 0.5,
        '&:not(:last-of-type)': {
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: 'neutrals.line',
        },
      }}
      width='100%'
    >
      <Stack
        direction='row'
        flexShrink={1}
        overflow='hidden'
        spacing={1}
        width='100%'
      >
        <IconContainer component={NotificationIcon} />

        <Box flex={1} overflow='hidden' width='100%'>
          <Typography fontSize={12} fontWeight='medium' width='100%' noWrap>
            {title}
          </Typography>

          <Typography color='common.black' maxWidth='100%' variant='small'>
            {preview}
          </Typography>
        </Box>
      </Stack>

      <Typography flexShrink={0} variant='small' noWrap>
        {time}
      </Typography>
    </Stack>
  )
}

interface NotificationsProps {
  notifications: Notification[]
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
}) => {
  return (
    <Fragment>
      {notifications.map((notification, index) => {
        return (
          <Box
            key={index}
            pb={2}
            sx={{
              '&:not(:last-of-type)': {
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor: 'neutrals.line',
              },
              '&:not(:first-of-type)': {
                pt: 2,
              },
            }}
          >
            <NotificationBox {...notification} />
          </Box>
        )
      })}
    </Fragment>
  )
}
