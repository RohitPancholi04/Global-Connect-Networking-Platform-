import React, { useState } from 'react'
import Card from './Card'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

const Post = () => {
    const [seeMore, setSeeMore] = useState(false);
    const [comment, setComment] = useState(false);
    const handleSendComment = (e) => {
        e.preventDefault();

    }

    const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel nisl fringilla, sagittis dolor elementum, imperdiet turpis. Sed facilisis mattis hendrerit. Praesent id felis ante. Nullam est nunc, sollicitudin at iaculis id, semper id nisl. Aliquam ac ex non quam vulputate molestie.`


    return (
        <Card paddinf={0}>
            <div className='flex gap-3 p-4'>
                <div className='w-12 h-12 roundex-xl'>
                    <img src='https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg'
                        className='rounded-4xl w-12 h-12 border-white border-2 cursor-pointer' />
                </div>
                <div>
                    <div className='text-lg font-semibold'>Dummy USer</div>
                    <div className='text-xs text-gray-500'>SDE-II Eng. @Amazon</div>
                </div>
            </div>

            <div className='text-md p-4 my-3 whitespace-pre-line flex-grow'>
                {seeMore ? desc : `${desc.slice(0, 50)}.....`}
                <span onClick={() => setSeeMore(prev => !prev)} className='cursor-pointer text-blue-800'>{seeMore ? "See Less" : "See More"}</span>
            </div>

            <div className='w-[100%] h-[300px]'>
                <img className='w-full h-full'
                    src='https://www.researchgate.net/publication/301228264/figure/fig1/AS:350333063712768@1460537319812/Social-media-networks-Sourcehttp-wwwcyberneticsltdcom-services-w.png' />
            </div>

            <div className='my-2 p-4 flex justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <ThumbUpIcon sx={{ color: "blue", fontSize: 12 }} /> <div className='text-sm text-gray-600'>1 Likes</div>
                </div>
                <div className='flex gap-1 items-center'>
                    <CommentIcon sx={{ color: "green", fontSize: 12 }} /> <div className='text-sm text-gray-600'>2 Comments</div>
                </div>
            </div>

            <div className='flex p-1'>
                <div className='w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'>
                    <ThumbUpIcon sx={{ fontSize: 22, color: "blue" }} /> <span> Like</span>
                </div>

                <div onClick={()=>setComment(true)} className='w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'>
                    <CommentIcon sx={{ fontSize: 22, color: "green" }} /> <span> Comment</span>
                </div>

                <div className='w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100'>
                    <SendIcon sx={{ fontSize: 22, color: "orange" }} /> <span> Share</span>
                </div>
            </div>

            {/* Comment Section */}
            {
                comment && <div className='p-4 w-full'>
                    <div className='flex gap-2 items-center jus'>
                        <img className='rounded-full w-12 h-12 border-2 border-white cursor-pointer'
                            src='https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg' />
                        <form className='w-full flex gap-2' onSubmit={handleSendComment}>
                            <input placeholder='Add a comment' className='w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100' />
                            <button type='submit' className='cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3'>Send</button>
                        </form>
                    </div>
                    {/* Add comment section */}
                    <div className='w-full p-4 '>
                        <div className='my-4'>
                            <div className='flex gap-3'>
                                <img className='rounded-full w-10 h-10 border-2 border-white cursor-pointer'
                                    src='https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg' />

                                <div className='cursor-pointer'>
                                    <div className='text-md'>Dummy User</div>
                                    <div className='text-sm text-gray-500'>@Amazon SDE-II</div>
                                </div>
                            </div>

                            <div className='px-11 my-2'>
                                Well done!!
                            </div>
                        </div>


                    </div>
                </div>
            }
        </Card>
    )
}

export default Post
