import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import { GET_CODE } from './actions'
import * as typeAPI from '../../lib/api/type'

const getCodeSaga = createRequestSaga(GET_CODE, typeAPI.getCodes)

export function* codeSaga() {
  yield takeLatest(GET_CODE, getCodeSaga)
}
