import {Box} from '@mui/material'
import {Outlet} from '@tanstack/react-router'
import React from 'react'

import {LayoutWithAppBar} from '@/components'

export const CrewTimeCardLayout: React.FC = () => {
  return (
    <LayoutWithAppBar navbar={<Box />}>
      <Outlet />
    </LayoutWithAppBar>
  )
}
