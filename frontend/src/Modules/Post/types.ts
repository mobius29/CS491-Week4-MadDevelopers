import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { post, comment } from '../../lib/types'

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
  posts: post[] | null
  getPostsError: any
  post: post | null
  getPostError: any
  comments: comment[] | null
  commentPostError: any
}

export type Action = ActionType<typeof actions>
