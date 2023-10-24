import { Routes, Route } from 'react-router-dom'
import Sample from './pages/Sample/Sample';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Sample />}>
        {/* <Route path='./' element='put your childroute here' /> */}
      </Route>
      <Route path='/samplepath' element={<Sample />}>
        {/* samplepath/dir */}
        <Route path='./dir' element={<Sample />} /> 
      </Route>
    </Routes>
  )
}

export default AppRouter; 