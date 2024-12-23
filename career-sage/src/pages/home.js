import React from "react";
import "../static/style.css";

function Home() {
  return (
    <main className="px-8 py-12 flex-1 flex flex-col justify-center items-center">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-title mb-4">
          Find the Perfect Job for You!
        </h2>
        <p className="text-lg text-neutral-600">
          Let us do the hard work! With our automated platform, we'll match you
          to the best job opportunities and even prepare you for the interview
          process.
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
  );
}

export default Home;
