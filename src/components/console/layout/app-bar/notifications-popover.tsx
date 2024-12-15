import {
  Badge,
  badgeClasses,
  Box,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import {Notification as NotificationIcon} from 'iconsax-react'
import {some} from 'lodash-es'
import React, {Fragment} from 'react'

import {IconContainer} from '@/components'
import {useMenu} from '@/hooks'

interface NotificationsPopoverProps {
  iconSize: number
}

export interface Notification {
  preview: string
  time: string
  isUnread: boolean
  title: string
}

export const notifications: Notification[] = [
  {
    title: 'Important alert with extra content added to it to check overflow',
    preview: 'Move task to done',
    time: '30 mins ago',
    isUnread: true,
  },
  {
    title: 'Low priority task added',
    preview: 'task done',
    time: '10 mins ago',
    isUnread: true,
  },
  {
    title: 'Important alert',
    preview: 'Move task to done',
    time: '1 day ago',
    isUnread: false,
  },
  {
    title: 'Important alert',
    preview: 'Run out of matrial',
    time: '1 day ago',
    isUnread: false,
  },
]

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
      sx={{opacity: isUnread ? 1 : 0.5}}
      width='100%'
    >
      <Stack direction='row' maxWidth={156} spacing={1}>
        <IconContainer component={NotificationIcon} size={20} />

        <Stack
          flex={1}
          height='100%'
          justifyContent='space-between'
          overflow='hidden'
        >
          <Typography fontWeight='bold' variant='small' noWrap>
            {preview}
          </Typography>

          <Typography
            color='common.black'
            fontSize={10}
            fontWeight='bold'
            maxWidth='100%'
            variant='inherit'
          >
            {time}
          </Typography>
        </Stack>
      </Stack>

      {isUnread ? (
        <Badge
          badgeContent=' '
          color='secondary'
          overlap='rectangular'
          sx={{
            ml: 'auto',

            [`& .${badgeClasses.badge}`]: {
              right: 4,

              color: 'common.white',
              borderRadius: 2.5,
              height: 8,
              width: 8,
            },
          }}
          variant='dot'
        />
      ) : null}
    </Stack>
  )
}

const NotificationsPopoverContent = () => {
  return (
    <Stack spacing={3} sx={{p: 2}} width={255}>
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <Typography color='neutrals.gray' variant='small'>
          Notification
        </Typography>
        <Typography
          className='cursor-pointer'
          color='secondary.main'
          variant='small'
        >
          Mark all as read
        </Typography>
      </Stack>
      <Stack spacing={2}>
        {notifications.map((Notification) => (
          <NotificationBox key={Notification.preview} {...Notification} />
        ))}
      </Stack>

      <Typography
        className='cursor-pointer'
        color='secondary.main'
        fontWeight='bold'
        textAlign='center'
        variant='small'
      >
        See all Notifications
      </Typography>
    </Stack>
  )
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  iconSize,
}) => {
  const {anchorEl, handleClick, handleClose, open} = useMenu()

  const id = open ? 'simple-popover' : undefined

  const hasUnreadMessags = some(notifications, 'isUnread')
  return (
    <Fragment>
      <Box className='cursor-pointer' onClick={handleClick}>
        <Badge
          color='secondary'
          sx={{
            [`& .${badgeClasses.badge}`]: {
              right: 4,
              top: 4,
              display: hasUnreadMessags ? 'normal' : 'none',
            },
          }}
          variant='dot'
        >
          <IconContainer
            color={open ? 'secondary.main' : 'neutrals.gray'}
            component={NotificationIcon}
            size={iconSize}
          />
        </Badge>
      </Box>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 35,
          horizontal: 'right',
        }}
        id={id}
        open={open}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClose={handleClose}
      >
        <NotificationsPopoverContent />
      </Popover>
    </Fragment>
  )
}
