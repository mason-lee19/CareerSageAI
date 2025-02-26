import React from "react";

export default function FullJobCell({ job }) {

  const requirements = typeof job.req === 'string' ? JSON.parse(job.req) : job.req;

  const handleClick = () => {
    window.open(job.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-h-[calc(100vh-40px)] overflow-y-auto bg-white p-8 m-8 rounded-3xl bg-white p-8 sticky top-4 mb-4">
      <header className="flex items-center justify-between">
        <img
          src="https://icons8.com/icon/G7wbX3gJW5c/hottypo"
          alt="Company Logo"
          className="h-12 w-12 rounded-xl"
        />
        <div className="flex flex-grow flex-col px-4">
          <h1 className="text-xl font-bold">{job.company}</h1>
          <p className="text-sm text-gray-500">{job.title}</p>
          <p className="text-xs text-gray-400">
            {job.location} • {job.remoteStatus}
          </p>
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-100 transition-all hover:bg-gray-200">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </div>
      </header>
      <div className="mt-8 flex gap-4">
        <div className="rounded-xl bg-green-100 px-4 py-2">
          <p className="text-xs text-gray-500">Salary</p>
          <p className="font-semibold">{job.salary}</p>
        </div>
        <div className="rounded-xl bg-blue-100 px-4 py-2">
          <p className="text-xs text-gray-500">Job Type</p>
          <p className="font-semibold">{job.employmentType}</p>
        </div>
        <div className="rounded-xl bg-purple-100 px-4 py-2">
          <p className="text-xs text-gray-500">Yrs Exp</p>
          <p className="font-semibold">{job.yrsExp}</p>
        </div>
        <div className="rounded-xl bg-purple-100 px-4 py-2">
          <p className="text-xs text-gray-500">Match</p>
          <p className="font-semibold">{`${(job.score * 100).toFixed(1)}%`}</p>
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <details className="group flex-1" open>
          <summary className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2">
            Description
          </summary>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {job.jobDesc}
          </div>
        </details>
        
        <details className="group flex-1" open>
          <summary className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2">
            Company
          </summary>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {job.compDesc}
          </div>
        </details>
      </div>

      <div className="mt-8">
        <details className="group flex-1" open>
          <summary className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2">
            Requirements
          </summary>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {(Array.isArray(requirements) ? requirements : []).map((requirement, index) => (
              <li key={index}>• {requirement}</li>
            ))}
          </ul>
        </details>
      </div>

      <button
        className="mt-8 w-full rounded-xl bg-primary py-4 text-white transition-all hover:bg-gray-600"
        onClick={handleClick}
      >
        Apply Now
      </button>
    </div>
  );
}
