import React, { useEffect } from "react";
import { ArrowLeft, MapPin, Mail, Phone, Briefcase, GraduationCap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidateById, clearCandidateDetails } from "../../redux/slice/databaseManagement/getCandidateByIdSlice";

// Assets
import universityImg from "../../assets/university.png";

const CandidateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { candidate, loading, error } = useSelector((state) => state.candidateDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchCandidateById(id));
    }
    return () => dispatch(clearCandidateDetails());
  }, [dispatch, id]);

  if (loading) return <div className="p-10 text-center font-bold text-purple-600">Loading Profile...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-medium">{error}</div>;
  if (!candidate) return null;

  const { personalInfo, professionalInfo, category, subCategory, designation } = candidate;

  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 cursor-pointer hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold">Candidate Profile</h2>
        </div>

        <hr className="mb-6 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: Personal & Basic Info */}
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              {/* Profile Initial Avatar if no image */}
              <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {personalInfo?.name?.[0]}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">{personalInfo?.name}</h3>
                <p className="text-purple-600 font-medium">{designation?.name || "No"}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin size={14} />
                  <span>{personalInfo?.location || "Location not specified"}</span>
                </div>
              </div>
            </div>

            {/* Contact Quick Info */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 truncate">{personalInfo?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{personalInfo?.phone}</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-semibold text-gray-800">Skills & Technology</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo?.technology ? (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
                    {personalInfo.technology}
                  </span>
                ) : (
                  <p className="text-sm text-gray-400 italic">No skills listed</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="text-gray-700" />
                <h4 className="font-semibold text-lg">Education</h4>
              </div>
              <div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img src={universityImg} alt="edu" className="w-10 h-10 object-contain mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">{personalInfo?.education || "No"}</p>
                  <p className="text-sm text-gray-500">Highest Qualification</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Professional Info */}
          <div className="md:border-l md:pl-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="text-gray-700" />
                <h4 className="font-semibold text-lg">Professional Details</h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="font-medium text-gray-800">{professionalInfo?.experience || "Fresher"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Relevant Experience</p>
                    <p className="font-medium text-gray-800">{professionalInfo?.relevantExperience || "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current CTC</p>
                    <p className="font-medium text-gray-800">{professionalInfo?.currentCTC || "Not Disclosed"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Expected CTC</p>
                    <p className="font-medium text-gray-800">{professionalInfo?.expectedCTC || "Negotiable"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Notice Period</p>
                    <p className="font-medium text-gray-800">{professionalInfo?.noticePeriod || "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p className="font-medium text-gray-800">{category?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Subcategory</p>
                    <p className="font-medium text-gray-800">{subCategory?.name}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Projects / Frontend Tech</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-dashed">
                    {professionalInfo?.project || "No major projects listed in the database."}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2 text-sm">Deployment Readiness</h4>
              <div className="flex justify-between text-xs">
                <span>Willing to relocate: <b className="text-purple-700">{personalInfo?.relocate || "N/A"}</b></span>
                <span>Owns Laptop: <b className="text-purple-700">{professionalInfo?.laptop || "N/A"}</b></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;