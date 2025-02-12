import React from "react";

export default function MiniJobCell({ index, job }) {
  const contractType = "Full Time";
  const experience = "3-5 Years";

  console.log(job);
  return (
    <div
      key={index}
      className="bg-white p-4 rounded-3xl space-y-4 hover:shadow-xl hover:bg-gray-300 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl text-white">N</span>
          </div>
          <div>
            <h3 className="font-semibold">{job.company}</h3>
            <p className="text-sm text-gray-500">{job.title}</p>
            <p className="text-xs text-gray-400">{job.location}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>

      <div className="flex gap-3">
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {contractType}
        </span>
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {experience}
        </span>
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
          {job.salary}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Details : {job.details.substring(0, 200)}
      </p>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-[100px] bg-gray-300 rounded-full h-[8px] overflow-hidden">
            <div
              className="bg-primary-500 h-full"
              style={{ width: `${(job.score * 100).toFixed(1)}%`}}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{`${(job.score * 100).toFixed(1)}%`} Match</span>
        </div>
        <span className="text-sm text-gray-500">{job.pullDate}</span>
      </div>
    </div>
  );
}
