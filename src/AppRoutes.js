import { Routes, Route, Navigate } from 'react-router-dom'
import Sample from './pages/Sample/Sample';
import Login from './pages/Login/Login';
import { isExpired } from 'react-jwt';

const AppRouter = () => {
  const user = sessionStorage.getItem('user') 
  if (!user || isExpired(user.access_token)) {
    <Navigate to="/login" replace={true} />
  }
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/samplepath' element={<Sample />}>
        {/* samplepath/dir */}
        <Route path='./dir' element={<Sample />} /> 
      </Route>
    </Routes>
  )
}

export default AppRouter; 