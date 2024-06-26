
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Sigin from './pages/Sigin'
import Blog from './pages/Blog'
import { Publish } from './pages/Publish'
import Landing from './pages/Landing'
import { Blogs } from './pages/Blogs'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Sigin/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs  />}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
