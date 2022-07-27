import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'
import produce from 'immer'

const initialState: State = {
  id: -1,
  user: {
    profileImage: '',
    displayName: '',
    selfInformation: '',
    isFollowing: 0,
    starCount: 0,
  },
  form: {
    displayName: '',
    selfInformation: '',
  },
  posts: null,
  getUserError: null,
  updateSuccess: false,
  updateError: null,
  uploadSuccess: false,
  uploadError: null,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.INITIALIZE]: (state) => ({
    ...state,
    form: initialState['form'],
    updateSuccess: false,
    updateError: null,
    uploadSuccess: false,
    uploadError: null,
  }),
  [actions.CHANGE_FIELD]: (state, { payload: { key, value } }) =>
    produce(state, (draft) => {
      if (draft['user'] !== null) {
        draft['form'][key] = value
      }
    }),
  [actions.UPDATE_SUCCESS]: (state, { payload: id }) => ({
    ...state,
    id: id,
    updateSuccess: true,
    updateError: null,
  }),
  [actions.UPDATE_FAILURE]: (state, { payload: error }) => ({
    ...state,
    id: -1,
    updateSuccess: false,
    updateError: error,
  }),
  [actions.GET_USER_SUCCESS]: (state, { payload: { user, posts } }) => ({
    ...state,
    user,
    posts,
    getUserError: null,
  }),
  [actions.GET_USER_FAILURE]: (state, { payload: error }) => ({
    ...state,
    user: null,
    getUserError: error,
  }),
  [actions.UPLOAD_SUCCESS]: (state) => ({
    ...state,
    uploadSuccess: true,
    uploadError: null,
  }),
  [actions.UPLOAD_FAILURE]: (state, { payload: error }) => ({
    ...state,
    uploadSuccess: false,
    uploadError: error,
  }),
})

export default reducer
