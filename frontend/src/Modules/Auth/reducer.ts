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
  registerSuccess: false,
  login: {
    userName: '',
    password: '',
  },
  id: -1,
  checkIdError: null,
  authError: null,
  user: null,
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
  [actions.CHECK_SUCCESS]: (state, { payload: id }) => ({
    ...state,
    id: id,
    checkIdError: null,
  }),
  [actions.CHECK_FAILURE]: (state, { payload: error }) => ({
    ...state,
    id: -1,
    checkIdError: error,
  }),
  [actions.REGISTER_SUCCESS]: (state) => ({
    ...state,
    authError: null,
    registerSuccess: true,
  }),
  [actions.REGISTER_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
    registerSuccess: false,
  }),
  [actions.LOGIN_SUCCESS]: (state, { payload: { id } }) => ({
    ...state,
    id,
    authError: null,
    checkIdError: null,
  }),
  [actions.LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
  [actions.LOGOUT_SUCCESS]: (state) => ({
    ...state,
    id: -1,
  }),
})

export default reducer
