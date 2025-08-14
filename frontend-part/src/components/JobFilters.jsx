import React from "react";

const JobFilters = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      <div>
        <label className="block text-sm font-medium">Date Posted</label>
        <select className="mt-1 w-full border rounded p-2">
          <option>Any time</option>
          <option>Past 24 hours</option>
          <option>Past week</option>
          <option>Past month</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Experience Level</label>
        <select className="mt-1 w-full border rounded p-2">
          <option>All</option>
          <option>Internship</option>
          <option>Entry level</option>
          <option>Mid-Senior level</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
