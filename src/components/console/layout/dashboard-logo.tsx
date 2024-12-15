import type {BoxProps} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {omit} from 'lodash-es'

import DashboardLogoIllustration from '@/assets/illustrations/dashboard-logo.svg?react'
import DashboardLogoWithoutName from '@/assets/illustrations/dashboard-logo-without-name.svg?react'
import {IconContainer} from '@/components'

type DashboardLogoProps = BoxProps<'img'> & {
  hasName?: boolean
}

export const DashboardLogo = ({
  hasName = true,
  ...props
}: DashboardLogoProps) => {
  return (
    <Link to='/console/dashboard'>
      <IconContainer
        color='common.black'
        component={
          hasName ? DashboardLogoIllustration : DashboardLogoWithoutName
        }
        display='block'
        {...(omit(props, 'ref') as any)}
      />
    </Link>
  )
}
