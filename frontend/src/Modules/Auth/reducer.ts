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
  id: -1,
  authError: null,
  registerSuccess: false,
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
  }),
  [actions.CHECK_FAILURE]: (state) => ({
    ...state,
    id: -1,
  }),
  [actions.GET_USER_SUCCESS]: (state, { payload: { user } }) => {
    console.log(user)
    return {
      ...state,
      user: user,
    }
  },
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
  [actions.LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    authError: null,
    id: payload.id,
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
