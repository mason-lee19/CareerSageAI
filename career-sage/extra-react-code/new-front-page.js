import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./style.css";

export const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[1200px] rounded-lg shadow-lg bg-white min-h-[2000px] text-neutral-950 font-sans">
    	  <header className="sticky top-0 bg-white z-10 shadow-md">
    	    <nav className="flex justify-between items-center p-6">
    	      <h1 className="text-primary-500 font-title text-xl">DreamJob</h1>
    	      <ul className="flex gap-6 text-neutral-950">
    	        <li><a href="#hero" className="hover:text-primary-500">Home</a></li>
    	        <li><a href="#how-it-works" className="hover:text-primary-500">How It Works</a></li>
    	        <li><a href="#features" className="hover:text-primary-500">Features</a></li>
    	        <li><a href="#testimonials" className="hover:text-primary-500">Testimonials</a></li>
    	        <li><a href="#faq" className="hover:text-primary-500">FAQ</a></li>
    	        <li><a href="#contact" className="hover:text-primary-500">Contact</a></li>
    	      </ul>
    	    </nav>
    	  </header>
    	
    	  <section id="hero" className="h-[800px] relative flex items-center justify-center text-center text-neutral-50">
    	    <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('https://tools-api.webcrumbs.org/image-placeholder/1200/800/job/search')` }}></div>
    	    <div className="absolute inset-0 bg-black opacity-50"></div>
    	    <div className="relative z-10 px-6">
    	      <h2 className="font-title text-4xl mb-4">Your Dream Job, Just a Resume Away</h2>
    	      <p className="text-lg mb-6">Upload your resume, and let our smart algorithms find your perfect job matches with a match score.</p>
    	      <a href="#how-it-works" className="bg-primary-500 text-primary-50 px-6 py-3 rounded-full text-lg">Get Started Now</a>
    	    </div>
    	  </section>
    	
    	  <section id="how-it-works" className="py-16">
    	    <h3 className="text-2xl font-title text-center mb-12">How It Works</h3>
    	    <div className="grid grid-cols-3 gap-8">
    	      <div className="text-center">
    	        <div className="h-[200px] w-[200px] bg-neutral-200 rounded-md mx-auto mb-4 flex items-center justify-center">
    	          <span className="material-symbols-outlined text-primary-500 text-6xl">account_circle</span>
    	        </div>
    	        <h4 className="text-xl font-semibold mb-2">Login and Create a Profile</h4>
    	        <p>Sign up and tell us about yourself.</p>
    	      </div>
    	      <div className="text-center">
    	        <div className="h-[200px] w-[200px] bg-neutral-200 rounded-md mx-auto mb-4 flex items-center justify-center">
    	          <span className="material-symbols-outlined text-primary-500 text-6xl">upload</span>
    	        </div>
    	        <h4 className="text-xl font-semibold mb-2">Upload Your Resume</h4>
    	        <p>Let our algorithms analyze your skills and experiences.</p>
    	      </div>
    	      <div className="text-center">
    	        <div className="h-[200px] w-[200px] bg-neutral-200 rounded-md mx-auto mb-4 flex items-center justify-center">
    	          <span className="material-symbols-outlined text-primary-500 text-6xl">search</span>
    	        </div>
    	        <h4 className="text-xl font-semibold mb-2">Find Your Matches</h4>
    	        <p>Search for jobs based on your skills and keywords, and see a match score for each job.</p>
    	      </div>
    	    </div>
    	  </section>
    	
    	  <section id="features" className="py-16 bg-neutral-100">
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
    	    <h3 className="text-2xl font-title text-center mb-12">What Our Users Say</h3>
    	    <div className="flex gap-8">
    	      <div className="flex flex-col items-center">
    	        <img src="https://tools-api.webcrumbs.org/image-placeholder/100/100/avatars/1" alt="" className="h-[100px] w-[100px] rounded-full mb-4 object-contain" />
    	        <p>"This platform helped me find my perfect job in days!"</p>
    	        <span className="mt-2 text-sm font-semibold">John Doe</span>
    	      </div>
    	      <div className="flex flex-col items-center">
    	        <img src="https://tools-api.webcrumbs.org/image-placeholder/100/100/avatars/2" alt="" className="h-[100px] w-[100px] rounded-full mb-4 object-contain" />
    	        <p>"The match score made choosing the right jobs so easy."</p>
    	        <span className="mt-2 text-sm font-semibold">Jane Smith</span>
    	      </div>
    	    </div>
    	  </section>
    	
    	  <section id="faq" className="py-16 bg-neutral-100">
    	    <h3 className="text-2xl font-title text-center mb-12">FAQ</h3>
    	    <details className="mb-4">
    	      <summary className="font-semibold cursor-pointer">How does the match score work?</summary>
    	      <p className="ml-4 mt-2">Our algorithm quantifies the similarity between your resume and job descriptions to generate a score.</p>
    	    </details>
    	    <details className="mb-4">
    	      <summary className="font-semibold cursor-pointer">Which job sites are included?</summary>
    	      <p className="ml-4 mt-2">We aggregate postings from top job sites to provide you with the best opportunities.</p>
    	    </details>
    	  </section>
    	
    	  <footer className="py-8 bg-neutral-200">
    	    <div className="flex justify-between px-8">
    	      <div>
    	        <h4 className="text-lg font-title mb-2">DreamJob</h4>
    	        <p>&copy; 2023 DreamJob. All rights reserved.</p>
    	      </div>
    	      <ul className="flex gap-6">
    	        <li><a href="#" className="hover:text-primary-500">Privacy Policy</a></li>
    	        <li><a href="#" className="hover:text-primary-500">Terms of Service</a></li>
    	      </ul>
    	    </div>
    	    <div className="flex justify-center mt-4">
    	      <a href="#" className="text-primary-500 text-xl mx-2"><i className="fa-brands fa-facebook"></i></a>
    	      <a href="#" className="text-primary-500 text-xl mx-2"><i className="fa-brands fa-twitter"></i></a>
    	      <a href="#" className="text-primary-500 text-xl mx-2"><i className="fa-brands fa-linkedin"></i></a>
    	    </div>
    	  </footer>
    	</div> 
                </div>
  )
}

