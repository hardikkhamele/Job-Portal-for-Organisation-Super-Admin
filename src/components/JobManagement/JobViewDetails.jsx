import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../../redux/slice/jobManagement/getJobId";
import {
  Phone,
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  GraduationCap,
  Wallet,
  CircleChevronLeft,
  CircleCheck,
  Link,
} from "lucide-react";
import CopyRight from "../common/CopyRight";
import Footer from "../Footer";

function JobViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux Store
  const { job, loading, error } = useSelector((state) => state.jobDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="p-6">
        <div className="flex justify-center items-center mt-45 ">
          <div className="animate-spin rounded-full h-12 w-12 mt-12 border-b-3 border-purple-600"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-500">
        Error: {error.message || "Failed to load"}
      </div>
    );
  if (!job) return <div className="p-6">No Data Found</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        {/* 🔹 Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
          >
            <CircleChevronLeft size={28} />
          </button>
          <h2 className="text-lg font-semibold">View Details</h2>
        </div>

        <hr className="border-gray-300 mt-2 mb-1" />

        {/* 🔹 Company Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            {/* Logic for logo - fallback if not in API */}
            {/* <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center font-bold text-purple-700">
              {job.jobTitle.charAt(0)}
            </div> */}
            <div>
              {/* <h3 className="font-semibold text-lg">{job.jobRole}</h3> */}
              {/* <p className="text-sm text-gray-500">
                Status: {job.status}
              </p> */}
            </div>
          </div>

          {/* <div className="flex items-center gap-4 text-sm">
            <span className="text-green-600 flex items-center gap-1">
              <CircleCheck size={20} />
              {job.status === "active" ? "Active" : "Inactive"}
            </span>
          </div> */}
        </div>

        {/* <hr className="border-gray-300 mt-2 mb-5" /> */}

        {/* 🔹 Job Title */}
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-3 py-1 rounded-xl bg-gray-200 text-gray-700">
              {job.advanceInformation?.jobLevel}
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-xl">
              {job.advanceInformation?.jobType}
            </span>
          </div>
        </div>

        {/* 🔹 Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {job.jobDescription}
            </p>

            <h3 className="font-semibold mt-6 mb-2">Responsibilities</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {job.jobResponsibilities}
            </p>

            <h3 className="font-semibold mt-6 mb-2">Skills Required</h3>
            <div className="flex gap-2 flex-wrap">
              {job.skillsRequired?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="border border-purple-200 rounded-xl p-4">
            <h3 className="font-semibold mb-4">Job Overview</h3>

            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex gap-3 items-center">
                <Calendar size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Job Posted</p>
                  <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Calendar size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Job Expire</p>
                  <p>
                    {new Date(
                      job.advanceInformation?.expireDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <GraduationCap size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Education</p>
                  <p>{job.advanceInformation?.education}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Wallet size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Salary ({job.salaryType})</p>
                  <p>
                    ₹{job.salaryRange?.minSalary} - ₹
                    {job.salaryRange?.maxSalary}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>{job.jobLocation?.name}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Briefcase size={18} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p>{job.advanceInformation?.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default JobViewDetails;
