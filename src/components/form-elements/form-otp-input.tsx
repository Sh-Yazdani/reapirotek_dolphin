import type {SxProps, Theme} from '@mui/material'
import {Box, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import React from 'react'
import type {FieldValues, UseControllerProps} from 'react-hook-form'
import {useController, useFormContext} from 'react-hook-form'
import OriginalOtpInput from 'react-otp-input'

import {useBreakpointValues} from '@/hooks'

interface FormOtpInputImplProps
  extends UseControllerProps<FieldValues, string> {}

export const FormOtpInput: React.FC<FormOtpInputImplProps> = (props) => {
  const {field, fieldState} = useController({name: props.name})

  const {isSmallerThanDesktop} = useBreakpointValues()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const inputSize = (() => {
    if (isMobile) return 36
    return isSmallerThanDesktop ? 40 : 42
  })()
  const form = useFormContext()

  const errorMesage = fieldState.error?.message?.trim()
  const hasError = Boolean(fieldState.error?.message?.trim())

  const RenderInput: React.ComponentProps<
    typeof OriginalOtpInput
    // eslint-disable-next-line react/no-unstable-nested-components
  >['renderInput'] = (p, index) => {
    const hasAlreadyFilled = form.watch().code?.length > index
    const theme = useTheme()
    const sx: SxProps = {
      border: 'none !important',
      background: theme.palette.background.default,
      // mr: 0.5,
      fonSize: 20,
      borderRadius: theme.shape.borderRadius * 2,
      color: 'primary.main',
      outline: 2,
      outlineColor: hasAlreadyFilled ? 'primary.main' : 'transparent',

      '&:focus': {
        outlineColor: 'primary.main',
      },

      '*:has(+ input)': {
        outlineColor: 'primary.main',
      },
    }
    return <Box component='input' sx={sx} {...p} />
  }

  return (
    <Stack spacing={1}>
      <OriginalOtpInput
        inputStyle={{
          height: inputSize,
          width: inputSize,
          fontSize: 20,
        }}
        inputType='text'
        numInputs={6}
        renderInput={RenderInput}
        renderSeparator={() => <Box ml={1} />}
        value={field.value}
        shouldAutoFocus
        onChange={(code) => {
          field.onChange(code)
        }}
      />
      {hasError ? (
        <Typography color='error.main' variant='body1'>
          • {errorMesage}
        </Typography>
      ) : null}
    </Stack>
  )
}
