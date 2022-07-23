import { createAction } from 'typesafe-actions'
import { post, comment } from '../../lib/types'

export const CHANGE_FIELD = 'post/CHANGE_FIELD' as const
export const INITIALIZE_FORM = 'post/INITIALIZE_FORM' as const

export const GET_POSTS = 'post/GET_POSTS' as const
export const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS' as const
export const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE' as const

export const GET_POST = 'post/GET_POST' as const
export const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS' as const
export const GET_POST_FAILURE = 'post/GET_POST_FAILURE' as const

export const GET_COMMENTS = 'post/GET_COMMENTS' as const
export const GET_COMMENTS_SUCCESS = 'post/GET_COMMENTS_SUCCESS' as const
export const GET_COMMENTS_FAILURE = 'post/GET_COMMENTS_FAILURE' as const

export const WRITE = 'post/WRITE' as const
export const WRITE_SUCCESS = 'post/WRITE_SUCCESS' as const
export const WRITE_FAILURE = 'post/WRITE_FAILURE' as const

export const UPDATE = 'post/UPDATE' as const
export const UPDATE_SUCCESS = 'post/UPDATE_SUCCESS' as const
export const UPDATE_FAILURE = 'post/UPDATE_FAILURE' as const

export const DELETE_POST = 'post/DELETE' as const
export const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS' as const
export const DELETE_POST_FAILURE = 'post/DELETE_POST_FAILURE' as const

export const ADD_TAG_FIELD = 'post/ADD_TAG_FIELD' as const
export const REMOVE_TAG_FIELD = 'post/REMOVE_TAG_FIELD' as const

export const ADD_COMMENT = 'post/ADD_COMMENT' as const
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS' as const
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE' as const

export const changeField = createAction(CHANGE_FIELD)<{
  key: 'title' | 'content' | 'tags' | 'comment'
  value: string
  id: string
}>()
export const initializeForm = createAction(INITIALIZE_FORM)<void>()

export const getPosts = createAction(GET_POSTS)<void>()
export const getPostsSuccess = createAction(GET_POSTS_SUCCESS)<{
  posts: post[]
}>()
export const getPostsFailure = createAction(GET_POSTS_FAILURE)<any>()

export const getPost = createAction(GET_POST)<number>()
export const getPostSuccess = createAction(GET_POST_SUCCESS)<{
  post: post
}>()
export const getPostFailure = createAction(GET_POST_FAILURE)<any>()

export const getComments = createAction(GET_COMMENTS)<number>()
export const getCommentsSuccess = createAction(GET_COMMENTS_SUCCESS)

export const write = createAction(WRITE)<{
  title: string
  content: string
  tags: {
    tagId: number
    tag: string
  }[]
}>()
export const writeSuccess = createAction(WRITE_SUCCESS)<{
  id: number
}>()
export const writeFailure = createAction(WRITE_FAILURE)<any>()

export const update = createAction(UPDATE)<{
  id: number
  title: string
  content: string
  tags: {
    tagId: number
    tag: string
  }[]
}>()
export const updateSuccess = createAction(UPDATE_SUCCESS)<{
  id: number
}>()
export const updateFailure = createAction(UPDATE_FAILURE)<any>()

export const deletePost = createAction(DELETE_POST)<number>()
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS)<void>()
export const deletePostFailure = createAction(DELETE_POST_FAILURE)<any>()

export const addTagField = createAction(ADD_TAG_FIELD)<number>()
export const removeTagField = createAction(REMOVE_TAG_FIELD)<number>()

export const addComment = createAction(ADD_COMMENT)<{
  postId: number
  comment: string
  parentCommentId: number | null
}>()
export const addCommentSuccess = createAction(ADD_COMMENT_SUCCESS)<void>()
export const addCommentFailure = createAction(ADD_COMMENT_FAILURE)<any>()
