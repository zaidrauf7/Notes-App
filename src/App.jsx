import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import PrivateRoutes from './pages/PrivateRoutes'
import { Toaster } from './components/ui/toaster'
import AddNotes from './components/AddNotes'

const App = () => {
  return (
 <>
  <BrowserRouter>
  <Routes>
 <Route element={<PrivateRoutes/>}>
  <Route path='/' element={<AddNotes/>}/>
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