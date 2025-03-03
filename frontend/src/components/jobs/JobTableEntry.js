import React, { useState } from "react";

export default function JobTableEntry({ jobBookmark, onOpenPopup }) {
  const statusColors = {
    Bookmarked: "bg-gray-100 text-gray-800",
    Applied: "bg-blue-100 text-blue-800",
    "Interview Scheduled": "bg-yellow-100 text-yellow-800",
    "Interview Completed": "bg-purple-100 text-purple-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
      <td className="px-6 py-4 text-gray-800">{jobBookmark.jobTitle}</td>
      <td className="px-6 py-4 text-gray-800">{jobBookmark.company}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[jobBookmark.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {jobBookmark.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-800">{jobBookmark.date}</td>
      <td className="px-6 py-4 p-3 max-w-[400px] overflow-hidden text-gray-800">
        {" "}
        {jobBookmark.notes}
      </td>
      <td className="px-6 py-4">
        <button
          className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-200 transition-colors duration-150 hover:shadow-sm"
          onClick={() => onOpenPopup(jobBookmark)}
        >
          Update Status
        </button>
      </td>
    </tr>
  );
}
