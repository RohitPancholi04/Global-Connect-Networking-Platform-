import { useState } from 'react'
import './App.css'
import Navbar1 from './components/Navbar1'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import {Routes,Route,useNavigate} from 'react-router-dom'
import Navbar2 from './components/Navbar2'
import Feeds from './pages/Feeds'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Resume from './pages/Resume'
import Messages from './pages/Messages'
import JobsPage from './pages/JobsPage'

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
    navigate("/login");
  };

  return (
      <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
        {isLogin ? <Navbar2  onLogout={handleLogout} /> :<Navbar1 />}
        <Routes>
            {!isLogin && <Route path="/signUp" element={<SignUp />} />}
        {!isLogin && <Route path="/login" element={<Login  setIsLogin={setIsLogin}/>} />}
       {isLogin && <Route path="/Feeds" element={<Feeds />} />}
        <Route path='/' element={<LandingPage/>} /> 
  
        <Route path='/Home' element={<Feeds/>}/>
      
        <Route path='/Resume' element={<Resume/>}/>
        <Route path='/Jobs' element={<JobsPage/>}/>
        <Route path='/Messages' element={<Messages/>} />
        <Route path='/Profile' element={<Profile/>} />

         {/* Redirect */}
        <Route path="*" element={<Navigate to={isLogin ? "/" : "/login"} />} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App
