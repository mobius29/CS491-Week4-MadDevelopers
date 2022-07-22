import { createAction } from 'typesafe-actions'

export const CHANGE_FIELD = 'post/CHANGE_FIELD' as const
export const INITIALIZE_FORM = 'post/INITIALIZE_FORM' as const

export const ADD_TAG_FIELD = 'post/ADD_TAG_FIELD' as const
export const REMOVE_TAG_FIELD = 'post/REMOVE_TAG_FIELD' as const

export const GET_POSTS = 'post/GET_POSTS' as const
export const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS' as const
export const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE' as const

export const WRITE = 'post/WRITE' as const
export const WRITE_SUCCESS = 'post/WRITE_SUCCESS' as const
export const WRITE_FAILURE = 'post/WRITE_FAILURE' as const

export const changeField = createAction(CHANGE_FIELD)<{
  key: 'title' | 'content' | 'tags'
  value: string
  id: string
}>()

export const getPosts = createAction(GET_POSTS)<void>()
export const getPostsSuccess = createAction(GET_POSTS_SUCCESS)<{
  posts: {
    id: number
    title: string
    content: string
    tags: {
      id: number
      tag: string
    }[]
  }[]
}>()
export const getPostsFailure = createAction(GET_POSTS_FAILURE)<any>()

export const addTagField = createAction(ADD_TAG_FIELD)<number>()
export const removeTagField = createAction(REMOVE_TAG_FIELD)<number>()

export const write = createAction(WRITE)<{
  title: string
  content: string
  tags: {
    id: number
    tag: string
  }[]
}>()

export const writeSuccess = createAction(WRITE_SUCCESS)<number>()

export const writeFailure = createAction(WRITE_FAILURE)<any>()
