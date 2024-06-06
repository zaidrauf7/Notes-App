import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import PrivateRoutes from './pages/PrivateRoutes'
import Home from './components/Home'
import { Toaster } from './components/ui/toaster'

const App = () => {
  return (
 <>
  <BrowserRouter>
  <Routes>
 <Route element={<PrivateRoutes/>}>
  <Route path='/' element={<Home/>}/>
 </Route>
 <Route path='/signup' element={<SignUp/>} />
  <Route path='/login' element={<Login/>} />
  </Routes>
  </BrowserRouter>
      <Toaster />
 </>

  )
}

export default App