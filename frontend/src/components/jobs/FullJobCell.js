import React from "react";

export default function FullJobCell({ job }) {
  const remoteStatus = "Remote";
  const contractType = "Full-Time";
  const experience = "3-5 Years";

  const handleClick = () => {
    window.open(job.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-h-[calc(100vh-40px)] overflow-y-auto bg-white p-8 m-8 rounded-3xl bg-white p-8 sticky top-4 mb-4">
      <header className="flex items-center justify-between">
        <img
          src="https://icons8.com/icon/G7wbX3gJW5c/hottypo"
          alt="Company Logo"
          className="h-12 w-12 rounded-xl"
        />
        <div className="flex flex-grow flex-col px-4">
          <h1 className="text-xl font-bold">{job.company}</h1>
          <p className="text-sm text-gray-500">{job.title}</p>
          <p className="text-xs text-gray-400">
            {job.location} • {remoteStatus}
          </p>
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-100 transition-all hover:bg-gray-200">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </div>
      </header>
      <div className="mt-8 flex gap-4">
        <div className="rounded-xl bg-green-100 px-4 py-2">
          <p className="text-xs text-gray-500">Salary</p>
          <p className="font-semibold">{job.salary}</p>
        </div>
        <div className="rounded-xl bg-blue-100 px-4 py-2">
          <p className="text-xs text-gray-500">Job Type</p>
          <p className="font-semibold">{contractType}</p>
        </div>
        <div className="rounded-xl bg-purple-100 px-4 py-2">
          <p className="text-xs text-gray-500">Skill</p>
          <p className="font-semibold">{experience}</p>
        </div>
        <div className="rounded-xl bg-purple-100 px-4 py-2">
          <p className="text-xs text-gray-500">Match</p>
          <p className="font-semibold">{`${(job.score * 100).toFixed(1)}%`}</p>
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <details className="group flex-1" open>
          <summary className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2">
            Description
          </summary>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {job.details}
          </div>
        </details>
        {/*
        <details className="group flex-1">
          <summary className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2">
            Company
          </summary>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              • Collaborates with the Digital Marketing team to propose, design
              & deliver wireframes, user journeys and UI mock-ups
            </p>
            <p>
              • Collaborate with the UX/Ui Content team to establish best
              practices for high-performing interfaces
            </p>
            <p>
              • Collaborate with Front-End Developers to ensure high quality &
              bug-free deliverables
            </p>
            <p>
              • Design high-fidelity UI prototypes for responsive websites &
              maintain consistency of our design guidelines
            </p>
            <p>
              • Keep up-to-date with the latest UI/UX & web design trends so as
              to propose improvements on current websites
            </p>
          </div>
        </details>
          */}
      </div>
      {/* 
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Requirement</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>
            • Has a Bachelor's Degree (D3) in Web Design, Digital Media, or
            related major
          </li>
          <li>
            • Has more than 3 years of experience in building high-performing
            websites
          </li>
          <li>
            • Has strong portfolio that covers UI design that produces clean &
            effective lead-gen web pages & a deep understanding of SEO
            structures and responsive design
          </li>
          <li>
            • Has a deep understanding of the importance of User-centered design
            & design thinking
          </li>
          <li>
            • An outstanding professional user (opt) goes through great design
          </li>
          <li>
            • Able to meet aggressive deadlines in a fast-paced environment
          </li>
          <li>• Have a keen of aesthetics & attention to detail</li>
          <li>
            • Proficient in Figma, Illustrator, Photoshop, and other web
            building tools
          </li>
          <li>• Knowledge in HTML, CSS, JavaScript & WordPress builds</li>
        </ul>
      </div>
      */}
      <button
        className="mt-8 w-full rounded-xl bg-primary py-4 text-white transition-all hover:bg-gray-600"
        onClick={handleClick}
      >
        Apply Now
      </button>
    </div>
  );
}
