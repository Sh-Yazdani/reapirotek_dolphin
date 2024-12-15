import type {AutocompleteProps} from '@mui/material'
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import {has} from 'lodash-es'
import * as React from 'react'
import type {FieldPath, FieldValues} from 'react-hook-form'
import {useController} from 'react-hook-form'

export interface AutoCompleteOption {
  label: string
  value: string
}

export interface FormAutoCompleteProps
  extends Omit<
    AutocompleteProps<AutoCompleteOption, boolean, boolean, false>,
    'renderInput'
  > {
  label: string
  name: FieldPath<FieldValues>
  options: AutoCompleteOption[]
  required?: boolean
  hasErrorMessageLabel?: boolean
  placeholder?: string
}

export const FormAutoComplete: React.FC<FormAutoCompleteProps> = ({
  hasErrorMessageLabel = true,
  label,
  name,
  onChange,
  options,
  placeholder,
  required,
  ...props
}) => {
  const {field, fieldState} = useController({name})

  const fieldValue = (() => {
    if (props.multiple) {
      return options.filter((option) => field.value.includes(option.value))
    }

    return options.find((item) => field.value === item.value)
  })()
  const errorMesage = fieldState.error?.message?.trim()
  const hasError = Boolean(fieldState.error?.message?.trim())
  const helperText = hasErrorMessageLabel ? (
    <FormHelperText sx={{height: hasError ? 28 : 16}}>
      {hasError ? (
        <Typography color='error.main' mt={-0.7} variant='body1'>
          • {errorMesage}
        </Typography>
      ) : null}
    </FormHelperText>
  ) : null

  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(o, v) => o.value === v.value}
      ListboxProps={{style: {maxHeight: 150}}}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          error={hasError}
          helperText={helperText}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          label={label}
          placeholder={placeholder}
          required={required}
        />
      )}
      renderOption={(_props, option) => {
        /* @ts-ignore CMT */
        const {key, ...optionProps} = _props
        return (
          <Box key={key} component='li' {...optionProps}>
            {option.label}
          </Box>
        )
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index: number) => {
          const {key, ...tagProps} = getTagProps({index})
          return (
            <Chip key={key} label={option.label} size='small' {...tagProps} />
          )
        })
      }
      value={fieldValue}
      autoHighlight
      onBlur={field.onBlur}
      onChange={(event: any, newValue, reason, details) => {
        onChange?.(event, newValue, reason, details)

        if (props.multiple && Array.isArray(newValue)) {
          return field.onChange(newValue.map((v) => v.value))
        }

        if (has(newValue, 'value')) {
          field.onChange(newValue.value)
        }
      }}
      {...props}
    />
  )
}
