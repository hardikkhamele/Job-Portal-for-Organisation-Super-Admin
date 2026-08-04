import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTransferredCandidates,
  clearTransferredCandidates,
} from "../../redux/slice/employer/getTransferredCandidatesSlice";
import {
  Users,
  Search,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  FileText,
  Eye,
  Download,
  CheckCircle,
  X,
  UserCheck,
  Award,
  MapPin,
  RefreshCw,
} from "lucide-react";

const Candidate = ({ employerId: propEmployerId, employer }) => {
  const { id: routeEmployerId } = useParams();
  const employerId = propEmployerId || routeEmployerId;
  const dispatch = useDispatch();

  const { candidates, loading, error } = useSelector(
    (state) => state.transferredCandidates
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const pageSize = 8;

  useEffect(() => {
    if (employerId) {
      dispatch(fetchTransferredCandidates(employerId));
    }
    return () => {
      dispatch(clearTransferredCandidates());
    };
  }, [dispatch, employerId]);

  // Helper to extract clean field values from candidate object
  const getCandidateName = (item) => {
    if (!item) return "N/A";
    return (
      item.name ||
      item.fullName ||
      item.candidateName ||
      item.user?.name ||
      item.user?.fullName ||
      item.candidateId?.name ||
      item.candidateId?.fullName ||
      item["FULL NAME"] ||
      item["Candidate Name"] ||
      "N/A"
    );
  };

  const getCandidateEmail = (item) => {
    if (!item) return "N/A";
    return (
      item.email ||
      item.candidateEmail ||
      item.user?.email ||
      item.candidateId?.email ||
      item["EMAIL"] ||
      item["EMAIL ID"] ||
      "N/A"
    );
  };

  const getCandidatePhone = (item) => {
    if (!item) return "N/A";
    return (
      item.phone ||
      item.mobile ||
      item.candidatePhone ||
      item.user?.phone ||
      item.user?.mobile ||
      item.candidateId?.phone ||
      item.candidateId?.mobile ||
      item["PHONE NUMBER"] ||
      item["MOBILE"] ||
      "N/A"
    );
  };

  const getCandidateDesignation = (item) => {
    if (!item) return "N/A";
    return (
      item.designation ||
      item.role ||
      item.designationName ||
      item.jobTitle ||
      item.categoryName ||
      item.candidateId?.designation ||
      item.candidateId?.role ||
      item.candidateId?.categoryName ||
      item["DESIGNATION"] ||
      item["ROLE"] ||
      "N/A"
    );
  };

  const getCandidateExperience = (item) => {
    if (!item) return "N/A";
    const exp =
      item.experience ||
      item.candidateId?.experience ||
      item.totalExperience ||
      item["EXPERIENCE"];
    if (!exp) return "N/A";
    return typeof exp === "number" ? `${exp} Years` : exp;
  };

  const getCandidateLocation = (item) => {
    if (!item) return "N/A";
    const loc =
      item.location ||
      item.city ||
      item.candidateId?.location ||
      item.candidateId?.city ||
      item["LOCATION"] ||
      item["CITY"];
    return loc || "N/A";
  };

  const getCandidateResume = (item) => {
    if (!item) return null;
    return (
      item.resume ||
      item.cv ||
      item.resumeUrl ||
      item.candidateId?.resume ||
      item.candidateId?.cv ||
      item.candidateId?.resumeUrl ||
      null
    );
  };

  const getTransferDate = (item) => {
    if (!item) return "N/A";
    const dateVal =
      item.transferredAt ||
      item.createdAt ||
      item.transferDate ||
      item.date ||
      item.updatedAt;
    if (!dateVal) return "N/A";
    try {
      return new Date(dateVal).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(dateVal);
    }
  };

  // Search filter
  const filteredCandidates = useMemo(() => {
    if (!candidates || !Array.isArray(candidates)) return [];
    if (!search.trim()) return candidates;

    const query = search.toLowerCase();
    return candidates.filter((item) => {
      const name = getCandidateName(item).toLowerCase();
      const email = getCandidateEmail(item).toLowerCase();
      const phone = getCandidatePhone(item).toLowerCase();
      const desig = getCandidateDesignation(item).toLowerCase();
      return (
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        desig.includes(query)
      );
    });
  }, [candidates, search]);

  const totalPages = Math.ceil(filteredCandidates.length / pageSize) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCandidates.slice(start, start + pageSize);
  }, [filteredCandidates, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* HEADER STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="border border-purple-200 rounded-2xl p-5 flex justify-between items-center bg-purple-50/50 shadow-sm">
          <div>
            <p className="text-gray-500 font-semibold text-sm">
              Total Transferred Candidates
            </p>
            <h3 className="text-3xl font-black text-purple-700 mt-1">
              {candidates?.length || 0}
            </h3>
            <p className="text-xs text-purple-500 font-medium mt-1 flex items-center gap-1">
              <UserCheck size={14} /> Total candidates shared with employer
            </p>
          </div>
          <div className="bg-purple-600 p-3 rounded-2xl text-white shadow-md">
            <Users size={26} />
          </div>
        </div>

        <div className="border border-blue-200 rounded-2xl p-5 flex justify-between items-center bg-blue-50/50 shadow-sm">
          <div>
            <p className="text-gray-500 font-semibold text-sm">
              Search Results
            </p>
            <h3 className="text-3xl font-black text-blue-700 mt-1">
              {filteredCandidates.length}
            </h3>
            <p className="text-xs text-blue-500 font-medium mt-1 flex items-center gap-1">
              <Search size={14} /> Matching filter criteria
            </p>
          </div>
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-md">
            <UserCheck size={26} />
          </div>
        </div>

        <div className="border border-emerald-200 rounded-2xl p-5 flex justify-between items-center bg-emerald-50/50 shadow-sm">
          <div>
            <p className="text-gray-500 font-semibold text-sm">Status</p>
            <h3 className="text-2xl font-black text-emerald-700 mt-1 flex items-center gap-2">
              <CheckCircle size={22} className="text-emerald-500" /> Active Transfer
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Employer Access Granted
            </p>
          </div>
          <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-md">
            <Award size={26} />
          </div>
        </div>
      </div>

      {/* SEARCH AND REFRESH BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => employerId && dispatch(fetchTransferredCandidates(employerId))}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-sm font-semibold transition-all border border-purple-200 cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-600 font-bold animate-pulse">
            Loading Transferred Candidates...
          </p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-200 text-red-600">
          <p className="font-bold text-lg mb-1">Failed to load candidates</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm font-semibold border-b border-gray-200">
                  <th className="py-4 px-5">Sr.No.</th>
                  <th className="py-4 px-5">Candidate Name</th>
                  <th className="py-4 px-5">Designation</th>
                  <th className="py-4 px-5">Contact Details</th>
                  <th className="py-4 px-5">Experience</th>
                  <th className="py-4 px-5">Transfer Date</th>
                  <th className="py-4 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {paginatedCandidates.length > 0 ? (
                  paginatedCandidates.map((item, index) => {
                    const name = getCandidateName(item);
                    const email = getCandidateEmail(item);
                    const phone = getCandidatePhone(item);
                    const designation = getCandidateDesignation(item);
                    const experience = getCandidateExperience(item);
                    const date = getTransferDate(item);
                    const resume = getCandidateResume(item);

                    return (
                      <tr
                        key={item._id || item.id || index}
                        className="hover:bg-purple-50/40 transition-colors"
                      >
                        <td className="py-4 px-5 font-bold text-gray-500">
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base border border-purple-200 shrink-0">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">{name}</p>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium inline-block mt-0.5">
                                Transferred
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                            <Briefcase size={15} className="text-purple-500 shrink-0" />
                            <span>{designation}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="space-y-1 text-xs">
                            <p className="flex items-center gap-1.5 text-gray-600 font-medium">
                              <Mail size={14} className="text-blue-500 shrink-0" />
                              {email}
                            </p>
                            <p className="flex items-center gap-1.5 text-gray-600 font-medium">
                              <Phone size={14} className="text-green-500 shrink-0" />
                              {phone}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-5 font-medium text-gray-700">
                          {experience}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                            <Calendar size={15} className="text-purple-500 shrink-0" />
                            {date}
                          </div>
                        </td>
                        <td className="py-4 px-5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedCandidate(item)}
                              className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                              title="View Candidate Details"
                            >
                              <Eye size={18} />
                            </button>

                            {resume ? (
                              <a
                                href={resume}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                                title="Download/View Resume"
                              >
                                <Download size={18} />
                              </a>
                            ) : (
                              <span
                                className="p-2 rounded-lg bg-gray-100 text-gray-300 cursor-not-allowed"
                                title="No Resume Available"
                              >
                                <FileText size={18} />
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-gray-400 font-medium italic"
                    >
                      No transferred candidates found for this employer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && filteredCandidates.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <p className="text-purple-700 font-bold text-sm">
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, filteredCandidates.length)} of{" "}
            {filteredCandidates.length} Candidates
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full border border-purple-300 flex items-center justify-center text-purple-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 transition cursor-pointer"
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  page === i + 1
                    ? "bg-purple-600 text-white shadow-md"
                    : "border border-purple-200 text-purple-700 hover:bg-purple-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-full border border-purple-300 flex items-center justify-center text-purple-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 transition cursor-pointer"
            >
              {">"}
            </button>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-purple-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-purple-700 text-white p-6 flex justify-between items-start relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white text-purple-700 flex items-center justify-center font-black text-2xl shadow-md">
                  {getCandidateName(selectedCandidate).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {getCandidateName(selectedCandidate)}
                  </h3>
                  <p className="text-purple-200 text-sm font-medium">
                    {getCandidateDesignation(selectedCandidate)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 rounded-full hover:bg-purple-600 text-white transition-all cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 bg-purple-50/60 p-4 rounded-xl border border-purple-100">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Experience
                  </p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">
                    {getCandidateExperience(selectedCandidate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5 flex items-center gap-1">
                    <MapPin size={14} className="text-purple-500" />
                    {getCandidateLocation(selectedCandidate)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail size={18} className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {getCandidateEmail(selectedCandidate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Phone size={18} className="text-green-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {getCandidatePhone(selectedCandidate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Calendar size={18} className="text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Transfer Date</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {getTransferDate(selectedCandidate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume button */}
              {getCandidateResume(selectedCandidate) && (
                <div className="pt-2">
                  <a
                    href={getCandidateResume(selectedCandidate)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Download size={18} /> Download / View Resume
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidate;
