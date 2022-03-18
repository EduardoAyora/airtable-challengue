import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'
import './Login.css'

export default function Login() {
  const dispatch = useDispatch()
  const { login } = bindActionCreators(actionCreators, dispatch)

  const nameInputRef = useRef()

  return (
    <div className='view'>
      <div>
        <div>
          <label className='label-student'>Student Name:</label>
          <input ref={nameInputRef} type='text' />
        </div>
        <div className='login-button-container'>
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}
