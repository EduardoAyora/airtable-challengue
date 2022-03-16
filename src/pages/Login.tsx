import './Login.css'

export default function Login() {
  return (
    <div className='view'>
      <div>
        <div>
          <label className='label-student'>Student Name:</label>
          <input type='text' />
        </div>
        <div className='login-button-container'>
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}
