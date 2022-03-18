import { ActionType } from '../action-types/index'
import { Action } from '../actions'

const initialState: GlobalState = {
  user: null,
  courses: [],
}

const reducer = (
  state: GlobalState = initialState,
  action: Action
): GlobalState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        user: action.user,
      }
    case ActionType.LOGOUT:
      return {
        user: null,
        courses: [],
      }
    case ActionType.FETCH_COURSES:
      return {
        ...state,
        courses: action.courses,
      }
    default:
      return state
  }
}

export default reducer
