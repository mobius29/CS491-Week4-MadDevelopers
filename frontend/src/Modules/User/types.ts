import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  id: number
  user: {
    star: boolean
    starCount: number
    profileImage: string
    displayName: string
    selfInformation: string
  } | null
  form: {
    displayName: string
    selfInformation: string
  }
  updateSuccess: boolean
  updateError: any
  uploadSuccess: boolean
  uploadError: any
}

export type Action = ActionType<typeof actions>
