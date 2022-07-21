import { call, put } from 'redux-saga/effects'

interface IResponse {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

interface IAction {
  type: string
  payload?: any
}

const createRequestSaga = (type: string, request: any) => {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`

  return function* (action: IAction) {
    try {
      const response: IResponse = yield call(request, action.payload)
      console.log(response)
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      })
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      })
    }
  }
}

export default createRequestSaga
