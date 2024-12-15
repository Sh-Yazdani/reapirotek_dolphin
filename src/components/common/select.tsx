import type {SelectProps as OriginalSelectProps} from '@mui/material'
import {FormControl, MenuItem, Select as OriginalSelect} from '@mui/material'
import React from 'react'

import type {FormSelectFieldOptions} from '@/components'

type SelectProps<T> = OriginalSelectProps<T> & {
  options: FormSelectFieldOptions[]
}

export const Select = <T,>({options, ...props}: SelectProps<T>) => {
  return (
    <FormControl size={props.size} fullWidth>
      <OriginalSelect {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </OriginalSelect>
    </FormControl>
  )
}
