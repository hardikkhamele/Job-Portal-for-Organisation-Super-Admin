import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Loader2, Mail, Phone, MapPin, User,
  Briefcase, GraduationCap, Award, FileText, Star,
} from "lucide-react";
import {
  getJobSeekerById,
  clearSelectedJobSeeker,
} from "../../redux/slice/jobseeker/jobseekerSlice";

function CandidateDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { selectedJobSeeker: user, detailLoading, error } = useSelector(
    (state) => state.jobseeker
  );

  useEffect(() => {
    if (userId) dispatch(getJobSeekerById(userId));
    return () => dispatch(clearSelectedJobSeeker());
  }, [userId, dispatch]);

  // ── Loading ──────────────────────────────────────────────
  if (detailLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F6FA]">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

  // ── Error / Empty ────────────────────────────────────────
  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F4F6FA] gap-4">
        <p className="text-gray-500 text-lg">
          {error || "No candidate data found."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 hover:underline"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  // ── Destructure ──────────────────────────────────────────
  const basic = user.basicDetails || {};
  const work = user.workExperience || {};
  const skills = user.skillsAndPreference || {};
  const docs = user.documents || {};
  const plan = user.activePlan || {};

  // ── Sub-components ────────────────────────────────────────
  const Section = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Icon size={18} className="text-purple-600" />
        </div>
        <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right max-w-[60%]">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div className="bg-[#F4F6FA] min-h-screen p-4">
      <div className="max-w-9xl mx-auto">

        {/* ── Header Card ─────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Candidate Profile
            </h1>
          </div>
          <hr className="border-gray-200" />

          {/* Profile Hero */}
          <div className="flex items-start gap-5 mt-5 flex-wrap">
            {docs.photo ? (
              <img
                src={docs.photo}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-300"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center text-2xl font-bold text-purple-700">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.fullName}
                </h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    user.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {user.isVerified ? "✓ Verified" : "Unverified"}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                  {user.role}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-1">@{user.username}</p>

              <div className="flex gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail size={14} className="text-purple-500" />
                  {user.email}
                </span>
                {user.mobileNumber && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone size={14} className="text-purple-500" />
                    {user.mobileNumber}
                  </span>
                )}
                {basic.location && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} className="text-purple-500" />
                    {basic.location}
                  </span>
                )}
              </div>
            </div>

            {docs.resume && (
              <a
                href={docs.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg self-start"
              >
                <FileText size={16} /> View Resume
              </a>
            )}
          </div>
        </div>

        {/* ── Grid Sections ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Basic Details */}
          <Section icon={User} title="Basic Details">
            <InfoRow
              label="Date of Birth"
              value={
                basic.dateOfBirth
                  ? new Date(basic.dateOfBirth).toLocaleDateString("en-IN")
                  : null
              }
            />
            <InfoRow label="Gender" value={basic.gender} />
            <InfoRow label="Location" value={basic.location} />
            <InfoRow
              label="Profile Completed"
              value={user.profileCompleted ? "Yes" : "No"}
            />
            <InfoRow
              label="Verification Method"
              value={user.verificationMethod}
            />
          </Section>

          {/* Active Plan */}
          <Section icon={Star} title="Active Plan">
            <InfoRow
              label="Plan Name"
              value={plan.planName || "No Active Plan"}
            />
            <InfoRow
              label="Expires At"
              value={
                plan.expiresAt
                  ? new Date(plan.expiresAt).toLocaleDateString("en-IN")
                  : "—"
              }
            />
            <InfoRow
              label="Jobs Applied / Limit"
              value={`${plan.jobsAppliedThisMonth || 0} / ${plan.canApplyJobsPerMonth || 0}`}
            />
            <InfoRow
              label="Profile Boost"
              value={plan.profileBoost ? "✓ Active" : "✗ Inactive"}
            />
            <InfoRow
              label="Job Alert"
              value={plan.jobAlert ? "✓ Active" : "✗ Inactive"}
            />
            <InfoRow
              label="Support"
              value={plan.support ? "✓ Active" : "✗ Inactive"}
            />
          </Section>

          {/* Skills & Preferences */}
          <Section icon={Star} title="Skills & Preferences">
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.skills?.length > 0 ? (
                  skills.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills added</span>
                )}
              </div>
            </div>
            <InfoRow
              label="Preferred Designation"
              value={skills.preferredDesignation}
            />
            <InfoRow
              label="Preferred Location"
              value={skills.preferredLocation}
            />
          </Section>

          {/* Work Experience */}
          <Section icon={Briefcase} title="Work Experience">
            {work.isFresher ? (
              <p className="text-sm text-gray-500">
                Fresher — No experience yet
              </p>
            ) : work.experiences?.length > 0 ? (
              <div className="space-y-3">
                {work.experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          {exp.jobTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          {exp.companyName}
                        </p>
                      </div>
                      {exp.currentlyWorking && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(exp.startDate).toLocaleDateString("en-IN")} —{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-IN")
                        : "—"}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                        {exp.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No experience added</p>
            )}
          </Section>

          {/* Education */}
          <Section icon={GraduationCap} title="Education">
            {user.educationDetails?.length > 0 ? (
              <div className="space-y-3">
                {user.educationDetails.map((edu, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <p className="font-semibold text-sm text-gray-800 capitalize">
                      {edu.highestDegree}
                    </p>
                    <p className="text-xs text-gray-500">
                      {edu.institutionName}
                    </p>
                    <div className="flex gap-4 mt-1 flex-wrap">
                      <span className="text-xs text-gray-400">
                        Graduation: {edu.yearOfGraduation}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {edu.specialization}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No education details added
              </p>
            )}
          </Section>

          {/* Certifications */}
          <Section icon={Award} title="Certifications">
            {user.certifications?.length > 0 ? (
              <div className="space-y-3">
                {user.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <p className="font-semibold text-sm text-gray-800">
                      {cert.certificationName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {cert.issuingOrganization}
                    </p>
                    <div className="flex gap-4 mt-1 flex-wrap">
                      {cert.credentialId && (
                        <span className="text-xs text-gray-400">
                          ID: {cert.credentialId}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        Completed:{" "}
                        {new Date(cert.dateOfCompletion).toLocaleDateString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No certifications added</p>
            )}
          </Section>
        </div>

        {/* ── Documents ────────────────────────────────────── */}
        {(docs.resume || docs.additional) && (
          <div className="bg-white rounded-xl shadow-sm p-5 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FileText size={18} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Documents</h3>
            </div>
            <div className="flex gap-4 flex-wrap">
              {docs.resume && (
                <a
                  href={docs.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-purple-300 text-purple-600 hover:bg-purple-50 text-sm px-4 py-2 rounded-lg"
                >
                  <FileText size={16} /> Resume
                </a>
              )}
              {docs.additional && (
                <a
                  href={docs.additional}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-purple-300 text-purple-600 hover:bg-purple-50 text-sm px-4 py-2 rounded-lg"
                >
                  <FileText size={16} /> Additional Document
                </a>
              )}
            </div>
          </div>
        )}

        <div className="text-center text-gray-400 text-sm mt-8 mb-4">
          Copyright © 2024 TechnoHire. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail;