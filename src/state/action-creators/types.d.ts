enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  FETCH_COURSES = 'FETCH_COURSES',
  LOAD = 'LOAD',
}

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

type Action = LoginAction | LogoutAction | FetchCoursesAction | LoadAction
