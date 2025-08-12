import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm p-10">
        <div className="text-3xl font-bold mb-3">Sign In</div>

   <div className='flex flex-col gap-4'>
            <div>
                <label htmlFor="email">email</label>
                <input type="text" className='w-full text-xl border-2 rounded-lg px-5 py-1 ' placeholder='email' />
            </div>

             <div>
                <label htmlFor="password">password</label>
                <input type="password" className='w-full text-xl border-2 rounded-lg px-5 py-1 ' placeholder='password' />
            </div>

             
            <div className='w-ful hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2'>Login</div>
            </div>
      
      </div>
      <div>
<div className="mt-4 mb-14">
  New to LinkedIn? <Link to="/signUp" className="text-blue-500">Join Now</Link>
</div>

      </div>
    </div>
  )
}

export default Login