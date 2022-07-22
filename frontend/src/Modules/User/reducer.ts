import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'
import produce from 'immer'

const initialState = {
  id: -1,
  user: {
    star: false,
    starCount: 0,
    profileImage: '',
    displayName: '',
    selfInformation: '',
  },
  form: {
    profileImage: '',
    displayName: '',
    selfInformation: '',
  },
  updateSuccess: false,
  updateError: null,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.INITIALIZE]: (state) => ({
    ...state,
    form: initialState['form'],
    updateSuccess: false,
    updateError: null,
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
  [actions.GET_USER_SUCCESS]: (state, { payload: { user } }) => ({
    ...state,
    user: user,
  }),
})

export default reducer
