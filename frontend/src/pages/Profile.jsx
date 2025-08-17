// import React from 'react'
// import Advertisement from '../components/Advertisement'
// import Card from '../components/Card'
// import EditIcon from '@mui/icons-material/Edit';



// const Profile = () => {
//     return (
//         <div className='px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100'>
//             <div className='flex justify-between'>

//                 {/* Left Side Main Section */}
//                 <div className='w-full md:w-[70%]'>
//                     <div>
//                         <Card padding={0}>
//                             <div className='w-full h-fit'>
//                                 <div className='relative w-full h-[200px]'>
//                                     <div className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
//                                     ><EditIcon /></div>
//                                     <img src='https://t3.ftcdn.net/jpg/02/04/60/66/360_F_204606646_vtAw26FyhehC21GeJe7Otl5D6j52kUVW.jpg' className=' w-full h-[200px] rounded-tr-lg rounded-tl-lg' />
//                                     <div className='absolute object-cover top-24 left-6 z-10'> <img className='rounded-full border-2 border-white cursor-pointer w-35 h-35' src="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg" alt="" /></div>
//                                 </div>

//                                 <div className='mt-10 relative px-8 py-2'>
//                                     <div className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
//                                     ><EditIcon /></div>

//                                     <div className='w-full'>
//                                         <div className='text-2xl'>User 1</div>
//                                         <div className='text-gray-700'>I am a software engineer</div>
//                                         <div className='text-sm text-gray-500'>Delhi, India</div>
//                                         <div className='text-md text-blue-800 cursor-pointer hover:underline'>2 Connections</div>
//                                     </div>

//                                     <div className='md:flex w-full justify-between'>
//                                         <div className='my-5 flex gap-5'>
//                                             <div className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Open to</div>
//                                             <div className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Share</div>
//                                             <div className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Logout</div>
//                                         </div>

//                                         <div className='my-5 flex gap-5'>
//                                             <div className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>
//                                             Message
//                                             </div>
//                                             <div className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>
//                                             Connect
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>

//                             </div>

//                         </Card>
//                     </div>
//                     <div className='m-5'>

//                         <Card padding={5}>
//                             <div className='flex justify-between items-center'>
//                                 <div className='text-xl'>About</div>
//                                 <div className='cursor-pointer'><EditIcon /></div>
//                             </div>
//                             <div className='text-gray-700 text-md w-[80%]'>
//                                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                             </div>
//                         </Card>

//                         <div className='mt-5'>
//                             <Card padding={1}>
//                             <div className='flex justify-between items-center'>
//                                 <div className='text-xl'>Skills</div>
                                
//                             </div>
//                             <div className='text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap'>
//                                 <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>
//                                     reactjs
//                                 </div>
//                                 <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>
//                                     nodejs
//                                 </div>
//                                 <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>
//                                     express
//                                 </div>
//                                 <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>
//                                     reactjs
//                                 </div>
//                             </div>
//                             </Card>
//                         </div>

//                     </div>

//                 </div>

//                 <div className='hidden md:flex md:w-[28%]'>
//                     <div className='sticky top-19'>
//                         {/* <Advertisement /> */}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Profile


import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import EditIcon from '@mui/icons-material/Edit';
import UpdateProfileForm from '../components/UpdateProfileForm';
import { UserContext } from '../context/context';
import {jwtDecode} from "jwt-decode";
import api from '../lib/axios';

