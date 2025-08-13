import React from "react";

const JobCard = ({ job, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 ${
        isSelected ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location}</p>
      <p className="text-gray-400 text-xs">{job.time}</p>
    </div>
  );
};

export default JobCard;
