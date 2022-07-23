import createRequestSaga from '../../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'
import {
  WRITE,
  GET_POSTS,
  GET_POST,
  UPDATE,
  DELETE_POST,
  ADD_COMMENT,
} from './actions'
import * as postAPI from '../../lib/api/post'

const writeSaga = createRequestSaga(WRITE, postAPI.writePost)
const getPostsSaga = createRequestSaga(GET_POSTS, postAPI.getPosts)
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost)
const updateSaga = createRequestSaga(UPDATE, postAPI.updatePost)
const deleteSaga = createRequestSaga(DELETE_POST, postAPI.deletePost)
const addCommentSaga = createRequestSaga(ADD_COMMENT, postAPI.addComment)

export function* postSaga() {
  yield takeLatest(WRITE, writeSaga)
  yield takeLatest(GET_POSTS, getPostsSaga)
  yield takeLatest(GET_POST, getPostSaga)
  yield takeLatest(UPDATE, updateSaga)
  yield takeLatest(DELETE_POST, deleteSaga)
  yield takeLatest(ADD_COMMENT, addCommentSaga)
}
