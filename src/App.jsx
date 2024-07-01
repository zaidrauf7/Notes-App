import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import PrivateRoutes from './pages/PrivateRoutes'
import { Toaster } from './components/ui/toaster'
import AddNotes from './components/AddNotes'
import Home from './components/Home'
import Trash from './components/Trash'

const App = () => {
  return (
 <>
  <BrowserRouter>
  <Routes>
 <Route element={<PrivateRoutes/>}>
  <Route path='/notes' element={<AddNotes/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='/trash' element={<Trash/>}/>

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