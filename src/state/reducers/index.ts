const initialState: GlobalState = {
  user: null,
  loading: false,
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
        loading: false,
      }
    case ActionType.LOGOUT:
      return {
        user: null,
        courses: [],
        loading: false,
      }
    case ActionType.LOAD:
      return {
        ...state,
        loading: true,
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
