import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import { GET_USER, UPDATE, UPLOAD } from './actions'
import * as userAPI from '../../lib/api/user'

const getUserSaga = createRequestSaga(GET_USER, userAPI.getUser)
const updateUserSaga = createRequestSaga(UPDATE, userAPI.update)
const uploadImageSaga = createRequestSaga(UPLOAD, userAPI.updateFile)

export function* userSaga() {
  yield takeLatest(GET_USER, getUserSaga)
  yield takeLatest(UPDATE, updateUserSaga)
  yield takeLatest(UPLOAD, uploadImageSaga)
}
