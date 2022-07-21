import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'
import produce from 'immer'

const initialState = {
  register: {
    userName: '',
    displayName: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userName: '',
    password: '',
  },
  auth: null,
  authError: null,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      if (key === 'passwordConfirm') {
        draft['register'][key] = value
      } else if (key === 'displayName') {
        draft['register'][key] = value
      } else {
        draft[form][key] = value
      }
    }),
  [actions.INITIALIZE_FORM]: (state, { payload }) => ({
    ...state,
    [payload]: initialState[payload],
  }),
  [actions.REGISTER_SUCCESS]: (state) => ({
    ...state,
    authError: null,
  }),
  [actions.REGISTER_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
  [actions.LOGIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth,
  }),
  [actions.LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
})

export default reducer
