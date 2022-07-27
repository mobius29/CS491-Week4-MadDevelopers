import { createReducer } from 'typesafe-actions'
import { Action, State } from './types'
import * as actions from './actions'

const initialState: State = {
  lines: [],
  getCodeSuccess: false,
  getCodeError: null,
}

const reducer = createReducer<State, Action>(initialState, {
  [actions.INITIALIZE]: (state) => ({
    lines: [],
    getCodeSuccess: false,
    getCodeError: null,
  }),
  [actions.GET_CODE_SUCCESS]: (state, { payload: { lines } }) => ({
    lines,
    getCodeSuccess: true,
    getCodeError: null,
  }),
  [actions.GET_CODE_FAILURE]: (state, { payload: error }) => ({
    lines: [],
    getCodeSuccess: false,
    getCodeError: error,
  }),
})

export default reducer
