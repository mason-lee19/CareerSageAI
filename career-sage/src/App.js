import React from "react";

/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import ".static/style.css";

export const MyPlugin = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[1200px] min-h-[800px] bg-neutral-50 shadow-lg rounded-lg">
        {" "}
        <header className="w-full bg-primary px-8 py-6 text-white flex justify-between items-center rounded-t-lg">
          <h1 className="text-3xl font-title">CareerSageAI</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Search Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="px-8 py-12">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-title mb-4">
              Find the Perfect Job for You!
            </h2>
            <p className="text-lg text-neutral-600">
              Let us do the hard work! With our automated platform, we'll match
              you to the best job opportunities and even apply for you.
            </p>
            <button className="mt-8 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark">
              Get Started
            </button>
          </section>
          <section className="flex flex-wrap gap-8 justify-center">
            <div className="w-[350px] bg-white p-6 rounded-md text-center">
              <span className="material-symbols-outlined text-primary text-6xl mb-4">
                search
              </span>
              <h3 className="font-semibold text-lg mb-2">Job Matching</h3>
              <p className="text-neutral-600">
                We analyze millions of jobs to find the perfect one for you.
              </p>
            </div>

            <div className="w-[350px] bg-white p-6 rounded-md text-center">
              <span className="material-symbols-outlined text-primary text-6xl mb-4">
                chat_bubble
              </span>
              <h3 className="font-semibold text-lg mb-2">Interview Help</h3>
              <p className="text-neutral-600">
                Prepare for interviews with expert advice and practice tools.
              </p>
            </div>
            <div className="w-[350px] bg-white p-6 rounded-md text-center">
              <span className="material-symbols-outlined text-primary text-6xl mb-4">
                trending_up
              </span>
              <h3 className="font-semibold text-lg mb-2">Success Guaranteed</h3>
              <p className="text-neutral-600">
                Focused on delivering results with the best chances for success.
              </p>
            </div>
          </section>
        </main>
        <footer className="w-full bg-neutral-900 text-white py-6 text-center mt-auto rounded-b-lg">
          <p>© 2024 CareerSage. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
