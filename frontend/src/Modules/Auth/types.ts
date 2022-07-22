import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  register: {
    userName: string
    displayName: string
    password: string
    passwordConfirm: string
  }
  login: {
    userName: string
    password: string
  }
  id: number
  registerSuccess: boolean
  authError?: any
  user: {
    displayName: string
    selfInformation: string
    profileImage: string
    star: boolean
    starCount: number
  } | null
}

export type Action = ActionType<typeof actions>
