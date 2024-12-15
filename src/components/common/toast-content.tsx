import {Stack, Typography, useTheme} from '@mui/material'
import type {IconProps} from 'iconsax-react'
import {CloseSquare, InfoCircle, TickSquare, Warning2} from 'iconsax-react'
import {get} from 'lodash-es'
import React from 'react'

type ToastType = 'error' | 'info' | 'success' | 'warning'
interface ToastContentProps {
  type: ToastType
  title: string
  description: string
}

export const ToastContent: React.FC<ToastContentProps> = ({
  description,
  title,
  type,
}) => {
  const accentColor = `${type}.light`
  const theme = useTheme()

  const iconMap: Record<ToastType, React.FC<IconProps>> = {
    error: CloseSquare,
    success: TickSquare,
    info: InfoCircle,
    warning: Warning2,
  }

  const Icon = get(iconMap, type)
  return (
    <Stack
      direction='row'
      fontFamily={theme.typography.fontFamily}
      minHeight={{xs: 64, lg: 91}}
      overflow='hidden'
      sx={{
        boxShadow: theme.shadows[1],
        [theme.breakpoints.between(360, 600)]: {
          width: '100%',
          minWidth: 320,
        },

        [theme.breakpoints.down('xs')]: {
          width: '120px !important',
        },

        [theme.breakpoints.up(600)]: {
          width: 360,
        },
      }}
    >
      <Stack
        alignItems='center'
        bgcolor={accentColor}
        color='white'
        flexShrink={0}
        justifyContent='center'
        minHeight='100%'
        width={69}
      >
        <Icon />
      </Stack>

      <Stack
        bgcolor='common.white'
        color='neutrals.gray'
        direction='column'
        flex={1}
        justifyContent='center'
        minHeight='100%'
        p={2}
        sx={{
          borderBottomWidth: 3,
          borderBottomColor: accentColor,
          borderBottomStyle: 'solid',
        }}
      >
        <Typography fontWeight='bold' variant='t1'>
          {title}
        </Typography>
        <Typography fontWeight='normal' variant='t2'>
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
