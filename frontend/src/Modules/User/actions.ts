import { createAction } from 'typesafe-actions'

export const INITIALIZE = 'user/INITIALIZE' as const
export const CHANGE_FIELD = 'user/CHANGE_FIELD' as const

export const GET_USER = 'user/GET_USER' as const
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS' as const
export const GET_USER_FAILURE = 'user/GET_USER_FAILURE' as const

export const UPDATE = 'user/UPDATE' as const
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS' as const
export const UPDATE_FAILURE = 'user/UPDATE_FAILURE' as const

export const UPLOAD = 'user/UPLOAD' as const
export const UPLOAD_SUCCESS = 'user/UPLOAD_SUCCESS' as const
export const UPLOAD_FAILURE = 'user/UPLOAD_FAILURE' as const

export const FOLLOW = 'user/FOLLOW' as const
export const FOLLOW_SUCCESS = 'user/FOLLOW_SUCCESS' as const
export const FOLLOW_FAILURE = 'user/FOLLOW_FAILURE' as const

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
    isFollowing: number
    starCount: number
  }
  posts:
    | {
        postId: number
        title: string
        createdAt: number
        commentCount: number
      }[]
    | null
}>()
export const getUserFailure = createAction(GET_USER_FAILURE)<any>()

export const update = createAction(UPDATE)<{
  id: number
  displayName: string
  selfInformation: string
}>()
export const updateSuccess = createAction(UPDATE_SUCCESS)<number>()
export const updateFailure = createAction(UPDATE_FAILURE)<any>()

export const upload = createAction(UPLOAD)<{
  id: number
  file: FormData | null
}>()
export const uploadSuccess = createAction(UPLOAD_SUCCESS)<void>()
export const uploadFailure = createAction(UPLOAD_FAILURE)<any>()

export const follow = createAction(FOLLOW)<number>()
export const followSuccess = createAction(FOLLOW_SUCCESS)<void>()
export const followFailure = createAction(FOLLOW_FAILURE)<any>()
