import React from "react";

import MiniJobCell from "../components/jobs/MiniJobCell";
import FullJobCell from "../components/jobs/FullJobCell";

function JobSearch() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="flex flex-col">
        {" "}
        {/* Search Bar Section */}
        <section className="p-8 border-b border-neutral-200">
          <div className="flex items-center gap-4">
            <input
              className="flex-grow w-full width-36 py-3 px-4 bg-neutral-100 rounded-md text-neutral-950 text-lg"
              placeholder="Search by job title, skill, or company..."
            />
            <button className="py-3 px-6 bg-primary-500 text-primary-50 rounded-md text-lg shadow-sm hover:bg-primary-600">
              Search
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 sm:grid sm:grid-cols-2 lg:flex">
            {/* Filters */}
            <select className="py-2 px-4 bg-neutral-100 rounded-md text-neutral-950 text-sm">
              <option>Location</option>
              <option>Remote</option>
              <option>On-site</option>
            </select>
            <select className="py-2 px-4 bg-neutral-100 rounded-md text-neutral-950 text-sm">
              <option>Salary Range</option>
              <option>$50k-$70k</option>
              <option>$70k-$100k</option>
            </select>
            <select className="py-2 px-4 bg-neutral-100 rounded-md text-neutral-950 text-sm">
              <option>Job Type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
            </select>
            <select className="py-2 px-4 bg-neutral-100 rounded-md text-neutral-950 text-sm">
              <option>Experience Level</option>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
        </section>
        {/* Job Results Section */}
        <div className="grid grid-cols-[1fr_2fr]">
          <section className="gap-6">
            <div className="gap-6 flex-1 p-8 grid grid-cols-1">
              {[...Array(3)].map((_, index) => (
                <MiniJobCell
                  index={index}
                  company="Temp Company"
                  jobTitle="Data Engineer"
                  location="Menlo Park, CA"
                  contractType="Full-Time"
                  experience="3-5 Years"
                  pay="$100,000 - $120,000"
                  requirements="Bachelor's degree in Engineering or similar, ETL design, at least 1 year of AWS experience"
                  matchPercent="51%"
                />
              ))}
            </div>
            {/* Load More Button */}
            <div className="px-8 flex justify-center">
              <button className="px-32 py-3 bg-primary-500 text-primary-50 rounded-md hover:bg-primary-600">
                Load More
              </button>
            </div>
          </section>
          <div className="gap-6">
            <FullJobCell
              company="Temp Company"
              jobTitle="Data Engineer"
              location="Menlo Park, CA"
              remoteStatus="onsite"
              contractType="Full-Time"
              experience="3-5 Years"
              pay="$100,000 - $120,000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
