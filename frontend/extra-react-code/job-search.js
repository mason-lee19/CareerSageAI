import React from "react";

/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./style.css";

export const MyPlugin = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[1200px] min-h-screen flex flex-col mx-auto bg-white rounded-lg shadow-lg">
        {" "}
        {/* Top Navigation Bar */}
        <nav className="flex justify-between items-center p-6 bg-primary-500 rounded-t-lg">
          <div className="text-2xl font-title text-white">CareerSageAI</div>
          <ul className="flex space-x-6 text-lg text-white">
            <li>
              <a href="#" className="hover:text-neutral-100">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neutral-100">
                Search Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neutral-100">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neutral-100">
                Sign In
              </a>
            </li>
          </ul>
        </nav>
        <header className="flex flex-col items-center p-8 text-center">
          <h1 className="text-4xl font-bold font-title mb-4 text-neutral-950">
            CareerSageAI
          </h1>
          <p className="text-lg text-neutral-700">
            Find the job that best fits your skills and experience
          </p>
        </header>
        <section className="flex justify-center p-6">
          <div className="w-[600px] relative">
            <input
              type="text"
              placeholder="Search jobs by title, skill, or company..."
              className="w-full p-4 text-lg border border-neutral-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="absolute right-2 top-2 p-3 bg-primary-500 text-white rounded-md">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </section>
        {/* Filter Section */}
        <section className="p-6">
          <details className="relative bg-neutral-100 rounded-md border border-neutral-300 p-4">
            <summary className="cursor-pointer font-semibold text-neutral-900">
              Filter Options
            </summary>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-neutral-700">Location:</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="flex-1 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-neutral-700">Job Type:</label>
                <select className="flex-1 p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-neutral-700">Salary Range:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-[80px] p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-[80px] p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md">
                Apply Filters
              </button>
            </div>
          </details>
        </section>
        <main className="flex-1 p-6 space-y-4 overflow-auto">
          <article className="p-4 bg-neutral-100 rounded-md">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Your Matched Jobs:
            </h2>
            <div className="p-4 flex flex-col gap-4">
              {/* 1st Job Listing */}
              <details className="p-4 bg-white rounded-md border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      Software Engineer
                    </h3>
                    <p className="text-neutral-700">
                      Company: TechInnovators Inc.
                    </p>
                    <p className="text-neutral-700">Location: New York, NY</p>
                    <p className="text-neutral-700">
                      Salary: $120,000 - $150,000
                    </p>
                  </div>
                  <button className="p-2 w-[40px] h-[40px] bg-primary-500 text-white rounded-full">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </summary>
                <div className="mt-4">
                  <p className="text-neutral-700">
                    Description: Join a dynamic and innovative team at
                    TechInnovators Inc. Develop cutting-edge software and manage
                    solutions with a high impact on our clients.
                  </p>
                </div>
              </details>

              {/* 2nd Job Listing */}
              <details className="p-4 bg-white rounded-md border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      Data Scientist
                    </h3>
                    <p className="text-neutral-700">Company: DataSolve</p>
                    <p className="text-neutral-700">
                      Location: San Francisco, CA
                    </p>
                    <p className="text-neutral-700">
                      Salary: $110,000 - $140,000
                    </p>
                  </div>
                  <button className="p-2 w-[40px] h-[40px] bg-primary-500 text-white rounded-full">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </summary>
                <div className="mt-4">
                  <p className="text-neutral-700">
                    Description: Apply your data science skills to solve
                    challenging problems and develop predictive models in the
                    exciting field of machine learning.
                  </p>
                </div>
              </details>

              {/* 3rd Job Listing */}
              <details className="p-4 bg-white rounded-md border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      UX Designer
                    </h3>
                    <p className="text-neutral-700">Company: Creativa</p>
                    <p className="text-neutral-700">Location: Austin, TX</p>
                    <p className="text-neutral-700">
                      Salary: $90,000 - $120,000
                    </p>
                  </div>
                  <button className="p-2 w-[40px] h-[40px] bg-primary-500 text-white rounded-full">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </summary>
                <div className="mt-4">
                  <p className="text-neutral-700">
                    Description: Work closely with our design team to create
                    user-friendly and visually appealing experiences for apps
                    and websites at Creativa.
                  </p>
                </div>
              </details>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
