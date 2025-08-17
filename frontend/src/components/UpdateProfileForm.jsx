import { useState, useContext } from "react";
import { UserProvider } from "../context/context";
import { UserContext } from "../context/context";
const UpdateProfileForm = () => {
  const { updateProfile,setIsOpen  } = useContext(UserContext); // get user + update fn
   const user = localStorage.getItem("userData")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "", // convert array → comma separated string
    location: user?.location || "",
    company: user?.company || "",
    profilePic: user?.profilePic || "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("skills", formData.skills); // backend will split
    data.append("location", formData.location);
    data.append("company", formData.company);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    const res = await updateProfile(data); // call context function
     console.log(res);
    if (res.success) {
      setIsOpen(prev => !prev);
      alert("✅ Profile updated successfully!");
    } else {
      alert("❌ " + res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

      <label className="block mb-1">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">Skills (comma separated)</label>
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">Company</label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <label className="block mb-1">Profile Picture</label>
      <input
        type="file"
        name="profilePic"
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateProfileForm;
