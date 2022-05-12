import Login from './pages/Login'
import Index from './pages/Index'
import { useSelector } from 'react-redux'

function App() {
  const loggedIn: boolean = !!useSelector((state: GlobalState) => state.user)
  const loading: boolean = useSelector((state: GlobalState) => state.loading)

  return (
    <div>
      {loading ? (
        <div className='view'>Loading...</div>
      ) : (
        <div>{loggedIn ? <Index /> : <Login />}</div>
      )}
    </div>
  )
}

export default App
