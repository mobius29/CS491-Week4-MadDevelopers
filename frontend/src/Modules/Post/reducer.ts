import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'
import produce from 'immer'

const initialPostState = {
  title: '',
  content: '',
  tags: [
    {
      tagId: 0,
      tag: '',
    },
  ],
}

const initialState = {
  write: initialPostState,
  update: initialPostState,
  postId: -1,
  postError: null,
  postSuccess: false,
  posts: null,
  getPostsError: null,
  post: null,
  getPostError: null,
  updateError: null,
  updateSuccess: false,
  comments: null,
  commentWrite: '',
  commentPostError: null,
  commentPostSuccess: false,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.CHANGE_FIELD]: (state, { payload: { form, key, value, id } }) =>
    produce(state, (draft) => {
      if (form === 'write' || form === 'update') {
        if (key === 'tags') {
          const idx = state[form].tags.findIndex(
            (tag) => tag.tagId === parseInt(id)
          )
          draft[form][key][idx]['tag'] = value
        } else if (key !== 'comment') {
          draft[form][key] = value
        }
      } else {
        draft['commentWrite'] = value
      }
    }),
  [actions.INITIALIZE_FORM]: (state, { payload: { value } }) => ({
    ...state,
    write: value,
    update: value,
    postId: -1,
    postError: null,
    postSuccess: false,
    commentWrite: '',
    commentpostSuccess: false,
  }),
  [actions.GET_POSTS_SUCCESS]: (state, { payload: { posts } }) => ({
    ...state,
    posts,
  }),
  [actions.GET_POSTS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    getPostsError: error,
  }),
  [actions.GET_POST_SUCCESS]: (state, { payload: { post } }) => {
    // console.log(post)
    return {
      ...state,
      post,
    }
  },
  [actions.GET_POST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    getPostError: error,
  }),
  [actions.WRITE_SUCCESS]: (state, { payload: { id } }) => ({
    ...state,
    postId: id,
    postSuccess: true,
  }),
  [actions.WRITE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
    postSuccess: false,
  }),
  [actions.UPDATE_SUCCESS]: (state, { payload: { id } }) => ({
    ...state,
    postId: id,
    postSuccess: true,
  }),
  [actions.UPDATE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
    postSuccess: false,
  }),
  [actions.DELETE_POST_SUCCESS]: (state) => ({
    ...state,
    postId: -1,
  }),
  [actions.DELETE_POST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
  }),
  [actions.ADD_TAG_FIELD]: (state, { payload: { form, tagId } }) => {
    const newTag = { tagId, tag: '' }
    console.log(newTag)
    return {
      ...state,
      [form]: {
        ...state[form],
        tags: [...state[form].tags, newTag],
      },
    }
  },
  [actions.REMOVE_TAG_FIELD]: (state, { payload: { form, idx } }) => ({
    ...state,
    [form]: {
      ...state[form],
      tags: [
        ...state[form].tags.slice(0, idx),
        ...state[form].tags.slice(idx + 1),
      ],
    },
  }),
  [actions.ADD_COMMENT_SUCCESS]: (state) => ({
    ...state,
    commentPostError: null,
    commentPostSuccess: true,
  }),
  [actions.ADD_COMMENT_FAILURE]: (state, { payload: error }) => ({
    ...state,
    commentPostError: error,
    commentPostSuccess: false,
  }),
})

export default reducer
