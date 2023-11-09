import { Routes, Route, Navigate } from 'react-router-dom'
import Sample from './pages/Sample/Sample';
import Login from './pages/Login/Login';

const AppRouter = () => {
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