import { createAction } from 'typesafe-actions'

export const INITIALIZE = 'user/INITIALIZE' as const
export const CHANGE_FIELD = 'user/CHANGE_FIELD' as const

export const GET_USER = 'user/GET_USER' as const
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS' as const
export const GET_USER_FAILURE = 'user/GET_USER_FAILURE' as const

export const UPDATE = 'user/UPDATE' as const
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS' as const
export const UPDATE_FAILURE = 'user/UPDATE_FAILURE' as const

export const initialize = createAction(INITIALIZE)<void>()

export const changeField = createAction(CHANGE_FIELD)<{
  key: 'displayName' | 'selfInformation'
  value: string
}>()

export const getUser = createAction(GET_USER)<number>()
export const getUserSuccess = createAction(GET_USER_SUCCESS)<{
  user: {
    displayName: string
    selfInformation: string
    profileImage: string
    star: boolean
    starCount: number
  }
}>()
export const getUserFailure = createAction(GET_USER_FAILURE)<any>()

export const update = createAction(UPDATE)<{
  id: number
  profileImage: string
  displayName: string
  selfInformation: string
}>()
export const updateSuccess = createAction(UPDATE_SUCCESS)<number>()
export const updateFailure = createAction(UPDATE_FAILURE)<any>()
