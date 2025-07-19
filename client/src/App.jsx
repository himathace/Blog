import Login from './pages/login'
import Dash from './pages/dashboard'
import Create from './pages/create'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dash/>}></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/create' element={<Create />}></Route>
        </Routes>
      
      </BrowserRouter>

      
  )
}

export default App
