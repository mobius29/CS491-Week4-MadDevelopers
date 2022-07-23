import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { post, comment } from '../../lib/types'

type writePost = {
  title: string
  content: string
  tags: {
    tagId: number
    tag: string
  }[]
}

export type State = {
  postId: number
  posts: post[] | null
  getPostsError: any
  post: post | null
  write: writePost
  postError: any
  postSuccess: boolean
  update: writePost
  getPostError: any
  comments: comment[] | null
  commentWrite: string
  commentPostError: any
  commentPostSuccess: boolean
}

export type Action = ActionType<typeof actions>
