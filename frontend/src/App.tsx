import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Blog from './pages/Blog'
import { Publish } from './pages/Publish'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Sigin/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
