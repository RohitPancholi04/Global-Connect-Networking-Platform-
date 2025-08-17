// ////
// import { useEffect, useState } from "react";
// import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
// import {jwtDecode} from "jwt-decode"; 
// import api from "../lib/axios";



// const AddModal = ({ onClose, onCreated }) => {
//   const [profile, setProfile] = useState(null);
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("No token found");
//           return;
//         }
  
//         // Decode token to get userId
//         const decoded = jwtDecode(token);
//         const userId = decoded.id; 
  
//         const res = await api.get(`/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },

//         if (!token) return;
//         const { id } = jwtDecode(token);
//         const res = await api.get(`/api/users/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },

//         });
//         setProfile(res.data);
//       } catch (e) {
//         console.error("Profile load failed", e);
//       }
//     })();
//   }, []);

//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f || null);
//     setPreviewUrl(f ? URL.createObjectURL(f) : "");
//   };

//   const handlePost = async () => {
//     if (!content.trim() && !imageFile) return;

//     try {

//       const formData = new FormData();
//       formData.append("content", content);
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const token = localStorage.getItem("token"); 

//       const res = await API.post(
//         "api/posts/", 
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Post created:", res.data);
//       alert("Post created successfully!");

//       const token = localStorage.getItem("token");
//       const fd = new FormData();
//       fd.append("content", content);
//       if (imageFile) fd.append("image", imageFile);

//       const res = await api.post(`/api/posts`, fd, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // return new post to Feeds & close modal
//       onCreated?.(res.data);
//       onClose?.();

//       setContent("");
//       setImageFile(null);
//       setPreviewUrl("");
//     } catch (e) {
//       console.error("Create post failed", e);
//       alert("Failed to create post");
//     }
//   };

//   if (!profile) return <div className="p-4">Loading…</div>;

//   return (
//     <div>
//       {/* User */}
//       <div className="flex gap-4 items-center">
//         <img
//           className="w-14 h-14 rounded-full object-cover"
//           alt="User"
//           src={profile.profilePic}
//         />
//         <div className="text-xl font-semibold">{profile.name}</div>
//       </div>

//       {/* Textarea */}
//       <div className="mt-3">
//         <textarea
//           rows={5}
//           placeholder="What do you want to talk about?"
//           className="w-full border rounded p-3 text-base outline-none"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       {/* Preview */}
//       {previewUrl && (
//         <div className="mt-3">
//           <img src={previewUrl} className="max-h-56 rounded-xl" />
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex justify-between items-center mt-4">
//         <label className="cursor-pointer flex items-center gap-2">
//           <InsertPhotoIcon />
//           <span>Add photo</span>
//           <input id="inputFile" type="file" className="hidden" onChange={handleFileChange} />
//         </label>

//         <button
//           onClick={handlePost}
//           className="bg-blue-900 text-white px-4 py-2 rounded-2xl"
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddModal;


////
import { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import api from "../lib/axios";
import { jwtDecode } from "jwt-decode";

const AddModal = ({ onClose, onCreated }) => {
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { id } = jwtDecode(token);
        const res = await api.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (e) {
        console.error("Profile load failed", e);
      }
    })();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setImageFile(f || null);
    setPreviewUrl(f ? URL.createObjectURL(f) : "");
  };

  const handlePost = async () => {
    if (!content.trim() && !imageFile) return;

    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("content", content);
      if (imageFile) fd.append("image", imageFile);

      const res = await api.post(`/api/posts`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // return new post to Feeds & close modal
      onCreated?.(res.data);
      onClose?.();
      setContent("");
      setImageFile(null);
      setPreviewUrl("");
    } catch (e) {
      console.error("Create post failed", e);
      alert("Failed to create post");
    }
  };

  if (!profile) return <div className="p-4">Loading…</div>;

  return (
    <div>
      {/* User */}
      <div className="flex gap-4 items-center">
        <img
          className="w-14 h-14 rounded-full object-cover"
          alt="User"
          src={profile.profilePic}
        />
        <div className="text-xl font-semibold">{profile.name}</div>
      </div>

      {/* Textarea */}
      <div className="mt-3">
        <textarea
          rows={5}
          placeholder="What do you want to talk about?"
          className="w-full border rounded p-3 text-base outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="mt-3">
          <img src={previewUrl} className="max-h-56 rounded-xl" />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer flex items-center gap-2">
          <InsertPhotoIcon />
          <span>Add photo</span>
          <input id="inputFile" type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <button
          onClick={handlePost}
          className="bg-blue-900 text-white px-4 py-2 rounded-2xl"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default AddModal;
