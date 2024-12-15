import {Container, Stack} from '@mui/material'
import type {ReactNode} from 'react'
import React, {Fragment, useRef} from 'react'

import {AppBar, OnlineUsersTriggerButton} from '@/components'
import {useBreakpointValues} from '@/hooks'

import {OnlineUsersSidebar} from './online-users-sidebar'

interface LayoutWithAppBarProps {
  children: ReactNode
  navbar: ReactNode
}

export const LayoutWithAppBar: React.FC<LayoutWithAppBarProps> = ({
  children,
  navbar,
}) => {
  const {isSmallerThanDesktop} = useBreakpointValues()

  // const location = useLocation()

  const containerRef = useRef<HTMLDivElement>(null!)

  /*  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({top: 0})
  }, [location.href]) */
  return (
    <Fragment>
      <AppBar>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          minHeight={{xs: 48, md: 69}}
          spacing={2}
        >
          {navbar}

          {isSmallerThanDesktop ? <OnlineUsersTriggerButton /> : null}
        </Stack>
      </AppBar>

      <Stack
        direction='row'
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          /* Those pixesls are minimum widths of OnlineEmployeesSidebar in different screen sizes */
          sm: '1fr',
          lg: '1fr 276px',
        }}
        height={{
          xs: 'calc(100dvh - 97px)',
          md: 'calc(100dvh - 137px)',
          lg: 'calc(100dvh - 69px)',
        }}
        overflow='hidden'
      >
        <Container
          ref={containerRef}
          component={Stack}
          sx={{
            p: (t) => `${t.spacing(2)} !important`,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </Container>

        <OnlineUsersSidebar />
      </Stack>
    </Fragment>
  )
}
