import React from "react";
import Link from "next/link";
import animationData from "../../assets/getting-started.json"
import dynamic from 'next/dynamic';

const Lottie = dynamic(()=> import('react-lottie-player'),{ssr:false});

export default function Home() {
  return (
    <main className="px-8 flex-1 flex flex-col justify-center items-center">
      <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      <section
        id="hero"
        className="w-screen min-h-screen relative flex items-center justify-center text-center"
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
          <Link
            href="/auth/login"
            className="text-white bg-primary px-6 py-3 rounded-md text-lg"
          >
            Get Started Now
          </Link>
          
        </div>
        
      </section>
      <div className="bottom-0 w-full px-4 pb-4 text-neutral-500 flex justify-between items-center">
        <span className="absolute left-4 bottom-4">Scroll to discover CareerSage</span>
        <span className="material-symbols-outlined absolute right-4 bottom-4">arrow_downward</span>
      </div>

      <section className='min-h-[600px]'>
        <h2 className="text-4xl font-title text-neutral-950 text-center mb-12">Features</h2>
        <div className="grid grid-cols-3 gap-6">
    	    <div className="border border-neutral-200 rounded-md p-8 bg-white">
    	      <div className="flex justify-center mb-6">
            <span className="material-symbols-outlined text-primary-500 !text-4xl py-6">
                Check
              </span>
    	      </div>
    	      <h3 className="text-lg font-bold text-neutral-950 mb-4">AI-Powered Matching</h3>
    	      <ul className="text-neutral-950 text-sm">
    	        <li className="mb-2 flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
                <p className="text-sm">
                  <span className="font-bold">Tailored Matches: </span> 
                  Find jobs that perfectly fit your skills and experience.
                </p>
    	        </li>
    	        <li className="mb-2 flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
                <p className="text-sm">
                  <span className="font-bold">Seamless Setup: </span> 
                  Just upload your resume - AI does the rest.
                </p>
    	        </li>
    	        <li className="flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
                <p className="text-sm">
                  <span className="font-bold">Smart Insights: </span> 
                  Real-time matching with thousands of listings.
                </p>
    	        </li>
    	      </ul>
    	    </div>
    	    <div className="border border-neutral-200 rounded-md p-8 bg-white">
    	      <div className="flex justify-center mb-6">
            <span className="material-symbols-outlined text-primary-500 !text-4xl py-6">
                Sliders
              </span>
    	      </div>
    	      <h3 className="text-lg font-bold text-neutral-950 mb-4">Match Scoring</h3>
    	      <ul className="text-neutral-950 text-sm">
    	        <li className="mb-2 flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
    	          <p className="text-sm">
                  <span className="font-bold">Fit Scores: </span> 
                  See how well you match each job at a glance.
                </p>
    	        </li>
    	        <li className="mb-2 flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
    	          <p className="text-sm">
                  <span className="font-bold">Data-Driven Insights: </span> 
                  Scores are based on you skills, experience, and job requirements.
                </p>
    	        </li>
    	        <li className="flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
    	          <p className="text-sm">
                  <span className="font-bold">Streamlined results: </span> 
                  Quickly identify the best opportunities for you.
                </p>
    	        </li>
    	      </ul>
    	    </div>
    	    <div className="border border-neutral-200 rounded-md p-8 bg-white">
    	      <div className="flex justify-center mb-6">
            <span className="material-symbols-outlined text-primary-500 !text-4xl py-6">
                Partner_Reports
              </span>
    	      </div>
    	      <h3 className="text-lg font-bold text-neutral-950 mb-4">Keyword Insights</h3>
    	      <ul className="text-neutral-950 text-sm">
    	        <li className="mb-2 flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
    	          <p className="text-sm">
                  <span className="font-bold">Undestand Job Trends: </span> 
                  Identify the most common keywords and requirments for specific roles.
                </p>
    	        </li>
    	        <li className="flex items-start">
    	          <span className="material-symbols-outlined text-red-500 mr-2">check_circle</span>
    	          <p className="text-sm">
                  <span className="font-bold">Stay Competitive: </span> 
                  Align your resume with the expectations of your target position.
                </p>
    	        </li>
    	      </ul>
    	    </div>
                </div>
      </section>

      <section id="getting-started" className="bg-neutral-50 py-16 w-screen min-h-screen">
        <div className="container mx-auto">
          <h3 className="text-4xl font-title text-center mb-12">
            Getting Started
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8">
            <div className="flex flex-col gap-12">
              <div className="bg-white border border-neutral-300 rounded-md px-6 py-6 mx-auto w-full max-w-md shadow-md">
                <span className="material-symbols-outlined text-primary-500 !text-4xl py-6">
                  account_circle
                </span>
                <h4 className="text-xl font-semibold mb-2">
                  Login and Create a Profile
                </h4>
                <p>Sign up and tell us about yourself.</p>
              </div>
              <div className="bg-white border border-neutral-300 rounded-md px-6 py-6 mx-auto w-full max-w-md shadow-md">
                <span className="material-symbols-outlined text-primary-500 !text-3xl py-6">
                  Upload
                </span>
                <h4 className="text-xl font-semibold mb-2">Upload your resume</h4>
                <p>Let our algorithms analyze your skills and experiences.</p>
              </div>
              <div className="bg-white border border-neutral-300 rounded-md px-6 py-6 mx-auto w-full max-w-md shadow-md">
                <span className="material-symbols-outlined text-primary-500 !text-4xl py-6">
                  Search
                </span>
                <h4 className="text-xl font-semibold mb-2">Find your matches</h4>
                <p>
                  Search for jobs based on your skills and keywords, and see a
                  match score for each job.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 600, height: 600 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 min-h-[600px]">
        <h3 className="text-4xl font-title text-center mb-12">
          What Our Users Say
        </h3>
        <div className="flex gap-32">
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
