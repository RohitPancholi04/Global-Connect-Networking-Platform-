import React from "react";

const JobSearchBar = () => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search jobs"
        className="border p-2 rounded w-2/3"
      />
      <input
        type="text"
        placeholder="Location"
        className="border p-2 rounded w-1/3"
      />
      <button className="bg-blue-600 text-white px-4 rounded">Search</button>
    </div>
  );
};

export default JobSearchBar;
