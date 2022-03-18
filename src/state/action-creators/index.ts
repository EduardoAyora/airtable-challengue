import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import { fetchClasses, verifyUserAndFetchClassIds } from './utils'

export const login = (user: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const userInfo: { userExists: boolean; classes?: string[] } =
      await verifyUserAndFetchClassIds(user)
    console.log(userInfo)

    if (userInfo.userExists && userInfo.classes) {
      const classes = await fetchClasses(userInfo.classes)
      console.log(classes)

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
