import type {
  TextFieldProps as OriginalTextFieldProps,
  TypographyProps,
} from '@mui/material'
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField as OriginalTextField,
  Typography,
} from '@mui/material'
import {Eye, EyeSlash} from 'iconsax-react'
import {merge, omit} from 'lodash-es'
import React, {forwardRef, useCallback} from 'react'
import type {UseControllerProps} from 'react-hook-form'
import {useController} from 'react-hook-form'

import {DefaultPendingComponent} from '@/components'

type FieldValues = Record<string, any>

interface CommonProps {
  isLoading?: boolean
  status?: 'error' | 'normal' | 'validating'
  hideDefaultHelperText?: boolean
  labelProps?: TypographyProps
  removeBottomSpacing?: boolean
}

export type FormTextFieldProps = CommonProps &
  OriginalTextFieldProps &
  UseControllerProps<FieldValues, any>

interface State {
  showPassword: boolean
}

interface FormTextFieldRef {}

export const FormTextField = forwardRef<FormTextFieldRef, FormTextFieldProps>(
  // eslint-disable-next-line max-lines-per-function
  (
    {
      hideDefaultHelperText = false,
      label,
      labelProps,
      removeBottomSpacing = false,
      ...props
    }: FormTextFieldProps,
    ref,
  ) => {
    const [values, setValues] = React.useState<State>({
      showPassword: false,
    })

    const {
      control,
      defaultValue,
      isLoading = false,
      name,
      onChange,
      rules,
      shouldUnregister,
      status = 'normal',
      type,
      ...textFieldProps
    } = props

    const {
      field,
      fieldState: {error},
    } = useController({
      name,
      control,
      defaultValue,
      rules,
      shouldUnregister,
      disabled: props.disabled,
    })

    const hasError = Boolean(error?.message?.trim())
    const helperText = (() => {
      if (hideDefaultHelperText) return textFieldProps.helperText

      return hasError ? (
        <Typography color='error.main' mt={0.2} variant='body1'>
          • {error?.message?.trim()}
        </Typography>
      ) : (
        textFieldProps.helperText
      )
    })()

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.preventDefault()
    }

    const handleClickShowPassword = useCallback(
      () =>
        setValues({
          showPassword: !values.showPassword,
        }),
      [values],
    )

    const createStatusProps = (): OriginalTextFieldProps => {
      if (isLoading) {
        return {
          InputProps: {
            endAdornment: <CircularProgress size={20} />,
          },
        }
      }

      if (type === 'password') {
        return {
          type: values.showPassword ? 'text' : 'password',
          InputProps: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  disableRipple
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <EyeSlash /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }
      }

      if (type === 'number') {
        return {
          inputProps: {
            pattern: '[0-9]*(.[0-9]+)?',
          },
          onChange: (event) => {
            const result = event.target.value

            if (/^(-|\+)?(0|[1-9]\d*)?(\.)?(\d+)?$/.exec(result)) {
              /* remove leading zeros */
              field.onChange(result.replace(/^0+(?=\d)/, ''))
            } else {
              return event.preventDefault()
            }
          },
          onWheelCapture: (e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur(),

          onKeyDown(e) {
            if (e.key === 'e') return e.preventDefault()
          },
        }
      }

      switch (status) {
        case 'validating':
          return {
            InputProps: {
              endAdornment: <DefaultPendingComponent />,
              disabled: true,
            },
          }

        case 'error':
          return {
            color: 'error',
          }

        default: {
          return {
            InputProps: textFieldProps.InputProps,
          }
        }
      }
    }

    const InputProps: OriginalTextFieldProps['InputProps'] = merge(
      textFieldProps.InputProps,
    )

    return (
      <Stack>
        <OriginalTextField
          {...omit(field, ['onChange', 'ref'])}
          inputRef={field.ref}
          label={label}
          type={type}
          fullWidth
          // eslint-disable-next-line react/jsx-sort-props
          onChange={(e) => {
            field.onChange(e)
            onChange?.(e)
          }}
          error={hasError}
          // helperText={helperText}
          InputProps={InputProps}
          {...omit(textFieldProps, 'helperText')}
          {...createStatusProps()}
        />

        {!removeBottomSpacing && (
          <Box height={hasError ? 28 : 16}>{helperText}</Box>
        )}
      </Stack>
    )
  },
)
