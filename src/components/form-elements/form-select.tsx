import type {SelectChangeEvent, SelectProps} from '@mui/material'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as OriginalSelect,
  Typography,
} from '@mui/material'
import * as React from 'react'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'

export interface FormSelectFieldOptions {
  label: React.ReactNode | string
  value: string
}

export type FormSelectFieldProps = SelectProps & {
  name: FieldPath<FieldValues>
  options: FormSelectFieldOptions[]
  hasErrorMessageLabel?: boolean
  renderOption?: (option: FormSelectFieldOptions) => React.ReactNode
}

export const FormSelect: React.FC<FormSelectFieldProps> = ({
  hasErrorMessageLabel = true,
  label,
  name,
  options,
  renderOption,
  required,
  ...otherSelectProps
}) => {
  const {field, fieldState} = useController({name})

  const handleChange = (event: SelectChangeEvent) => {
    field.onChange(event.target.value)
  }

  const errorMesage = fieldState.error?.message?.trim()
  const hasError = Boolean(fieldState.error?.message?.trim())

  const helperText = (
    <Typography color='error.main' variant='body1' noWrap>
      • {errorMesage}
    </Typography>
  )

  return (
    <FormControl error={hasError} required={required} fullWidth>
      {label ? (
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      ) : null}

      <OriginalSelect
        label={label}
        value={field.value}
        onBlur={field.onBlur}
        onChange={handleChange}
        {...otherSelectProps}
      >
        {options.map((option) => {
          if (renderOption) {
            return renderOption(option)
          }

          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )
        })}
      </OriginalSelect>

      {hasErrorMessageLabel ? (
        <FormHelperText sx={{height: hasError ? 28 : 16}}>
          {hasError ? helperText : null}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}
