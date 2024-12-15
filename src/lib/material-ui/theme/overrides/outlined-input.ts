import {
  chipClasses,
  inputBaseClasses,
  inputLabelClasses,
  outlinedInputClasses,
} from '@mui/material'
import type {Components, Theme} from '@mui/material/styles'

export default function OutlinedInput(
  theme: Theme,
): Record<
  'MuiInputLabel' | 'MuiOutlinedInput',
  Components['MuiInputLabel'] | Components['MuiOutlinedInput']
> {
  const borderRadius = `${theme.shape.borderRadius * 5}px !important`
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: 0,
        },

        outlined: {
          lineHeight: 1,
          [`&.${inputLabelClasses.outlined}`]: {
            transform: 'translate(14px, 14px) scale(1)',
          },

          [`&.${inputLabelClasses.shrink}`]: {
            transform: 'translate(14px, -8px) scale(0.8)',
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {},
        root: {
          borderRadius,
          color: theme.palette.common.black,
          [`&.${outlinedInputClasses.disabled}`]: {
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[800],
          },

          [`:not(.${outlinedInputClasses.multiline}):not(.${inputBaseClasses.sizeSmall})`]:
            {
              height: 42,
              [`&:has(.${chipClasses.root})`]: {
                height: 'auto',
              },
            },
        },

        notchedOutline: {
          borderColor: theme.palette.background.default,
          borderWidth: 2,
          borderRadius: theme.shape.borderRadius * 5,
        },
      },
    },
  }
}
