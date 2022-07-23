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
        tagId: 0,
        tag: '',
      },
    ],
  },
  postId: -1,
  postError: null,
  postSuccess: false,
  posts: null,
  getPostsError: null,
  post: null,
  getPostError: null,
  comments: null,
  commentWrite: '',
  commentPostError: null,
  commentPostSuccess: false,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.CHANGE_FIELD]: (state, { payload: { key, value, id } }) =>
    produce(state, (draft) => {
      if (key === 'tags') {
        const idx = state.write.tags.findIndex(
          (tag) => tag.tagId === parseInt(id)
        )

        draft['write']['tags'][idx]['tag'] = value
      } else if (key !== 'comment') draft['write'][key] = value
      else if (key === 'comment') draft['commentWrite'] = value
    }),
  [actions.INITIALIZE_FORM]: (state) => ({
    ...state,
    write: initialState['write'],
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
  }),
  [actions.UPDATE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
  }),
  [actions.DELETE_POST_SUCCESS]: (state) => ({
    ...state,
    postId: -1,
  }),
  [actions.DELETE_POST_FAILURE]: (state, { payload: error }) => ({
    ...state,
    postError: error,
  }),
  [actions.ADD_TAG_FIELD]: (state, { payload: tagId }) => {
    const newTag = { tagId, tag: '' }
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
