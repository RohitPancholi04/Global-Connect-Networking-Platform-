import React from 'react'
import Advertisement from '../components/Advertisement'


const Resume = () => {
  return (
    <div className='px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100'>
        <div className='w-[100] py-5 sm:w-[74%]'>
            <img className='w-full h-full rounded-lg' src={"https://resumesector.com/wp-content/uploads/2024/10/Best-Resume-Template-Free-Download-MS-Word--724x1024.jpg"}/>
            </div>
            <div className='w-[26%] hidden md:block'>
                <div className='sticky top-19'>
                    <Advertisement/>
                </div>
            </div>
        </div>
    
  )
}

export default Resume



