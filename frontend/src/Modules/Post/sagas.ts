import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import { WRITE, GET_POSTS, GET_POST } from './actions'
import * as postAPI from '../../lib/api/post'

const writeSaga = createRequestSaga(WRITE, postAPI.writePost)
const getPostsSaga = createRequestSaga(GET_POSTS, postAPI.getPosts)
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost)

export function* postSaga() {
  yield takeLatest(WRITE, writeSaga)
  yield takeLatest(GET_POSTS, getPostsSaga)
  yield takeLatest(GET_POST, getPostSaga)
}
