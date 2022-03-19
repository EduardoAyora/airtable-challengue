import { ActionType } from '../action-types/index'

interface LoginAction {
  type: ActionType.LOGIN
  user: string
}

interface LoadAction {
  type: ActionType.LOAD
}

interface LogoutAction {
  type: ActionType.LOGOUT
}

interface FetchCoursesAction {
  type: ActionType.FETCH_COURSES
  courses: Course[]
}

export type Action =
  | LoginAction
  | LogoutAction
  | FetchCoursesAction
  | LoadAction
