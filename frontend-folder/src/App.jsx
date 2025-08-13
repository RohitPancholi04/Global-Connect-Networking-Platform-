import { useState } from 'react'
import './App.css'
import Navbar1 from './components/Navbar1'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
import Navbar2 from './components/Navbar2'
import Feeds from './pages/Feeds'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Resume from './pages/Resume'
import Messages from './pages/Messages'
import JobsPage from './pages/JobsPage'

function App() {
  const isLogin = true;

  return (
      <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
        {isLogin ? <Navbar2/> :<Navbar1 />}
        <Routes>
        <Route path='/Feeds' element={<Feeds/>}/>
        <Route path='/' element={<LandingPage/>} /> 
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/Home' element={<Feeds/>}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Resume' element={<Resume/>}/>
        <Route path='/Jobs' element={<JobsPage/>}/>
        <Route path='/Messages' element={<Messages/>} />
        <Route path='/Profile' element={<Profile/>} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
