import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import {
  fetchClasses,
  getStudentsMapper,
  verifyUserAndFetchClassIds,
  mapStudentsInClasses,
} from './utils'

export const login = (user: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const userInfo: { userExists: boolean; classIds?: string[] } =
      await verifyUserAndFetchClassIds(user)

    if (userInfo.userExists && userInfo.classIds) {
      let classes: Course[] = await fetchClasses(userInfo.classIds)
      const studentsMapper = await getStudentsMapper(classes)
      classes = mapStudentsInClasses(classes, studentsMapper)

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
