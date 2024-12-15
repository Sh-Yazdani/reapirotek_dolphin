import {
  Avatar,
  Badge,
  badgeClasses,
  Box,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import {Sms} from 'iconsax-react'
import {some} from 'lodash-es'
import React, {Fragment} from 'react'

import {IconContainer} from '@/components'
import {useMenu} from '@/hooks'

interface EmailsPopoverProps {
  iconSize: number
}

interface Email {
  preview: string
  time: string
  isUnread: boolean
}

const emails: Email[] = [
  {
    preview: 'Hi Task Done and Some random contnet here',
    time: '30 mins ago',
    isUnread: true,
  },
  {
    preview: 'Loader need repair',
    time: '1 hour ago',
    isUnread: true,
  },
  {
    preview: 'we need money',
    time: '1 day ago',
    isUnread: false,
  },
]

interface EmailBoxProps extends Email {}

const EmailBox: React.FC<EmailBoxProps> = ({isUnread, preview, time}) => {
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
        <Avatar sx={{height: 36, width: 35}} />

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
            color='neutrals.gray'
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

const EmailsPopoverContent = () => {
  return (
    <Stack spacing={3} sx={{p: 2}} width={249}>
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <Typography color='neutrals.gray' variant='small'>
          Email
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
        {emails.map((email) => (
          <EmailBox key={email.preview} {...email} />
        ))}
      </Stack>

      <Typography
        className='cursor-pointer'
        color='secondary.main'
        fontWeight='bold'
        textAlign='center'
        variant='small'
      >
        See all Emails
      </Typography>
    </Stack>
  )
}

export const EmailsPopover: React.FC<EmailsPopoverProps> = ({iconSize}) => {
  const {anchorEl, handleClick, handleClose, open} = useMenu()

  const id = open ? 'emails-popover' : undefined

  const hasUnreadMessags = some(emails, 'isUnread')
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
            component={Sms}
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
        <EmailsPopoverContent />
      </Popover>
    </Fragment>
  )
}
