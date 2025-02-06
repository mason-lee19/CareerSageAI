import React from "react";

export default function MiniJobCell({
  index,
  company,
  jobTitle,
  location,
  contractType,
  experience,
  pay,
  requirements,
  matchPercent,
}) {
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
            <h3 className="font-semibold">{company}</h3>
            <p className="text-sm text-gray-500">{jobTitle}</p>
            <p className="text-xs text-gray-400">{location}</p>
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
          {pay}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Requirements : {requirements.substring(0, 200)}
      </p>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-[100px] bg-gray-300 rounded-full h-[8px] overflow-hidden">
            <div
              className="bg-primary-500 h-full"
              style={{ width: matchPercent }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{matchPercent} Match</span>
        </div>
        <span className="text-sm text-gray-500">1h ago</span>
      </div>
    </div>
  );
}
