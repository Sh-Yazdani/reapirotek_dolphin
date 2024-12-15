import {Container, Stack} from '@mui/material'
import type {ReactNode} from 'react'
import React, {Fragment, useRef} from 'react'

import {AppBar} from '@/components'

interface LayoutWithAppBarProps {
  children: ReactNode
  navbar: ReactNode
}

export const OperatorLayoutWithAppBar: React.FC<LayoutWithAppBarProps> = ({
  children,
  navbar,
}) => {
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <Fragment>
      <AppBar hasEmail={false} hasNotification={false}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          minHeight={{xs: 48, md: 69}}
          spacing={2}
        >
          {navbar}
        </Stack>
      </AppBar>

      <Stack
        direction='row'
        display='grid'
        gridTemplateColumns='1fr'
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
      </Stack>
    </Fragment>
  )
}
