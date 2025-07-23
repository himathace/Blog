import Login from './pages/login'
import Dash from './pages/dashboard'
import Create from './pages/create'
import Register from './pages/register'
import Details from './pages/details'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dash/>}></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/details' element={<Details />}></Route>
        </Routes>
      
      </BrowserRouter>

      
  )
}

export default App
