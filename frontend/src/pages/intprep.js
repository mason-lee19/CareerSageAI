import React from "react";
import "../static/style.css";

function Contact() {
  return (
    <div id="webcrumbs">
      <div className="w-[1200px] min-h-[800px] bg-white rounded-lg shadow-lg flex flex-col justify-between">
        {" "}
        {/* Top Navigation Bar */}
        {/* Chat Section */}
        <main className="p-6 space-y-4 flex-grow overflow-y-auto">
          <article className="p-4 bg-neutral-100 rounded-md">
            <h2 className="text-2xl font-semibold text-neutral-900">
              AI Assistant:
            </h2>
            <div className="p-4 flex flex-col gap-4">
              {/* AI Response 1 */}
              <details
                open
                className="p-4 bg-white rounded-md border border-neutral-200"
              >
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      Give me practice questions for a software engineering
                      position.
                    </h3>
                  </div>
                </summary>
                <div className="mt-4">
                  <p className="text-neutral-700">
                    I can help you with mock interviews, resume advice, and
                    practice questions based on your preferences.
                  </p>
                </div>
              </details>

              {/* User Response */}
              <details
                open
                className="p-4 bg-white rounded-md border border-neutral-200"
              >
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      List me tips to help me during a system design interview
                      for a software engineering position.
                    </h3>
                  </div>
                </summary>
                <div className="mt-4">
                  <p className="text-neutral-700">
                    I am looking for some practice questions and tips.
                  </p>
                </div>
              </details>

              {/* AI Response 2 */}
              <details
                open
                className="p-4 bg-white rounded-md border border-neutral-200"
              >
                <summary className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-950">
                      Give me common python coding questions for a backend
                      engineer.
                    </h3>
                  </div>
                </summary>
                <div className="mt-4 space-y-2">
                  {[
                    "Can you explain the difference between a stack and a queue?",
                    "How would you optimize this algorithm?",
                    "Can you walk through a project you are proud of?",
                  ].map((question, idx) => (
                    <p
                      key={idx}
                      className="text-neutral-700 cursor-pointer hover:text-primary-500"
                      onClick={() =>
                        (document.querySelector('input[type="text"]').value =
                          question)
                      }
                    >
                      {question}
                    </p>
                  ))}
                </div>
              </details>
            </div>
          </article>
        </main>
        {/* Bottom Input Section for Chatting */}
        <section className="flex p-6 bg-white border-t border-neutral-200">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-4 text-lg border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="absolute right-2 top-2 p-3 bg-primary-500 text-white rounded-full">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
