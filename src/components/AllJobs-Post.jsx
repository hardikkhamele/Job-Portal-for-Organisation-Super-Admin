import React from "react";
import { Routes, Route } from "react-router-dom";

import JobPost from "./JobPost";
import ReportedJobs from "./ReportedJobs";
import RecentlyJobs from "./RecentlyJobs";
import Company_Details from "./Company_Details";
import ReportedJobDetails from "./ReportedJobDetails";
import Footer from "./Footer";

export default function AllJobPosts() {
  return (
    <div className=" flex h-screen p-4 overflow-auto">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-4">
              <JobPost />
              <ReportedJobs />
              <RecentlyJobs />
              <ReportedJobDetails />
              <Company_Details />
              <Footer />
            </div>
          }
        />
        <Route path="/settings" element={<h1>Settings Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
    </div>
  );
}
