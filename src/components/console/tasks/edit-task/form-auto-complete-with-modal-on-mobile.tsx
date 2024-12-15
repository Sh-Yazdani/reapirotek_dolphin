import type {AutocompleteRenderOptionState, DialogProps} from '@mui/material'
import {Box, MenuItem, Stack, styled, Typography} from '@mui/material'
import React, {Fragment, useState} from 'react'
import {useController} from 'react-hook-form'

import CheckIcon from '@/assets/icons/check.svg?react'
import type {AutoCompleteOption, FormAutoCompleteProps} from '@/components'
import {Dialog, FormAutoComplete} from '@/components'
import {useBreakpointValues} from '@/hooks'

interface FormAutoCompleteWithModalOnMobileProps
  extends FormAutoCompleteProps {}

export const ModalContentMenuItem = styled(MenuItem)(({theme}) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.neutrals?.line,
        paddingBottom: theme.spacing(2),
      },
      '&:not(:first-of-type)': {
        paddingTop: theme.spacing(2),
      },
    },
  }
})

interface DialogImplProps extends DialogProps {
  label: string
  options: AutoCompleteOption[]
  name: string
  renderOption: FormAutoCompleteWithModalOnMobileProps['renderOption']
}

const DialogImpl: React.FC<DialogImplProps> = ({
  label,
  name,
  onClose,
  open,
  options,
  renderOption,
}) => {
  const {field} = useController({name})
  const value = field.value

  return (
    <Dialog open={open} fullScreen onClose={onClose}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontWeight='bold' variant='t1'>
          {label}
        </Typography>
        <Typography
          fontWeight='bold'
          variant='t1'
          onClick={() => {
            onClose?.({}, 'backdropClick')
          }}
        >
          Done
        </Typography>
      </Stack>

      <Box mt={3}>
        {options.map((option) => {
          const isSelected = value.includes(option.value)

          const onSelect = () => {
            if (isSelected) {
              field.onChange(
                value.filter((tag: string) => tag !== option.value),
              )
              return
            }

            field.onChange([...value, option.value])
          }

          return (
            <ModalContentMenuItem key={option.label} onClick={onSelect}>
              {renderOption ? (
                renderOption(
                  {},
                  option,
                  {} as AutocompleteRenderOptionState,
                  {} as any,
                )
              ) : (
                <Typography
                  fontSize={14}
                  fontWeight={isSelected ? 'medium' : 'normal'}
                >
                  {option.label}
                </Typography>
              )}

              {isSelected ? <CheckIcon /> : null}
            </ModalContentMenuItem>
          )
        })}
      </Box>
    </Dialog>
  )
}

export const FormAutoCompleteWithModalOnMobile: React.FC<
  FormAutoCompleteWithModalOnMobileProps
> = ({label, name, options, ...props}) => {
  const {isMobile} = useBreakpointValues()
  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    if (!isMobile) return
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const autoCompleteProps = (() => {
    const defaultProps: Partial<FormAutoCompleteProps> = {}

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
        <FormAutoComplete
          label={label}
          name={name}
          options={options}
          disableCloseOnSelect
          multiple
          {...autoCompleteProps}
          {...props}
        />
      </Box>

      <DialogImpl
        label={label}
        name={name}
        open={isOpen}
        options={options}
        renderOption={props.renderOption}
        onClose={onClose}
      />
    </Fragment>
  )
}
