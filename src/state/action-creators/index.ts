import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import airtableFetcher from '../../utils/airtableFetcher'

export const login = (user: string) => {
  return (dispatch: Dispatch<Action>) => {
    const users: any[] = []
    airtableFetcher('Students')
      .select({
        filterByFormula: `{Name} = '${user}'`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            users.push(record.get('Name'))
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }

          if (users.length === 1) {
            dispatch({
              type: ActionType.LOGIN,
              user: users[0],
            })
          }
        }
      )
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
