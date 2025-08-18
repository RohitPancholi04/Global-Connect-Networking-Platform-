// import React from "react";

// const JobFilters = () => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Filters</h2>

//       <div>
//         <label className="block text-sm font-medium">Date Posted</label>
//         <select className="mt-1 w-full border rounded p-2">
//           <option>Any time</option>
//           <option>Past 24 hours</option>
//           <option>Past week</option>
//           <option>Past month</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium">Experience Level</label>
//         <select className="mt-1 w-full border rounded p-2">
//           <option>All</option>
//           <option>Internship</option>
//           <option>Entry level</option>
//           <option>Mid-Senior level</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default JobFilters;


import { useEffect, useState } from "react";
import api from "../lib/axios.js";

function JobFilters() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs/filter", {
        params: {
          location,
          skills,
          search,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      {/* Filter Inputs */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchJobs}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Jobs List */}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p className="text-gray-500">
              {job.location} | {job.skills.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobFilters;
