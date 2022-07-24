import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type State = {
  lines: string[]
  getCodeSuccess: boolean
  getCodeError: any
}

export type Action = ActionType<typeof actions>
