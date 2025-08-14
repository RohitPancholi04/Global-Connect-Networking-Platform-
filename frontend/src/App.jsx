import { useState } from 'react'
import './App.css'
import Navbar1 from './components/Navbar1'
import LandingPage1 from './pages/LandingPage1'
import LandingPage2 from './pages/LandingPage2'
import Footer from './components/Footer'
import {Routes,Route,useNavigate, Navigate} from 'react-router-dom'
import Navbar2 from './components/Navbar2'
import Feeds from './pages/Feeds'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Resume from './pages/Resume'
import Messages from './pages/Messages'
import JobsPage from './pages/JobsPage'
import { useEffect } from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
   useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    // Just trust the token presence without backend verification
    setIsLogin(true);
    navigate("/");
  } else {
    setIsLogin(false);
  }
  setLoading(false);
},  []);


  if (loading) {
    return <div>Loading...</div>; // or a nice spinner
  }

const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  };



  return (
      <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
        {isLogin ? <Navbar2  onLogout={handleLogout} /> :<Navbar1 />}
        <Routes>
            {!isLogin && <Route path="/signUp" element={<SignUp />} />}
             {!isLogin && <Route path="/login" element={<Login  setIsLogin={setIsLogin}/>} />}

              {!isLogin && <Route path='/' element={<LandingPage1 />} /> }
               {isLogin && <Route path='/' element={<LandingPage2 />} /> }
  
              {isLogin &&  <Route path='/Home' element={<Feeds/>}/> }
               {isLogin && <Route path="/Feeds" element={<Feeds />} />}
      
        {isLogin && <Route path='/Resume' element={<Resume/>}/>}
        {isLogin && <Route path='/Jobs' element={<JobsPage/>}/> }
        {isLogin && <Route path='/Messages' element={<Messages/>} /> }
        {isLogin && <Route path='/Profile' element={<Profile/>} /> }

         {/* Redirect */}
        <Route path="*" element={<Navigate to={isLogin ? "/" : "/login"} />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
