import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login';
import Director from './pages/Director/Director';
import role from './util/role';
import Manager from './pages/Transaction/Manager/Manager';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role.DIRECTOR) {
    return <Navigate to="/director" />;
  } else if (user.workplace?.role == role.TRANSACTION_MANAGER) {
    return <Navigate to="/transaction" />;
  }
  return <Navigate to="/login" />;
}

const ProtectRoute = ({children, role, workplace_name}) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.workplace?.role == role.DIRECTOR && role == role.DIRECTOR) {
    return children;
  }
  if (user.workplace?.role == role && user.workplace?.workplace_name == workplace_name) {
    return children;
  }
  return <Navigate to="/login" />;
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/login" element={
        sessionStorage.getItem('user') ? <RedirectHandler /> : <Login />
      } />
      <Route path='/director' element={<ProtectRoute role={role.DIRECTOR}><Director /></ProtectRoute>} />
      <Route path='/transaction' element={
        <ProtectRoute
          role={role.TRANSACTION_MANAGER}
          workplace_name="TRANSACTION">
          <Manager />
        </ProtectRoute>}
      />
    </Routes>
  )
}

export default AppRouter; 