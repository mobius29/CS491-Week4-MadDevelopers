import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  write: {
    title: string
    content: string
    tags: {
      id: number
      tag: string
    }[]
  }
  postId: number
  postError: any
  posts:
    | {
        id: number
        title: string
        content: string
        tags: {
          id: number
          tag: string
        }[]
        createdAt: Date
      }[]
    | null
  getPostsError: any
}

export type Action = ActionType<typeof actions>
