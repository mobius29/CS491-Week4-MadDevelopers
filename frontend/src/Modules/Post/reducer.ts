import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'
import produce from 'immer'

const initialState = {
  write: {
    title: '',
    content: '',
    tags: [
      {
        id: 0,
        tag: '',
      },
    ],
  },
  postId: -1,
  postError: null,
  posts: null,
  getPostsError: null,
  post: null,
  getPostError: null,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.CHANGE_FIELD]: (state, { payload: { key, value, id } }) =>
    produce(state, (draft) => {
      if (key === 'tags') {
        const idx = state.write.tags.findIndex((tag) => tag.id === parseInt(id))

        draft['write']['tags'][idx]['tag'] = value
      } else draft['write'][key] = value
    }),
  [actions.GET_POSTS_SUCCESS]: (state, { payload: { posts } }) => ({
    ...state,
    posts,
  }),
  [actions.GET_POSTS_FAILURE]: (state, { payload: error }) => ({
    ...state,
    getPostsError: error,
  }),
  [actions.GET_POST_SUCCESS]: (state, { payload: { post } }) => ({
    ...state,
    post,
  }),
  [actions.GET_POST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    getPostError: error,
  }),
  [actions.WRITE_SUCCESS]: (state, { payload: id }) => ({
    ...state,
    postId: id,
  }),
  [actions.WRITE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
  }),
  [actions.ADD_TAG_FIELD]: (state, { payload: id }) => {
    const newTag = { id, tag: '' }
    console.log(newTag)
    return {
      ...state,
      write: {
        ...state.write,
        tags: [...state.write.tags, newTag],
      },
    }
  },
  [actions.REMOVE_TAG_FIELD]: (state, { payload: idx }) => ({
    ...state,
    write: {
      ...state.write,
      tags: [
        ...state.write.tags.slice(0, idx),
        ...state.write.tags.slice(idx + 1),
      ],
    },
  }),
})

export default reducer
