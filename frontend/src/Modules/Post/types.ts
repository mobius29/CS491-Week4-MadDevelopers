import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  postId: number
  write: {
    title: string
    content: string
    tags: {
      id: number
      tag: string
    }[]
  }
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
  post: {
    id: number
    title: string
    content: string
    tags: {
      id: number
      tag: string
    }[]
    createdAt: Date
  } | null
  getPostError: any
}

export type Action = ActionType<typeof actions>
