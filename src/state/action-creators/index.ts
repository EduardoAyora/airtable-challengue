import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'

export const login = (user: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN,
      user: user,
    })
  }
}

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  }
}

export const fetchCourses = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_COURSES,
      courses: [],
    })
  }
}
