import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login';
import Director from './pages/Director/Director';
import role from './util/role';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role.DIRECTOR) {
    return <Navigate to="/director" />;
  }
  return <Login />;
}

const ProtectRoute = ({children, role}) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role) {
    return children;
  }
  return <Login />;
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/login" element={
        sessionStorage.getItem('user') ? <RedirectHandler /> : <Login />
      } />
      <Route path='/director' element={<ProtectRoute role={role.DIRECTOR}><Director /></ProtectRoute>} />
    </Routes>
  )
}

export default AppRouter; 