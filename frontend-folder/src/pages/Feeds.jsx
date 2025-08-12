import React from 'react'
import Card from '../components/Card'
import ProfileCard from '../components/ProfileCard'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import Advertisement from '../components/Advertisement';
import Post from '../components/Post';

const Feeds = () => {
  return (
    <div className='px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100'>
      {/* Left Side */}
      <div className='w-[20%] sm:block sm:w-[23%] hidden py-5'>
        <div className='h-fit'>
          <ProfileCard/>
        </div>
        <div className='w-full my-5'>
          <Card padding={1}>
            <div className='w-full flex justify-between'>
              <div>Profile Viewers</div>
              <div className='text-blue-900'> 23</div>
            </div>
          <div className='w-full flex justify-between'>
            <div>Post Impressions</div>
            <div className='text-blue-900'> 90</div>
          </div>
          </Card>
        </div>
      </div>

      {/* center */}
      <div className='w-[100%] py-5 sm:w-[50%]'>

        <div>
          <Card padding={1}>
            <div className='flex gap-2 items-center'>
              <img  src='https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg' 
              className='rounded-4xl w-13 h-13 border-2 border-white cursor-pointer'/>
              <div className='w-full border-1 py-3 px-3 rounded-3xl xurosr-pointer hover:bg-gray-100'>Start a post</div>
            </div>

            <div className='w-full flex mt-5'>
              <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><VideoCallIcon sx={{color:"green"}}/>Vedio</div>
              <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><InsertPhotoIcon sx={{color:"blue"}}/>Photo</div>
              <div className='flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><ArticleIcon sx={{color:"orange"}}/>Article</div>
            </div>
          </Card>
        </div>

        <div className='border-b-1 border-gray-400 w-[100%] my-5' />

        <div className='w-full flex flex-xol gap-5'>
          <Post/>
        </div>

      </div>

      {/* Right Side */}
      <div className='w-[26%] py-5 hidden md:block'>
        <div>
          <Card padding={1}>
            <div className='text-cl'>Global News</div>
            <div className='text-gray-600'>Top Stories</div>
            <div className='my-1'>
              <div className='text-md'> Buffets to remain Berkshire chair</div>
              <div className='text-xs text-gray-400'>2h ago</div>
            </div>
            <div className='my-1'>
              <div className='text-md'> Foriegn Investments surge again</div>
              <div className='text-xs text-gray-400'>3h ago</div>
            </div>
          </Card>
        </div>

        <div className='my-5 sticky top-19'>
          <Advertisement />
        </div>

      </div>


    </div>
  )
}

export default Feeds
