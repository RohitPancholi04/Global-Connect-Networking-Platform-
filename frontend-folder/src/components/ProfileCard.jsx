import React from 'react'
import Card from './Card'

const ProfileCard = () => {
  return (
    <Card padding={0}>
        <div className='relative h-25'>
            <div className='relative w-full h-22 rounded-md'>
                <img src='https://thumbs.dreamstime.com/b/abstract-network-vector-concept-world-globe-internet-global-connection-background-abstract-network-vector-concept-103318227.jpg' 
                className='rounded-t-md h-full w-full' />
            </div>
            <div className='absolute top-14 left-6 z-10'>
                <img src='https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg'
                className='rounded-full b-2 h-16 w-16 border-white cursor-pointer' />
            </div>
        </div>
        <div className='p-5'>
            <div className='text-xl'>Abc</div>
            <div className='text-sm my-1'>@Amazon Software Eng</div>
            <div className='text-sm my-1'>Mumbai,India</div>
            <div className='text-sm my-1'>Amazon</div>
        </div>
    </Card>
  )
}

export default ProfileCard
