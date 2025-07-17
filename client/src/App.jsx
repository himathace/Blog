import Login from './pages/login'
import Dash from './pages/dashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/dashboard' element={<Dash/>}></Route>
        </Routes>
      
      </BrowserRouter>

      
  )
}

export default App
