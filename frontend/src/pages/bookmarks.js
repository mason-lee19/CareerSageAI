import React from "react";

export default function bookmarks() {
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
                  <th className="px-6 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-800">
                    Frontend Developer
                  </td>
                  <td className="px-6 py-4 text-gray-800">TechCorp</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Bookmarked
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">2023-06-15</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm">
                      Update Status
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-800">UX Designer</td>
                  <td className="px-6 py-4 text-gray-800">DesignHub</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Interview Scheduled
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">2023-06-18</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm">
                      Update Status
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-800">Data Analyst</td>
                  <td className="px-6 py-4 text-gray-800">DataWorks</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Applied
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">2023-06-20</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm">
                      Update Status
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-800">Product Manager</td>
                  <td className="px-6 py-4 text-gray-800">ProductPro</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Bookmarked
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">2023-06-22</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm">
                      Update Status
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-800">Backend Engineer</td>
                  <td className="px-6 py-4 text-gray-800">ServerSolutions</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      Interview Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800">2023-06-25</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm">
                      Update Status
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
