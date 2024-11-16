import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css'
import { Home } from './pages/Home';
import { Contacts } from './pages/Contacts';
import { Addcontact } from './pages/AddContact';

export const backend_url = 'http://localhost:4000';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/add-contact' element={<Addcontact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
