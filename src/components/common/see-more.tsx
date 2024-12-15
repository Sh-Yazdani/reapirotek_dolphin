import type {StackProps, TypographyProps} from '@mui/material'
import {Stack, Typography} from '@mui/material'
import {ArrowRight2} from 'iconsax-react'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {IconContainer} from '@/components'

interface SeeMoreProps extends StackProps {
  variant?: TypographyProps['variant']
  fontSize?: number
  iconSize?: number
  caption?: string
  color?: string
}

export const SeeMore: React.FC<SeeMoreProps> = ({
  caption,
  color,
  fontSize,
  iconSize = 16,
  variant = 'small',
  ...props
}) => {
  const {t} = useTranslation('common')
  const _caption = caption ?? t('see-more', {defaultValue: 'See More'})
  return (
    <Stack
      alignItems='center'
      className='cursor-pointer'
      direction='row'
      justifyContent='center'
      spacing={0.5}
      {...props}
    >
      <Typography
        color={color}
        fontSize={fontSize}
        fontWeight='medium'
        variant={variant}
      >
        {_caption}
      </Typography>

      <IconContainer color={color} component={ArrowRight2} size={iconSize} />
    </Stack>
  )
}
