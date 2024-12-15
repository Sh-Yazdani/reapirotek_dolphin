import {Box} from '@mui/material'
import type {DateTimePickerProps} from '@mui/x-date-pickers'
import {DateTimePicker as OriginalDateTimePicker} from '@mui/x-date-pickers'
import type {Dayjs} from 'dayjs'
import React from 'react'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'

export type FormDateTimePicker = DateTimePickerProps<Dayjs> & {
  name: FieldPath<FieldValues>
}

export const FormDateTimePicker: React.FC<FormDateTimePicker> = ({
  name,
  onChange,
  value,
  ...props
}) => {
  const {
    field,
    fieldState: {error},
  } = useController({name})
  const hasError = Boolean(error?.message?.trim())
  const helperText = error?.message?.trim()
  return (
    <OriginalDateTimePicker
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: hasError,
          helperText: <Box height={hasError ? 28 : 16}>{helperText}</Box>,
        },
      }}
      value={field.value}
      onChange={(date, context) => {
        field.onChange(date)
        onChange?.(date, context)
      }}
      {...props}
    />
  )
}
