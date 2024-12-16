import {Box, useTheme, type BoxProps} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {omit} from 'lodash-es'

import DashboardLogoWithoutNameDark from '@/assets/illustrations/logo-dolphin-dark.svg?react'
import DashboardLogoWithoutName from '@/assets/illustrations/logo-dolphin.svg?react'

import {IconContainer} from '@/components'
import {LogoDolphin} from '@/components/common/logoDolphin'
import {LogoDolphinDark} from '@/components/common/logoDolphinDark'

type DashboardLogoProps = BoxProps<'img'> & {
  hasName?: boolean
}

export const DashboardLogo = ({
  hasName = true,
  ...props
}: DashboardLogoProps) => {
  const theme = useTheme() 

  return (
    <Box component={Link} to='/console/dashboard' width={60} display='block'>
      {hasName ? (
        theme.palette.mode === 'light' ? ( 
          <LogoDolphin
            width={70}
            height={40}
            widthShape={70}
            heightShape={30}
            widthText={60}
            heightText={10}
          />
        ) : (
          <LogoDolphinDark
            width={70}
            height={40}
            widthShape={70}
            heightShape={30}
            widthText={60}
            heightText={10}
          />
        )
      ) : (
        theme.palette.mode === 'light' ?
        <IconContainer
          color='common.black'
          component={DashboardLogoWithoutName}
          width={50}
          height={40}
          {...(omit(props, 'ref') as any)}
        />
        :
        <IconContainer
          color='common.black'
          component={DashboardLogoWithoutNameDark}
          width={50}
          height={40}
          {...(omit(props, 'ref') as any)}
        />
      )}
    </Box>
  )
}
