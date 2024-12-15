import type {TypographyProps} from '@mui/material'
import {Stack, Typography} from '@mui/material'
import {ArrowLeft2} from 'iconsax-react'
import React from 'react'

export interface BackToLinkProps {
  caption: string
  underline?: boolean
  fontWeight?: string
  variant?: TypographyProps['variant']
  color?: string
}

export const BackToLink: React.FC<BackToLinkProps> = ({
  caption,
  color = 'common.black',
  fontWeight = 'medium',
  underline = true,
  variant = 't2',
}) => {
  return (
    <Stack alignItems='center' alignSelf='center' mx='auto'>
      <Stack
        alignItems='center'
        direction='row'
        display='inline-flex'
        justifyContent='center'
        spacing={1}
      >
        <ArrowLeft2 size={16} />
        <Typography
          color={color}
          fontWeight={fontWeight}
          sx={{textDecoration: underline ? 'underline' : 'normal'}}
          variant={variant}
          noWrap
        >
          {caption}
        </Typography>
      </Stack>
    </Stack>
  )
}
