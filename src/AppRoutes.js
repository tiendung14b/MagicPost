import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Sample from './pages/Sample/Sample';
import Login from './pages/Login/Login';
import { isExpired } from 'react-jwt';
import { useState } from 'react';

const LoginNavigate = ({ children }) => {
  // const token = sessionStorage.getItem('token')
  const [token, setToken] = useState(sessionStorage.getItem('token'))
  return (
    token ? {children} : <Navigate to={'/login'} />
  )
}

const AppRouter = () => {
  const token = sessionStorage.getItem('token')
  if (!token) <Link to={'/login'} />
  return (
    <Routes>
      <Route path='/' element={
        <LoginNavigate>
          <Sample />
        </LoginNavigate>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/director' element={<Sample />} />
    </Routes>
  )
}

export default AppRouter; 