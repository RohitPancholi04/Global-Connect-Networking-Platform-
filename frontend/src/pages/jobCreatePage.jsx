import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

function JobCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/jobs/create", {
        title,
        description,
        skills: skills.split(",").map((s) => s.trim()), 
        location,
      });
      console.log("Response from backend:", res.data);

      alert("Job created successfully!");
      navigate("/jobs"); 
    } catch (err) {
      alert(err.response?.data?.message || "Error creating job");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Skills (comma separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="React, Node.js, MongoDB"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}

export default JobCreatePage;
