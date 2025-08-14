import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='w-full flex flex-col  items-center justify-center' >
        <div className='text-4xl mb-5'> make the most of your professional life </div>
        <div className='w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10'>

            <div className='flex flex-col gap-4'>
                <div>
                <label htmlFor="email">email</label>
                <input type="text" className='w-full text-xl border-2 rounded-lg px-5 py-1 ' placeholder='email' />
                </div>

                <div>
                <label htmlFor="password">password</label>
                <input type="password" className='w-full text-xl border-2 rounded-lg px-5 py-1 ' placeholder='password' />
                </div>

                <div>
                <label htmlFor="f_name">Full name</label>
                <input type="text" className='w-full text-xl border-2 rounded-lg px-5 py-1 ' placeholder='full name' />
                </div>

                <div className='w-ful hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2'>
                Register
                </div>
            </div>

        </div>

        <div className='mt-4 mb-10'> Already on Platform? <Link to={'/Login'} className='text-blue-800 cursor-pointer'>Sign in</Link></div>

    </div>
  )

}

export default SignUp