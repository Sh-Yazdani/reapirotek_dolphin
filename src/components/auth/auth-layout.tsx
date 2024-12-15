import {Box, Stack} from '@mui/material'
import {Outlet} from '@tanstack/react-router'
import React from 'react'

import LoginIllustration from '@/assets/illustrations/auth.svg?react'
import {useBreakpointValues} from '@/hooks'

export const AuthLayout: React.FC = () => {
  const {isLargerThanDesktop} = useBreakpointValues()
  return (
    <Stack
      alignItems={{md: 'center'}}
      flexDirection='row'
      height='100dvh'
      justifyContent='center'
      overflow='auto'
      position='relative'
      px={{md: 10}}
      py={{xs: 2, md: 3}}
      sx={{
        '&::before': {
          content: "''",
          top: 0,
          left: {xs: '20%', md: '12%'},
          bottom: 0,
          right: 0,
          position: 'fixed',
          bgcolor: 'primary.main',
          zIndex: -1,
          borderTopLeftRadius: (t) => t.shape.borderRadius * 25,
          borderBottomLeftRadius: (t) => t.shape.borderRadius * 25,
        },
      }}
      width='100%'
    >
      <Box
        bgcolor='common.white'
        borderRadius={10}
        boxShadow={(t) => t.shadows[1]}
        height='fit-content'
        mx={{xs: 2, sm: 3}}
        my='auto'
        p={{xs: 2, md: 3}}
        width={{xs: '100%', md: 400}}
        zIndex={1}
      >
        <Stack spacing={{xs: 2, md: 4}}>
          <Outlet />
        </Stack>
      </Box>

      {isLargerThanDesktop ? (
        <Box alignSelf='center' component={LoginIllustration} mx='auto' />
      ) : null}
    </Stack>
  )
}
