import {Box, Card, Stack, Typography} from '@mui/material'
import type {ReactNode} from 'react'
import React, {useState} from 'react'
import Scan from 'src/assets/icons/scan.svg?react'

import {CloseIcon, Dialog, IconContainer} from '@/components'

interface ChartWrapperProps {
  children: ReactNode
  title: string
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  title,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Card sx={{width: '100%', height: 320, p: 1}}>
      <Stack height='100%' spacing={1}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <Typography fontWeight='bold' variant='t1'>
            {title}
          </Typography>

          <IconContainer>
            <Box
              className='cursor-pointer'
              component={Scan}
              height={16}
              width={16}
              onClick={() => setOpen(true)}
            />
          </IconContainer>
        </Stack>

        <Box flex={1} height='100%'>
          {children}
        </Box>
      </Stack>

      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <Stack direction='row' justifyContent='space-between' mb={3}>
          <Typography fontWeight='bold' variant='t1'>
            {title}
          </Typography>

          <CloseIcon onClick={() => setOpen(false)} />
        </Stack>

        <Box
          minHeight='calc(100% - calc(28.5px + 16px * 2))'
          minWidth='calc(100% - 400px)'
        >
          {children}
        </Box>
      </Dialog>
    </Card>
  )
}
