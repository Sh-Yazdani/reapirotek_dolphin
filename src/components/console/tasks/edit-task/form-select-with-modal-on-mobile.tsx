import type {DialogProps} from '@mui/material'
import {Box, Stack, Typography} from '@mui/material'
import type {ReactNode} from 'react'
import React, {Fragment, useState} from 'react'
import {useController} from 'react-hook-form'

import CheckIcon from '@/assets/icons/check.svg?react'
import type {FormSelectFieldOptions, FormSelectFieldProps} from '@/components'
import {Dialog, FormSelect, ModalContentMenuItem} from '@/components'
import {useBreakpointValues} from '@/hooks'

interface DialogImplProps extends DialogProps {
  label: ReactNode
  options: FormSelectFieldOptions[]
  name: string
  onClose: () => void
}

const DialogImpl: React.FC<DialogImplProps> = ({
  label,
  name,
  onClose,
  open,
  options,
}) => {
  const {field} = useController({name})
  const value = field.value
  return (
    <Dialog open={open} fullScreen onClose={onClose}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontWeight='bold' variant='t1'>
          {label}
        </Typography>
        <Typography fontWeight='bold' variant='t1' onClick={onClose}>
          Done
        </Typography>
      </Stack>

      <Box mt={3}>
        {options.map((option) => {
          const isSelected = value === option.value

          const onSelect = () => {
            field.onChange(option.value)
          }

          return (
            <ModalContentMenuItem
              key={option.value}
              value={option.value}
              onClick={onSelect}
            >
              <Typography
                fontSize={14}
                fontWeight={isSelected ? 'bold' : 'normal'}
              >
                {option.label}
              </Typography>

              {isSelected ? <CheckIcon /> : null}
            </ModalContentMenuItem>
          )
        })}
      </Box>
    </Dialog>
  )
}

type FormSelectWithModalOnMobileProps = FormSelectFieldProps

export const FormSelectWithModalOnMobile: React.FC<
  FormSelectWithModalOnMobileProps
> = ({label, name, options, ...props}) => {
  const {isMobile} = useBreakpointValues()
  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    if (!isMobile) return
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const selectProps = (() => {
    const defaultProps: Partial<FormSelectFieldProps> = {}

    if (isMobile) {
      defaultProps.sx = {
        pointerEvents: 'none',
      }
      defaultProps.open = false
    }

    return defaultProps
  })()

  return (
    <Fragment>
      <Box onClick={open}>
        <FormSelect
          label={label}
          name={name}
          options={options}
          {...selectProps}
          {...(props as Omit<FormSelectFieldProps, 'name' | 'options'>)}
        />
      </Box>
      <DialogImpl
        label={label}
        name={name}
        open={isOpen}
        options={options}
        onClose={close}
      />
    </Fragment>
  )
}
