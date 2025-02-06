import React, { useState } from "react";
import { searchJobs } from "../api";

import MiniJobCell from "../components/jobs/MiniJobCell";
import FullJobCell from "../components/jobs/FullJobCell";

function JobSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = async () => {
    const data = await searchJobs(query);
    setResults(data.results);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  console.log();

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
              className="flex-grow w-full py-3 px-4 bg-neutral-100 rounded-md text-neutral-950 text-lg"
              placeholder="Search by job title, skill, or company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="py-3 px-6 rounded-md bg-primary text-white transition-all hover:bg-gray-600"
              onClick={handleSearch}
            >
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
              {results.map((job, index) => (
                <div onClick={() => handleJobClick(job)}>
                  <MiniJobCell index={index} job={job} />
                </div>
              ))}
            </div>
            {/* Load More Button */}
            <div className="px-8 flex justify-center">
              <button className="px-32 py-3 rounded-md bg-primary py-4 text-white transition-all hover:bg-gray-600">
                Load More
              </button>
            </div>
          </section>
          <div className="gap-6">
            {selectedJob && <FullJobCell job={selectedJob} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