const Profile = () => {
  const {  loading , setLoading, isOpen,setIsOpen} = useContext(UserContext);
  // const user = localStorage.getItem("userData");
  // console.log(user.name)

  const [profile, setProfile] = useState(null);

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
  }, [isOpen]);

  console.log(profile);
  return (
    <div className='px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100'>
      <div className='flex justify-between'>
        {/* Left Side Main Section */}
        <div className='w-full md:w-[70%]'>
          <div>
            <Card padding={0}>
              <div className='w-full h-fit'>
                <div className='relative w-full h-[200px]'>
                  {/* <div className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"> */}
                    {/* <EditIcon /> */}
                  {/* </div> */}
                  <img
                    src='https://t3.ftcdn.net/jpg/02/04/60/66/360_F_204606646_vtAw26FyhehC21GeJe7Otl5D6j52kUVW.jpg'
                    className='w-full h-[200px] rounded-tr-lg rounded-tl-lg'
                  />
                  <div className='absolute object-cover top-24 left-6 z-10'>
                    <img
                      className='rounded-full border-2 border-white cursor-pointer w-35 h-35'
                      src={profile?.profilePic || "	https://tse3.mm.bing.net/th/id/OIP.1waDZ8Q2eWBkenMscI08qAHaHa?pid=Api&P=0&h=180"} 
                      alt=""
                    />
                  </div>
                </div>

                <div className='mt-10 relative px-8 py-2'>
                  <div  className='absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white'>
                    <div  onClick={()=>setIsOpen(prev=> !prev)}>

                    <EditIcon />
                    </div>
                  </div>

                  <div className='w-full'>
                    <div className='text-2xl'>{profile?.name || " Dummy User"}</div>
                    {/* <div className='text-gray-700'>{profile?.job || "Dummy Job"}</div> */}
                    <div className='text-sm text-gray-500'>{profile?.location || "Dummy Location"}</div>
                    <div className='text-sm text-gray-500'>{profile?.company || "Dummy Company"}</div>
                    {/* <div className='text-md text-blue-800 cursor-pointer hover:underline'>2 Connections</div> */}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className='m-5'>
            {/* About Section */}
            <Card padding={5}>
              <div className='flex justify-between items-center'>
                <div className='text-xl'>About</div>
                {/* <div className='cursor-pointer'><EditIcon /></div> */}
              </div>
              <div className='text-gray-700 text-md w-[80%]'>
                {profile?.bio || "Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
              </div>
            </Card>

            {/* Skills Section */}
            {/* Skills Section */}
<div className='mt-5'>
  <Card padding={1}>
    <div className='flex justify-between items-center'>
      <div className='text-xl'>Skills</div>
    </div>

    <div className='text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap'>
      {profile?.skills && profile.skills.length > 0 ? (
        profile.skills.map((skill, index) => (
          <div
            key={index}
            className='py-2 px-3 cursor-pointer'
          >
            {skill}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No skills added</div>
      )}
    </div>
  </Card>
</div>

            {/* <div className='mt-5'>
              <Card padding={1}>
                <div className='flex justify-between items-center'>
                  <div className='text-xl'>Skills</div>
                </div>
                <div className='text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap'>
                  <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>reactjs</div>
                  <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>nodejs</div>
                  <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>express</div>
                  <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>reactjs</div>
                </div>
              </Card>
            </div> */}
          </div>
        </div>

        <div className='hidden md:flex md:w-[28%]'>
          <div className='sticky top-19'>
            {/* <Advertisement /> */}
          </div>
        </div>
      </div>
        {isOpen  && (
  <div className="border-2 border-red-500 p-4">
    <UpdateProfileForm />
  </div>
)}

    </div>
  );
};

export default Profile;

//l//
// import { useEffect, useState } from "react";
// import Card from "../components/Card";
// import EditIcon from "@mui/icons-material/Edit";
// import api from '../lib/axios'
// import {jwtDecode} from "jwt-decode"; // npm install jwt-decode

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState({
//     name: false,
//     bio: false,
//     skills: false,
//     location: false,
//     profilePic: false,
//   });

//   const [form, setForm] = useState({
//     name: "",
//     bio: "",
//     skills: [],
//     location: "",
//     profilePic: "",
//   });

// //   // ✅ Get userId from localStorage
// //   const userId = localStorage.getItem("userId");
//  const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
//            // Decode token to get userId
//               const decoded = jwtDecode(token);
//               const userId = decoded.id; // matches your backend `jwt.sign({ id })`

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
         
//         const res = await api.get(`/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//         setForm({
//           name: res.data.name || "",
//           bio: res.data.bio || "",
//           skills: res.data.skills || [],
//           location: res.data.location || "",
//           profilePic: res.data.profilePic || "",
//         });
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchUser();
//   }, [userId]);

//   const handleSave = async (field) => {
//     try {
//       const token = localStorage.getItem("token");
//       let payload = { [field]: form[field] };

//       // For skills array
//       if (field === "skills") {
//         payload.skills = form.skills;
//       }

//       // For profilePic (upload case)
//       if (field === "profilePic" && form.profilePic instanceof File) {
//         const fd = new FormData();
//         fd.append("image", form.profilePic);
//         const res = await api.put(`/api/users/update`, fd, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//         setForm((prev) => ({ ...prev, profilePic: res.data.profilePic }));
//         setIsEditing({ ...isEditing, profilePic: false });
//         return;
//       }

//       const res = await api.put(`/api/users/update`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUser(res.data);
//       setIsEditing({ ...isEditing, [field]: false });
//     } catch (err) {
//       console.error("Error saving field:", err);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100">
//       <div className="flex justify-between">
//         {/* Left Side Main Section */}
//         <div className="w-full md:w-[70%]">
//           <Card padding={0}>
//             {/* Cover & Profile Pic */}
//             <div className="relative w-full h-[200px]">
//               <div className="absolute top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white cursor-pointer"
//                 onClick={() => setIsEditing({ ...isEditing, profilePic: true })}>
//                 <EditIcon />
//               </div>
//               <img
//                 src="https://t3.ftcdn.net/jpg/02/04/60/66/360_F_204606646_vtAw26FyhehC21GeJe7Otl5D6j52kUVW.jpg"
//                 className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
//               />
//               <div className="absolute object-cover top-24 left-6 z-10">
//                 <img
//                   className="rounded-full border-2 border-white cursor-pointer w-35 h-35"
//                   src={user.profilePic || "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"}
//                   alt=""
//                 />
//               </div>
//             </div>

//             <div className="mt-10 relative px-8 py-2">
//               <div className="absolute top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white cursor-pointer"
//                 onClick={() => setIsEditing({ ...isEditing, name: true })}>
//                 <EditIcon />
//               </div>

//               <div className="w-full">
//                 {isEditing.name ? (
//                   <div>
//                     <input
//                       className="border p-2 w-full"
//                       value={form.name}
//                       onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     />
//                     <button className="bg-blue-600 text-white px-3 py-1 rounded mt-2" onClick={() => handleSave("name")}>
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-2xl">{user.name}</div>
//                 )}
//                 <div className="text-gray-700">{user.bio}</div>
//                 {/* <div className="text-sm text-gray-500">{user.location}</div> */}
//                 {/* <div className="text-md text-blue-800 cursor-pointer hover:underline">
//                   {user.connections?.length || 0} Connections
//                 </div> */}
//               </div>
//             </div>
//           </Card>

//           {/* About Section */}
//           <div className="m-5">
//             <Card padding={5}>
//               <div className="flex justify-between items-center">
//                 <div className="text-xl">About</div>
//                 <div className="cursor-pointer" onClick={() => setIsEditing({ ...isEditing, bio: true })}><EditIcon /></div>
//               </div>
//               {isEditing.bio ? (
//                 <div>
//                   <textarea
//                     className="border p-2 w-full"
//                     value={form.bio}
//                     onChange={(e) => setForm({ ...form, bio: e.target.value })}
//                   />
//                   <button className="bg-blue-600 text-white px-3 py-1 rounded mt-2" onClick={() => handleSave("bio")}>
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-gray-700 text-md w-[80%]">{user.bio}</div>
//               )}
//             </Card>

//             {/* Skills Section */}
//             <div className="mt-5">
//               <Card padding={1}>
//                 <div className="flex justify-between items-center">
//                   <div className="text-xl">Skills</div>
//                   <div className="cursor-pointer" onClick={() => setIsEditing({ ...isEditing, skills: true })}><EditIcon /></div>
//                 </div>
//                 {isEditing.skills ? (
//                   <div>
//                     <input
//                       className="border p-2 w-full"
//                       placeholder="Enter skills comma separated"
//                       value={form.skills.join(", ")}
//                       onChange={(e) =>
//                         setForm({ ...form, skills: e.target.value.split(",").map((s) => s.trim()) })
//                       }
//                     />
//                     <button className="bg-blue-600 text-white px-3 py-1 rounded mt-2" onClick={() => handleSave("skills")}>
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap">
//                     {user.skills?.map((skill, i) => (
//                       <div key={i} className="py-2 px-3 bg-blue-800 text-white rounded-lg">{skill}</div>
//                     ))}
//                   </div>
//                 )}
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Pic Modal */}
//       {isEditing.profilePic && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg">
//             <h3 className="text-lg mb-2">Update Profile Picture</h3>
//             <input
//               type="file"
//               onChange={(e) => setForm({ ...form, profilePic: e.target.files[0] })}
//             />
//             <button className="bg-blue-600 text-white px-3 py-1 rounded mt-3" onClick={() => handleSave("profilePic")}>
//               Upload
//             </button>
//             <button className="ml-2 bg-gray-400 text-white px-3 py-1 rounded mt-3"
//               onClick={() => setIsEditing({ ...isEditing, profilePic: false })}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

