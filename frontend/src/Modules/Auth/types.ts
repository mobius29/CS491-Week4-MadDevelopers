import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  register: {
    userName: string
    displayName: string
    password: string
    passwordConfirm: string
  }
  registerSuccess: boolean

  login: {
    userName: string
    password: string
  }

  id: number
  checkIdError?: any

  authError?: any
}

export type Action = ActionType<typeof actions>
