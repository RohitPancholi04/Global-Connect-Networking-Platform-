import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar1 from './components/Navbar1'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
import Navbar2 from './components/Navbar2'
import Feeds from './pages/Feeds'
import SignUp from './pages/Signup'
import Login from './pages/Login'

function App() {
  const isLogin = true;

  return (
      <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
        {isLogin ? <Navbar2/> :<Navbar1 />}
        <Routes>
        <Route path='/' element={<Feeds/>}/>
          {/* <Route path='/' element={<LandingPage/>} />  */}
          {/* <Route path='/signUp' element={<SignUp/>} /> */}
           {/* <Route path='/Login' element={<Login/>} /> */}
        </Routes>
        <Footer />
      </div>
  )
}

export default App
