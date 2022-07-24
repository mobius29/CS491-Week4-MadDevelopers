import { createAction } from 'typesafe-actions'

export const INITIALIZE = 'type/INITIALIZE' as const

export const GET_CODE = 'type/GET_CODE' as const
export const GET_CODE_SUCCESS = 'type/GET_CODE_SUCCESS' as const
export const GET_CODE_FAILURE = 'type/GET_CODE_FAILURE' as const

export const initialize = createAction(INITIALIZE)<void>()

export const getCode = createAction(GET_CODE)<string>()
export const getCodeSuccess = createAction(GET_CODE_SUCCESS)<{
  lines: string[]
}>()
export const getCodeFailure = createAction(GET_CODE_FAILURE)<any>()
