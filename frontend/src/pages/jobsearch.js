import React, { useState, useEffect } from "react";
import { searchJobs } from "../api";

import MiniJobCell from "../components/jobs/MiniJobCell";
import FullJobCell from "../components/jobs/FullJobCell";

export const useTypedKeyword = (interval = 1000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const keywords = [
    "opportunities...",
    "matches...",
    "positions...",
    "careers...",
    "jobs...",
  ];

  useEffect(() => {
    const changeKeyword = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, interval);

    return () => clearInterval(changeKeyword);
  }, [interval]);

  return keywords[currentIndex];
};

function JobSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [limit, setLimit] = useState(10);

  const typedKeyword = useTypedKeyword(2000);

  const handleSearch = async (newQuery = false) => {
    if (isSearching || isLoadingMore) return;

    if (newQuery) {
      setIsSearching(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const currentPage = newQuery ? 1 : page;
      const data = await searchJobs(query, currentPage, limit);
      if (data && data.results) {
        setResults((prevResults) =>
          newQuery
            ? data.results.map((job) => ({ ...job.metadata, score: job.score }))
            : [
                ...prevResults,
                ...data.results.map((job) => ({
                  ...job.metadata,
                  score: job.score,
                })),
              ]
        );
        setHasMore(data.results.length > 0); // If no more results, stop loading
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
      setInitialLoadDone(true);
    }
  };

  const newSearch = () => {
    setResults([]);
    setSelectedJob(null);
    setPage(1);
    setHasMore(true);
    setInitialLoadDone(false);
    handleSearch(true);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    if (!initialLoadDone || !hasMore || isLoadingMore || query === "") return;

    console.log("got past the if statement");

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleSearch();
      }
    });

    observer.observe(document.querySelector("#load-more-trigger"));

    return () => observer.disconnect();
  }, [hasMore, isSearching, isLoadingMore]);

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
              onClick={newSearch}
              disabled={isSearching}
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
        {isSearching && (
          <div className="fixed inset-0 flex flex-col justify-center items-center">
            <svg
              className="animate-spin h-16 w-16 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-30"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-100"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
              ></path>
            </svg>
            <p className="text-lg text-gray-700 animate-pulse mt-4">
              Finding the best{" "}
              <span className="typed-keyword">{typedKeyword}</span>
            </p>
          </div>
        )}
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
            {/* Infinite Scroll Trigger*/}
            {hasMore && initialLoadDone && (
              <div id="load-more-trigger" className="px-8 flex justify-center">
                {isLoadingMore && (
                  <div>
                    <svg
                      className="animate-spin h-8 w-8 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            )}
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
