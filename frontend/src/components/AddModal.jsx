// import React from 'react'
// import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

// const AddModal = () => {

//   return (
//     <div>
//       <div className='flex gap-4 items-center'>
//         <div className='relative'>
//             <img className='w-15 h-15 rounded-full' alt='Img' 
//             src={'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg'}/>
//         </div>
//         <div className='text-2xl'>User 1</div>
//       </div>

//       <div>
//         <textarea cols={50} rows={5} placeholder="What do you want to talk about?" className='my-3 outline-0 text-xl p-2'></textarea>
//       </div>
//       <div>
//         <img className='w-20 h-20 rounded-xl ' src='https://www.researchgate.net/publication/301228264/figure/fig1/AS:350333063712768@1460537319812/Social-media-networks-Sourcehttp-wwwcyberneticsltdcom-services-w.png' />
//       </div>

//       <div className='flex justify-between'>
//         <div className='my-2'>
//             <label className='cursor-pointer ' htmlFor='inputFile'><InsertPhotoIcon sx={{color:"green"}}/></label>
//             <input type='file' className='hidden' id='inputFile' />
//         </div>
//         <div className='bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit items-center'>Post</div>
//       </div>
//     </div>
//   )
// }

// export default AddModal


import  { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import api from "../lib/axios";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode

const AddModal = () => {
  const [profile, setProfile] = useState(null);
   const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
  
        // Decode token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.id; // matches your backend `jwt.sign({ id })`
  
        const res = await api.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    useEffect(() => {
      getUserProfile();
    }, []);
  
    if (!profile) {
      return <div>Loading...</div>;
    }
 

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle post submit
  const handlePost = async () => {
    if (!content && !imageFile) {
      alert("Please enter content or select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("token"); // Assuming JWT stored here

      const res = await api.post(
        "api/posts/", // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created:", res.data);
      alert("Post created successfully!");
      setContent("");
      setImageFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div>
      {/* User Info */}
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img
            className="w-15 h-15 rounded-full"
            alt="User"
            src={
              profile.profilePic
            }
          />
        </div>
        <div className="text-2xl">{profile.name}</div>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          cols={50}
          rows={5}
          placeholder="What do you want to talk about?"
          className="my-3 outline-0 text-xl p-2 w-full border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div>
          <img className="w-20 h-20 rounded-xl" src={previewUrl} alt="Preview" />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <div className="my-2">
          <label className="cursor-pointer" htmlFor="inputFile">
            <InsertPhotoIcon sx={{ color: "green" }} />
          </label>
          <input
            type="file"
            className="hidden"
            id="inputFile"
            onChange={handleFileChange}
          />
        </div>
        <div
          onClick={handlePost}
          className="bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit items-center"
        >
          Post
        </div>
      </div>
    </div>
  );
};

export default AddModal;
