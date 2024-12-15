import type {BoxProps} from '@mui/material'
import {omit} from 'lodash-es'

import CloseIconSVG from '@/assets/icons/close.svg?react'
import {IconContainer} from '@/components'

export const CloseIcon = (props: BoxProps) => {
  return (
    <IconContainer
      className='cursor-pointer'
      color='common.black'
      component={CloseIconSVG}
      {...(omit(props, 'ref') as any)}
    />
  )
}
