import React, { useState } from "react";
import JobTableEntry from "../components/jobs/JobTableEntry";
import UpdatePopup from "../components/jobs/UpdatePopup";

export default function bookmarks() {
  // Filler code for time being
  class JobBookmark {
    constructor(jobTitle, company, status, notes, date) {
      this.jobTitle = jobTitle;
      this.company = company;
      this.status = status;
      this.notes = notes;
      this.date = date;
    }
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([
    new JobBookmark(
      "Data Scientist",
      "CareerSage",
      "Offer",
      "Asked questions about linked lists.",
      "2025-02-27"
    ),
    new JobBookmark(
      "Backend Engineer",
      "TechFlow",
      "Applied",
      "Waiting for recruiter response.",
      "2025-02-20"
    ),
    new JobBookmark(
      "Machine Learning Engineer",
      "DeepAI",
      "Interview",
      "Had a great discussion on transformers.",
      "2025-02-22"
    ),
  ]);

  const handleOpenPopup = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.jobTitle === updatedJob.jobTitle ? updatedJob : job
      )
    );
    handleClosePopup();
  };

  return (
    <div className="w-full h-[calc(100vh-12rem)] flex border-b border-gray-200">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-neutral-950 font-medium">Menu</h1>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="material-symbols-outlined mr-3 text-neutral-950">
                  home
                </span>
                <span className="text-neutral-950">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md bg-white font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="material-symbols-outlined mr-3 text-neutral-950">
                  bookmark
                </span>
                <span>Bookmarked Jobs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="material-symbols-outlined mr-3 text-neutral-950">
                  analytics
                </span>
                <span className="text-neutral-950">Analytics</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Bookmarked Jobs
            </h2>
            <p className="text-gray-600 mt-1">
              Manage and track your bookmarked job applications
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="px-6 py-3 font-medium text-gray-600">
                    Job Title
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-600">
                    Company
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Notes</th>
                  <th className="px-6 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <JobTableEntry
                    key={index}
                    jobBookmark={job}
                    onOpenPopup={handleOpenPopup}
                  />
                ))}
              </tbody>
            </table>
            {isPopupOpen && selectedJob && (
              <UpdatePopup
                job={selectedJob}
                onClose={handleClosePopup}
                onUpdate={handleUpdateJob}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
