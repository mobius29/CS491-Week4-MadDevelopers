import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import { REGISTER, LOGIN, LOGOUT, CHECK, DELETE_USER } from './actions'
import * as authAPI from '../../lib/api/auth'

const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout)
const checkSaga = createRequestSaga(CHECK, authAPI.checkLogin)
const deleteSaga = createRequestSaga(DELETE_USER, authAPI.withdrawal)

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
  yield takeLatest(LOGOUT, logoutSaga)
  yield takeLatest(CHECK, checkSaga)
  yield takeLatest(DELETE_USER, deleteSaga)
}
