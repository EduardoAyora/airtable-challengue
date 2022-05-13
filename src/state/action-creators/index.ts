import { Dispatch } from 'redux'
import { ActionType, Action } from './types'

import {
  fetchClasses,
  getStudentsMapper,
  verifyUserAndFetchClassIds,
  mapStudentsInClasses,
} from './utils'

export const login = (user: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOAD,
    })

    const userInfo: { userExists: boolean; classIds?: string[] } =
      await verifyUserAndFetchClassIds(user)

    if (userInfo.userExists && userInfo.classIds) {
      const classes: Course[] = await fetchClasses(userInfo.classIds)
      const studentsMapper = await getStudentsMapper(classes)
      const mappedClasses = mapStudentsInClasses(classes, studentsMapper)

      dispatch({
        type: ActionType.LOGIN,
        user,
      })

      dispatch({
        type: ActionType.FETCH_COURSES,
        courses: mappedClasses,
      })
    } else {
      dispatch({
        type: ActionType.LOGOUT,
      })
    }
  }
}

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  }
}
