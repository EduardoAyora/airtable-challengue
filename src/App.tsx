import Login from './pages/Login'
import Index from './pages/Index'
import './App.css'
import { useSelector } from 'react-redux'

function App() {
  const loggedIn: boolean = !!useSelector((state: GlobalState) => state.user)

  return <div>{loggedIn ? <Index /> : <Login />}</div>
}

export default App
