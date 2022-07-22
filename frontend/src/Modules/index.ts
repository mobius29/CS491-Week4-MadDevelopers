import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import auth, { authSaga } from './Auth'
import post, { postSaga } from './Post'

const rootReducer = combineReducers({
  auth,
  post,
})

export function* rootSaga() {
  yield all([authSaga(), postSaga()])
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
