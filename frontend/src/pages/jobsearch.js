import React from "react";

function JobSearch() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="rounded-lg shadow-lg flex flex-col">
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
        {/* AI Assistant Section */}
        <aside className="relative m-8 p-8 bg-neutral-100 rounded-md flex items-start gap-4">
          <span className="material-symbols-outlined text-primary-500">
            chat
          </span>
          <p className="text-neutral-950 text-l center-items">
            Hi there! Tell me what kind of job you're looking for, and I’ll find
            the best matches for you!
          </p>
        </aside>
        {/* Job Results Section */}
        <section className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-100 rounded-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-title text-xl font-bold text-neutral-950 cursor-pointer">
                Software Engineer
              </h3>
              <p className="text-neutral-600">Tech Company</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-neutral-600">
                  place
                </span>
                <span className="text-neutral-600">San Francisco, CA</span>
              </div>
              <p className="mt-2 text-neutral-800">$100k-$120k</p>
              <div className="mt-4 text-neutral-600 flex items-center gap-2">
                <div className="w-[100px] bg-neutral-200 rounded-full h-[8px] overflow-hidden">
                  <div
                    className="bg-primary-500 h-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span>85% Match</span>
              </div>
            </div>
          ))}
        </section>
        {/* Load More Button */}
        <div className="px-8 pb-8">
          <button className="w-full px-6 py-3 bg-primary-500 text-primary-50 rounded-md hover:bg-primary-600">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
