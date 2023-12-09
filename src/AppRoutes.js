import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Sample from './pages/Sample/Sample';
import Login from './pages/Login/Login';
import { isExpired } from 'react-jwt';
import { useState } from 'react';

const LoginNavigate = ({ children }) => {
  // const token = sessionStorage.getItem('token')
  const [token, setToken] = useState(sessionStorage.getItem('token'))
  const navigate = useNavigate()
  if (isExpired(token)) {
    sessionStorage.removeItem('token')
    navigate('/login')
  }
  return children
}

const AppRouter = () => {
  const token = sessionStorage.getItem('token')
  if (!token) <Link to={'/login'} />
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/director' element={
        <LoginNavigate>
          <Sample />
        </LoginNavigate>
      } />
    </Routes>
  )
}

export default AppRouter; 