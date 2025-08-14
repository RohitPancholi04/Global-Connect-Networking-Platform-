import React from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const AddModal = () => {
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <div className='relative'>
            <img className='w-15 h-15 rounded-full' alt='Img' 
            src={'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg'}/>
        </div>
        <div className='text-2xl'>User 1</div>
      </div>

      <div>
        <textarea cols={50} rows={5} placeholder="What do you want to talk about?" className='my-3 outline-0 text-xl p-2'></textarea>
      </div>
      <div>
        <img className='w-20 h-20 rounded-xl ' src='https://www.researchgate.net/publication/301228264/figure/fig1/AS:350333063712768@1460537319812/Social-media-networks-Sourcehttp-wwwcyberneticsltdcom-services-w.png' />
      </div>

      <div className='flex justify-between'>
        <div className='my-2'>
            <label className='cursor-pointer ' htmlFor='inputFile'><InsertPhotoIcon sx={{color:"green"}}/></label>
            <input type='file' className='hidden' id='inputFile' />
        </div>
        <div className='bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit items-center'>Post</div>
      </div>
    </div>
  )
}

export default AddModal
