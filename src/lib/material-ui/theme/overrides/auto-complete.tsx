import type {Components, Theme} from '@mui/material/styles'
import {ArrowDown2} from 'iconsax-react'

import {IconContainer} from '@/components'

export default function AutoComplete(
  theme: Theme,
): Record<'MuiAutocomplete', Components['MuiAutocomplete']> {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        popupIndicator: {
          transition: theme.transitions.create('all'),
        },
      },
      defaultProps: {
        popupIcon: (
          <IconContainer alignSelf='center' component={ArrowDown2} size={20} />
        ),
      },
    },
  }
}
