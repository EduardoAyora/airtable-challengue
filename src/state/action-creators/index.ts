import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import { fetchClasses, verifyUserAndFetchClassIds } from './utils'

export const login = (user: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const userInfo: { userExists: boolean; classIds?: string[] } =
      await verifyUserAndFetchClassIds(user)

    if (userInfo.userExists && userInfo.classIds) {
      const classes = await fetchClasses(userInfo.classIds)
      

      dispatch({
        type: ActionType.LOGIN,
        user,
      })

      dispatch({
        type: ActionType.FETCH_COURSES,
        courses: classes,
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
