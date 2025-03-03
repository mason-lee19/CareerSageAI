import React, { useState } from "react";

export default function UpdatePopup({ job, onClose, onUpdate }) {
  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState(job.notes);

  const handleUpdate = () => {
    onUpdate({ ...job, status, notes });
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative transform transition-all">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <i className="material-symbols-outlined">close</i>
        </button>

        <h2 className="text-xl font-bold mb-6">Update Job Status</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option>Bookmarked</option>
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Interview Completed</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="material-symbols-outlined text-gray-400">
                  expand_more
                </i>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes here"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="3"
            ></textarea>
          </div>
          <div>
            <button
              className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              onClick={handleUpdate}
            >
              Update Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
