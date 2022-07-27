import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  id: number
  user: {
    profileImage: string
    displayName: string
    selfInformation: string
    isFollowing: number
    starCount: number
  } | null
  getUserError: any
  posts:
    | {
        postId: number
        title: string
        createdAt: number
        commentCount: number
      }[]
    | null
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
