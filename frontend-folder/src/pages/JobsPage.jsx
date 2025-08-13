import React, { useState } from "react";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import JobSearchBar from "../components/JobSearchBar";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bengaluru, Karnataka, India",
      time: "1 day ago",
      description: "Build and optimize UI for large scale applications."
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Amazon",
      location: "Hyderabad, Telangana, India",
      time: "3 days ago",
      description: "Design and maintain scalable backend services."
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Microsoft",
      location: "Noida, Uttar Pradesh, India",
      time: "1 week ago",
      description: "Work on both frontend and backend systems."
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Left Filters */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <JobFilters />
      </div>

      {/* Job Listings */}
      <div className="w-2/4 p-4 overflow-y-auto">
        <JobSearchBar />
        <div className="mt-4 flex flex-col gap-4">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => setSelectedJob(job)}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
        </div>
      </div>

      {/* Job Details Panel */}
      <div className="w-1/4 border-l p-4 overflow-y-auto">
        {selectedJob ? (
          <div>
            <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
            <p className="text-gray-500">{selectedJob.company}</p>
            <p className="text-gray-500">{selectedJob.location}</p>
            <p className="mt-4">{selectedJob.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Select a job to view details</p>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
