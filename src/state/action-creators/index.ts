import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import { verifyUserExists } from './utils'

export const login = (user: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const userExist: boolean = await verifyUserExists(user)

    if (userExist) {
      dispatch({
        type: ActionType.LOGIN,
        user,
      })
    }
  }
}

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  }
}

export const fetchCourses = () => {
  return async (dispatch: Dispatch<Action>) => {
    // const datos = await fetchTestsData();

    dispatch({
      type: ActionType.FETCH_COURSES,
      courses: [],
    })
  }
}
