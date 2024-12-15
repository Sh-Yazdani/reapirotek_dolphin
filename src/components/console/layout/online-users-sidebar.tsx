import {Avatar, Card, Drawer, Skeleton, Stack, Typography} from '@mui/material'
import dayjs from 'dayjs'
import {range} from 'lodash'
import {noop} from 'lodash-es'
import React, {Suspense} from 'react'
import {useTranslation} from 'react-i18next'
import {useShallow} from 'zustand/react/shallow'

import Profile1 from '@/assets/images/profiles/profile-1.jpg'
import Profile2 from '@/assets/images/profiles/profile-2.jpg'
import Profile4 from '@/assets/images/profiles/profile-4.jpg'
import Profile5 from '@/assets/images/profiles/profile-5.jpg'
import Profile6 from '@/assets/images/profiles/profile-6.jpg'
import Profile7 from '@/assets/images/profiles/profile-7.jpg'
import Profile8 from '@/assets/images/profiles/profile-8.jpg'
import {CloseIcon, SeeMore} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {useGetAllUsersSuspense} from '@/lib/data-provider/api/__generated'
import {useOnlineUsersSidebarStore} from '@/store/online-users-sidebar'

interface User {
  name: string
  lastOnline: string
  src: string
}

const profileImages = [
  Profile1,
  Profile2,
  Profile4,
  Profile5,
  Profile6,
  Profile7,
  Profile8,
]

interface UserBoxProps extends User {}

const UserBox: React.FC<UserBoxProps> = ({lastOnline, name, src}) => {
  const avatarSize = {xs: 40, sm: 44, md: 50}
  return (
    <Stack
      alignItems='center'
      direction='row'
      flexShrink={0}
      spacing={{xs: 2, sm: 1.5}}
    >
      <Avatar
        src={src}
        sx={{
          height: avatarSize,
          width: avatarSize,
          flexShrink: 0,
        }}
      />

      <Stack spacing={0.2}>
        <Typography fontWeight='bold' variant='body1'>
          {name}
        </Typography>

        <Typography color='neutrals.gray' fontSize={13} variant='inherit'>
          {lastOnline}
        </Typography>
      </Stack>
    </Stack>
  )
}

const UserBoxSkeleton: React.FC = () => {
  const avatarSize = {xs: 40, sm: 44, md: 50}
  return (
    <Stack
      alignItems='center'
      direction='row'
      flexShrink={0}
      spacing={{xs: 2, sm: 1.5}}
    >
      <Skeleton
        sx={{
          height: avatarSize,
          width: avatarSize,
          flexShrink: 0,
        }}
        variant='circular'
      />

      <Stack spacing={0.2}>
        <Skeleton height={19.5} variant='rectangular' width={100} />
        <Skeleton height={19.5} variant='rectangular' width={120} />
      </Stack>
    </Stack>
  )
}

interface OnlineUsersProps {
  onClose: () => void
}

function getLastOnlineString(lastOnlineTimestamp: string) {
  // Ensure the input is a valid Day.js object
  const lastOnlineDate = dayjs(lastOnlineTimestamp)

  // Check if the timestamp is valid
  if (lastOnlineDate.isValid()) {
    return lastOnlineDate.fromNow() // e.g., "2 hours ago", "5 minutes ago"
  } else {
    return 'Invalid timestamp' // Handle invalid timestamps gracefully
  }
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({onClose = noop}) => {
  const {isSmallerThanDesktop} = useBreakpointValues()
  const {t} = useTranslation('employees')
  const {data: employees} = useGetAllUsersSuspense()
  return (
    <Stack
      component={Card}
      flexShrink={0}
      height='100%'
      overflow='auto'
      sx={{
        borderRadius: '0',
        borderLeft: (theme) => `1px solid ${theme.palette.neutrals?.line}`,
        '*': {
          userSelect: 'none',
        },
      }}
    >
      {isSmallerThanDesktop ? <CloseIcon onClick={onClose} /> : null}

      <Stack mt={{xs: 2, lg: 0}} spacing={2}>
        <Typography fontWeight='bold' variant='t2'>
          {t('online-employees-sidebar.cta', {defaultValue: 'Online Users'})}
        </Typography>

        <Stack spacing={2}>
          {employees.slice(5, 9).map((employee, index) => {
            return (
              <UserBox
                key={employee.firstName}
                /* @ts-ignore TODO -> fix this swagger issue */
                lastOnline={getLastOnlineString(employee.createdAt)}
                name={`${employee.firstName} ${employee.lastName}`}
                src={profileImages[index]}
              />
            )
          })}
        </Stack>
      </Stack>

      <SeeMore
        color='primary.main'
        sx={{
          mt: 'auto',
          fontWeight: 'medium',
          fontSize: 15,
          pt: 3,
        }}
        variant='inherit'
      />
    </Stack>
  )
}

const OnlineUsersSkeleton = () => {
  const {isSmallerThanDesktop} = useBreakpointValues()
  return (
    <Stack
      bgcolor='common.white'
      component={Card}
      flexShrink={0}
      height='100%'
      overflow='auto'
      sx={{
        borderRadius: '0',
        borderLeft: (theme) => `1px solid ${theme.palette.neutrals?.line}`,
        '*': {
          userSelect: 'none',
        },
      }}
      width='100%'
    >
      {isSmallerThanDesktop ? (
        <Skeleton height={24} variant='rectangular' width={24} />
      ) : null}
      <Stack mt={{xs: 2, lg: 0}} spacing={2}>
        <Skeleton height={22.63} variant='rectangular' width={120} />

        <Stack spacing={2}>
          {range(0, 4).map((_, index) => {
            return <UserBoxSkeleton key={index} />
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const OnlineUsersSidebar: React.FC = () => {
  const {isSmallerThanDesktop} = useBreakpointValues()
  const {isOpen, onClose} = useOnlineUsersSidebarStore(
    useShallow((s) => ({
      isOpen: s.isOpen,
      onClose: s.close,
    })),
  )

  // eslint-disable-next-line react/no-unstable-nested-components
  const OnlineUsersWithSuspense = () => {
    return (
      <Suspense fallback={<OnlineUsersSkeleton />}>
        <OnlineUsers onClose={onClose} />
      </Suspense>
    )
  }

  if (isSmallerThanDesktop) {
    return (
      <Drawer
        anchor='right'
        open={isOpen}
        PaperProps={{
          sx: {width: 280, alignItems: 'stretch'},
        }}
        onClose={onClose}
      >
        <OnlineUsersWithSuspense />
      </Drawer>
    )
  }

  return <OnlineUsersWithSuspense />
}
