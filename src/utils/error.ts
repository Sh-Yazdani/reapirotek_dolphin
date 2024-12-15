import {isAxiosError} from 'axios'
import {get} from 'lodash-es'
import type {ArrayValues} from 'type-fest'
import {z} from 'zod'

const ROUTER_CODE = ['PARSE_PARAMS', 'VALIDATE_SEARCH'] as const

interface ErrorDescription {
  title: string
  description: string
}

export const routerCodeMessagesMap: Record<RuoterCode, ErrorDescription> = {
  PARSE_PARAMS: {
    title: 'Invalid url params',
    description: 'Please double check the requested URL',
  },

  VALIDATE_SEARCH: {
    title: 'Invalid search params',
    description: 'Please double check the requested URL',
  },
}

const defaultErrorMessage = {
  title: 500,
  description: 'Something went wrong',
}

export type RuoterCode = ArrayValues<typeof ROUTER_CODE>

const isRouterError = (error: unknown) => {
  return z
    .object({
      routerCode: z.enum(ROUTER_CODE),
    })
    .safeParse(error).success
}

export const routerErrorToClientMessage = (error: unknown) => {
  const _error = get(
    routerCodeMessagesMap,
    (error as {routerCode: RuoterCode}).routerCode,
  )

  return get(_error, 'description')
}

export const toClientErrorMessage = (error: unknown) => {
  if (isRouterError(error)) {
    return routerErrorToClientMessage(error)
  }

  if (isAxiosError(error)) {
    return (
      get(error, 'response.data.error.message') ??
      get(error, 'response.data.message') ??
      get(error, 'message')
    )
  }

  if (error instanceof Error) {
    return get(error, 'message')
  }

  return defaultErrorMessage.description
}
