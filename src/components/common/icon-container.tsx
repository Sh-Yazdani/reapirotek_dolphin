import type {BoxProps} from '@mui/material'
import {Box} from '@mui/material'
import {clsx} from 'clsx'
import type {IconProps} from 'iconsax-react'
import type {Ref} from 'react'
import React from 'react'

const IconContainerImpl = <T extends React.FunctionComponent<any>>(
  {className, ...props}: BoxProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  return <Box ref={ref} className={clsx(className, 'shrink-0')} {...props} />
}

export const IconContainer = React.forwardRef(
  IconContainerImpl,
) as React.ForwardRefExoticComponent<
  Omit<BoxProps<React.FunctionComponent<IconProps>>, 'ref'> &
    React.RefAttributes<IconProps>
>
