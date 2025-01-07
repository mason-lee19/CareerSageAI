import React from "react";
import "../static/style.css";

function Home() {
  return (
    <main className="px-8 py-12 flex-1 flex flex-col justify-center items-center">
      <section
        id="hero"
        className="h-[400px] relative flex items-center justify-center text-center text-neutral-50"
      >
        <div className="absolute inset-0 bg-cover"></div>
        <div className="relative z-10 px-6">
          <h2 className="font-title text-4xl mb-4">
            Your Dream Job, Just a Resume Away
          </h2>
          <p className="text-lg mb-6">
            Upload your resume, and let our smart algorithms find your perfect
            job matches with a match score.
          </p>
          <a
            href="#how-it-works"
            className="bg-primary-500 text-primary-50 px-6 py-3 rounded-full text-lg"
          >
            Get Started Now
          </a>
        </div>
      </section>

      <section id="how-it-works" className="py-16">
        <h3 className="text-2xl font-title text-center mb-12">How It Works</h3>
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-[250px] w-[400px] bg-neutral-200 rounded-md mx-auto mb-4 flex-1 items-center justify-center">
              <span className="material-symbols-outlined text-primary-500 text-6xl py-12">
                account_circle
              </span>
              <h4 className="text-xl font-semibold mb-2 py-3">
                Login and Create a Profile
              </h4>
              <p>Sign up and tell us about yourself.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="h-[250px] w-[400px] bg-neutral-200 rounded-md mx-auto mb-4 flex-1 items-center justify-center">
              <span className="material-symbols-outlined text-primary-500 text-6xl py-12">
                upload
              </span>
              <h4 className="text-xl font-semibold mb-2 py-3">
                Upload Your Resume
              </h4>
              <p>Let our algorithms analyze your skills and experiences.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="h-[250px] w-[400px] bg-neutral-200 rounded-md mx-auto mb-4 flex-1 items-center justify-center">
              <span className="material-symbols-outlined text-primary-500 text-6xl py-12">
                search
              </span>
              <h4 className="text-xl font-semibold mb-2 py-3">
                Find Your Matches
              </h4>
              <p>
                Search for jobs based on your skills and keywords, and see a
                match score for each job.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="px-8 py-16 bg-neutral-200 bg-primary rounded-t-lg rounded-b-lg"
      >
        <h3 className="text-2xl font-title text-center mb-12">Features</h3>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">AI-Powered Matching</h4>
            <p>Advanced algorithms tailored to your resume.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Match Score</h4>
            <p>Quantify how well you align with each job.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Keyword Insights</h4>
            <p>Discover relevant jobs based on your search criteria.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16">
        <h3 className="text-2xl font-title text-center mb-12">
          What Our Users Say
        </h3>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/avatars/1"
              alt=""
              className="h-[100px] w-[100px] rounded-full mb-4 object-contain"
            />
            <p>"This platform helped me find my perfect job in days!"</p>
            <span className="mt-2 text-sm font-semibold">John Doe</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/avatars/2"
              alt=""
              className="h-[100px] w-[100px] rounded-full mb-4 object-contain"
            />
            <p>"The match score made choosing the right jobs so easy."</p>
            <span className="mt-2 text-sm font-semibold">Jane Smith</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
