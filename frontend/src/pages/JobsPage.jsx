// import React, { useState, useEffect } from "react";
// import JobFilters from "../components/JobFilters";
// import JobCard from "../components/JobCard";
// import JobSearchBar from "../components/JobSearchBar";
// // import api from "../lib/axios";
// import axios from "axios";
// const JobsPage = () => {
//   const [selectedJob, setSelectedJob] = useState(null);

//   const jobs = [
//     {
//       id: 1,
//       title: "Frontend Developer",
//       company: "Google",
//       location: "Bengaluru, Karnataka, India",
//       time: "1 day ago",
//       description: "Build and optimize UI for large scale applications."
//     },
//     {
//       id: 2,
//       title: "Backend Engineer",
//       company: "Amazon",
//       location: "Hyderabad, Telangana, India",
//       time: "3 days ago",
//       description: "Design and maintain scalable backend services."
//     },
//     {
//       id: 3,
//       title: "Full Stack Developer",
//       company: "Microsoft",
//       location: "Noida, Uttar Pradesh, India",
//       time: "1 week ago",
//       description: "Work on both frontend and backend systems."
//     }
//   ];

//   return (
//     <div className="flex h-screen">
//       {/* Left Filters */}
//       <div className="w-1/4 border-r p-4 overflow-y-auto">
//         <JobFilters />
//       </div>

//       {/* Job Listings */}
//       <div className="w-2/4 p-4 overflow-y-auto">
//         <JobSearchBar />
//         <div className="mt-4 flex flex-col gap-4">
//           {jobs.map(job => (
//             <JobCard
//               key={job.id}
//               job={job}
//               onClick={() => setSelectedJob(job)}
//               isSelected={selectedJob?.id === job.id}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Job Details Panel */}
//       <div className="w-1/4 border-l p-4 overflow-y-auto">
//         {selectedJob ? (
//           <div>
//             <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
//             <p className="text-gray-500">{selectedJob.company}</p>
//             <p className="text-gray-500">{selectedJob.location}</p>
//             <p className="mt-4">{selectedJob.description}</p>
//           </div>
//         ) : (
//           <p className="text-gray-500">Select a job to view details</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobsPage;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import JobFilters from "../components/JobFilters";
// import JobCard from "../components/JobCard";
// import JobSearchBar from "../components/JobSearchBar";

// function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5002/api/jobs", {
//         params: { search, location },
//       });
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs", err);
//     }
//   };

//   // Load jobs on first render
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return (
//     <div className="p-6 grid grid-cols-4 gap-6">
//       {/* Filters (future expansion) */}
//       <div className="col-span-1">
//         <h2 className="text-lg font-semibold mb-4">Filters</h2>
//         {/* You can place JobFilters here */}
//       </div>

//       {/* Job List */}
//       <div className="col-span-3">
//         <JobSearchBar
//           search={search}
//           setSearch={setSearch}
//           location={location}
//           setLocation={setLocation}
//           onSearch={fetchJobs}
//         />

//         <div className="mt-6 space-y-4">
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}
//                 onClick={() => setSelectedJob(job)}
//                 isSelected={selectedJob?._id === job._id}
//               />
//             ))
//           ) : (
//             <p>No jobs found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobsPage;


import { useEffect, useState } from "react";
import api from "../lib/axios"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs");
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Apply to job
  const applyJob = async (id) => {
    try {
      await api.post(`/api/jobs/${id}/apply`);
      alert("Applied successfully!");
      fetchJobs(); // refresh
    } catch (err) {
      alert(err.response?.data?.error || "Error applying");
    }
  };

  // Save job
  const saveJob = async (id) => {
    try {
      await api.post(`/api/jobs/${id}/save`);
      alert("Job saved successfully!");
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.error || "Error saving job");
    }
  };

  // Close job
  const closeJob = async (id) => {
    try {
      await api.put(`/api/jobs/${id}/close`);
      alert("Job closed successfully!");
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.error || "Error closing job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Available Jobs</h1>

        <div className="flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" onClick={() => navigate("/jobs/create")}>
            + Create Job
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"  onClick={() => navigate("/jobs/filter")}>
            🔍 Search/Filter
          </button>
        </div>
      </div>

      {jobs.length === 0 && <p>No jobs found.</p>}
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Skills:</strong> {job.skills?.join(", ")}</p>
            <p><strong>Posted by:</strong> {job.postedBy?.name}</p>
            <p><strong>Status:</strong> {job.status}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => applyJob(job._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Apply
              </button>
              <button
                onClick={() => saveJob(job._id)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
              {job.status !== "closed" && (
                <button
                  onClick={() => closeJob(job._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobPage;
