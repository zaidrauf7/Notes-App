import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
  <Route path='/signup' element={<SignUp/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App