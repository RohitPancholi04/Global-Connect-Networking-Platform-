import React, { useState } from 'react'
import './Navbar2.css'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';

const Navbar2 = () => {
    const [dropdown, setdropdown] = useState(false);
    
    return (
        <div className='bg-white h-13 flex justify-between py-1 px-5 xl:px-50 ficed top-0 w-[100%] z-1000'>
            <div className='flex gap-2 items-center'>
                <div>
                    <img src={'https://gncipl.online/wp-content/uploads/2025/08/logo.png'} className='w-12 h-12' alt='logo' />
                </div>
                <div className='relative'>
                    <input className='searchInput w-70 bg-gray-100 rounded-sm h-10 px-4' placeholder='Search' />

                    {
                        dropdown && 
                        <div className='absolute w-88 left-0 bg-gray-200'>
                            <div className='flex gap-2 mb-1 items-center cursor-pointer '>
                                <div><img className='w-10 h-10 rounded-full' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png'} /></div>
                                <div>User1</div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className='hidden gap-10 md:flex'>
                <div className='flex flex-col items-center cursor-pointer'>
                    <HomeIcon sx={{color:'grey'}} />
                    <div className='text-sm text-gray-500'>Home</div>
                </div>

                <div className='flex flex-col items-center cursor-pointer'>
                    <ChatIcon sx={{color:'grey'}}/>
                    <div className='text-sm text-gray-500'>Chatbox</div>
                </div>

                <div className='flex flex-col items-center cursor-pointer'>
                    <PersonIcon sx={{color:'grey'}}/>
                    <div className='text-sm text-gray-500'>My Profile</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar2
