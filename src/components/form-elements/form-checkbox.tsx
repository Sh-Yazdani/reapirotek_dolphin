import type {CheckboxProps as MuiCheckboxProps} from '@mui/material'
import {
  Box,
  Checkbox as OriginalCheckbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import type {FieldValues, UseControllerProps} from 'react-hook-form'
import {useController} from 'react-hook-form'

interface FormCheckboxProps
  extends UseControllerProps<FieldValues, string>,
    Omit<MuiCheckboxProps, 'defaultValue' | 'name'> {
  label?: string
  hasErrorMessageLabel?: boolean
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  hasErrorMessageLabel = true,
  label,
  name,
  ...props
}) => {
  const {field, fieldState} = useController({name})

  const errorMesage = fieldState.error?.message?.trim()
  const hasError = Boolean(fieldState.error?.message?.trim())

  const helperText = (
    <Typography color='error.main' variant='body1' noWrap>
      {errorMesage}
    </Typography>
  )
  return (
    <Stack>
      <FormControlLabel
        control={
          <OriginalCheckbox
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            {...props}
          />
        }
        label={label}
      />
      {hasErrorMessageLabel ? (
        <Box mt={-1}>{hasError ? helperText : null}</Box>
      ) : null}
    </Stack>
  )
}
