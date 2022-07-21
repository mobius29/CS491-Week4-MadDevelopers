import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import auth, { authSaga } from './Auth'

const rootReducer = combineReducers({
  auth,
})

export function* rootSaga() {
  yield all([authSaga()])
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
