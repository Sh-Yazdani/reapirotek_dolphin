import {Box} from '@mui/material'
import type {TimePickerProps} from '@mui/x-date-pickers'
import {TimePicker} from '@mui/x-date-pickers'
import type {Dayjs} from 'dayjs'
import React from 'react'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'

type FormTimePickerProps = TimePickerProps<Dayjs> & {
  name: FieldPath<FieldValues>
}

export const FormTimePicker: React.FC<FormTimePickerProps> = ({
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
    <TimePicker
      ampm={false}
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
