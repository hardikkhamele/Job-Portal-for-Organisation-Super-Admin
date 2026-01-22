import React from "react";

const ReportedJobDetails = () => {
  return (
    <div className="bg-gray-100 p-1 min-h-screen flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Reported Jobs Details</h2>

        {/* Job Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-start">
          {/* Left - Job Details */}
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">G</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Networking Engineer</h3>
              <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">Full Time</span>
              <p className="text-red-600 text-sm mt-1">⚠️ Reported by 1347 People as Spam</p>
            </div>
          </div>

          {/* Right - Buttons */}
          <div className="flex gap-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Delete Job Post</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">View Company</button>
          </div>
        </div>

        {/* Layout - Left (Description) | Right (Overview & Review) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Section - Job Description & Responsibilities */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              As a Senior UI/UX Designer, you will craft intuitive and visually compelling designs that enhance user experiences. You will collaborate closely with product managers and developers, leading the end-to-end design process...
            </p>

            <h3 className="text-lg font-semibold mt-4">Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
              <li>Conduct user research to identify pain points and opportunities.</li>
              <li>Create wireframes, prototypes, and user flows.</li>
              <li>Collaborate with developers to ensure feasibility.</li>
              <li>Iterate designs based on feedback and usability testing.</li>
              <li>Ensure designs meet accessibility standards.</li>
              <li>Document design processes and maintain component libraries.</li>
            </ul>
          </div>

          {/* Right Section - Job Overview & Review */}
          <div className="md:col-span-1 space-y-4">
            {/* Job Overview */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-md font-semibold mb-2">Job Overview</h3>
              <div className="text-sm space-y-1">
                <p><strong>Job Posted:</strong> 14 June, 2021</p>
                <p><strong>Job Expire In:</strong> 14 July, 2021</p>
                <p><strong>Salary:</strong> $50k-80k/month</p>
                <p><strong>Education:</strong> Graduation</p>
              </div>
            </div>

            {/* Review About Spam */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-md font-semibold mb-2">Review about Spam</h3>
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold">Cameron ⭐⭐⭐⭐</p>
                  <p className="text-xs text-gray-600">
                    "I recently attended a networking engineer interview, but it turned out to be a scam. They lacked a proper company presence..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>








  );
};

export default ReportedJobDetails;
