import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'
import './Index.css'

export default function Index() {
  const classes: Course[] = useSelector((state: GlobalState) => state.courses)

  const dispatch = useDispatch()
  const { logout } = bindActionCreators(actionCreators, dispatch)

  return (
    <div className='view'>
      <button onClick={logout} className='logout-button'>
        Logout
      </button>
      <div>
        {classes.map(({ name, students }, index) => (
          <div key={index} className='card'>
            <div>
              <p className='card-title'>Name</p>
              <p>{name}</p>
              <p className='card-title'>Students</p>
              <p>
                {students.map(
                  (student, index) =>
                    `${student}${index !== students.length - 1 ? ', ' : ''}`
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
