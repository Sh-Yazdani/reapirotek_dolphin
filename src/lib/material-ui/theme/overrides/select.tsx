import {selectClasses} from '@mui/material'
import type {Components, Theme} from '@mui/material/styles'
import {ArrowDown2} from 'iconsax-react'

import {IconContainer} from '@/components'

export default function Select(
  theme: Theme,
): Record<'MuiSelect', Components['MuiSelect']> {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          '*': {
            transition: theme.transitions.create('all'),
          },
          [`& .${selectClasses.iconOpen}`]: {
            transform: 'rotate(180deg)',
          },
        },
      },
      defaultProps: {
        IconComponent: (props) => (
          <IconContainer
            {...props}
            alignSelf='center'
            color='common.black'
            component={ArrowDown2}
            marginInlineEnd={0.2}
            mt={-0.3}
            size={20}
          />
        ),
      },
    },
  }
}
