import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CircleChevronLeft, Gem, ArrowLeft, AlertCircle } from "lucide-react";
import {
  fetchCandidateProfile,
  clearProfile,
} from "../../redux/slice/hrManagement/getProfile";
import candidateimg from "../../assets/university.png";
import Footer from "../Footer";

function CandidateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, loading, error } = useSelector((state) => state.candidateProfile);

  useEffect(() => {
    if (id) {
      dispatch(fetchCandidateProfile(id));
    }
    return () => dispatch(clearProfile());
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F4F6FA]">
        <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full bg-[#F4F6FA] p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
          <AlertCircle size={48} className="text-purple-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Candidate Not Found</h2>
          <p className="text-gray-500 text-sm mb-5">
            {error || "The requested candidate profile details could not be loaded."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium mx-auto hover:bg-purple-700 transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl">
        <div className="flex bg-white p-4 rounded-2xl items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold">Candidate Profile</h1>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] rounded-lg p-6 mt-4">
          <div className="grid grid-cols-2 gap-6">
            {/* LEFT SIDE */}
            <div>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 text-white shadow-lg shadow-purple-200 border-2 border-gray-300">
                  <h2 className="text-xl font-bold tracking-wider">
                    {data?.candidateName?.[0]}
                  </h2>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    {data.candidateName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {data.designation?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">India</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  {data.additionalNotes
                    ? data.additionalNotes.replace(/<[^>]*>?/gm, '')
                    : "No additional notes provided."}
                </p>
              </div>

              <div className="border border-[0.96px] border-[rgba(151,151,151,1)] rounded-lg p-3 mb-4">
                <h3 className=" flex items-center gap-2 text-sm font-medium mb-1">
                  <Gem size={15} /> Top skills
                </h3>
                <p className="text-sm text-gray-600">
                  {data.skills?.join(", ") || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Education</h3>
                <p className=" flex items-center gap-3 ">
                  <img
                    src={candidateimg}
                    alt="edu"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-sm font-medium">{data.education}</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {data.category?.name} {data.subCategory?.name}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border-l pl-6">
              <h3 className="font-medium mb-4">Candidate Details</h3>
              <div className="mb-4 flex flex-col gap-2">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {data.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {data.phoneNumber}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Interaction:</span>{" "}
                  {data.interactionType}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>
                  <span className="ml-1 text-purple-600 font-semibold">
                    {data.candidateStatus}
                  </span>
                </p>
              </div>

              {/* <hr className="border-gray-300 mt-2 mb-5" /> */}

              {/* <h3 className="font-medium mb-3">Documents</h3>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-medium">Resume_Generated.pdf</p>
                </div>
                <div className="flex gap-3 text-purple-600">
                  <Eye size={18} className="cursor-pointer" />
                  <Download size={18} className="cursor-pointer" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CandidateProfile;
