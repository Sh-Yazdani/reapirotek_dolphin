import {Button, Stack, Typography} from '@mui/material'
import type {ErrorRouteComponent} from '@tanstack/react-router'
import {useRouter} from '@tanstack/react-router'
import {useCallback} from 'react'
import {ZodError} from 'zod'

import {toClientErrorMessage} from '@/utils/error'

const isValidtionError = (value: unknown) => value instanceof ZodError

export const DefaultErrorComponent: ErrorRouteComponent = ({
  error,
  reset,
  ...props
}) => {
  const router = useRouter()
  const resetError = useCallback(() => {
    reset()
    if (isValidtionError(error.cause)) return
    void router.invalidate()
  }, [])

  return (
    <Stack alignItems='center' direction='row' gap={2} m={2}>
      <Typography variant='body1'>{toClientErrorMessage(error)}</Typography>
      <Button size='small' variant='contained' onClick={resetError}>
        Retry
      </Button>
    </Stack>
  )
}
