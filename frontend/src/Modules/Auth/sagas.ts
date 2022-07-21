import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import { REGISTER, LOGIN } from './actions'
import * as authAPI from '../../lib/api/auth'

const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
}
