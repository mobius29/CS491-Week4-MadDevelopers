import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import auth, { authSaga } from './Auth'
import post, { postSaga } from './Post'
import user, { userSaga } from './User'

const rootReducer = combineReducers({
  auth,
  post,
  user,
})

export function* rootSaga() {
  yield all([authSaga(), postSaga(), userSaga()])
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
