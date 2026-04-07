// import React from "react";
// import { useNavigate } from "react-router";
// import { Eye, Download, CircleChevronLeft, Gem } from "lucide-react";
// import candidateimg from "../../assets/university.png";
// import profile from "../../assets/cadidate.png";
// import profile2 from "../../assets/cadidate2.png"
// import profile3 from "../../assets/cadidate3.png"
// import Footer from "../Footer";
// function CandidateProfile() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
//       {/* SAME WHITE PARENT CARD */}
//       <div className="bg-white p-5 rounded-2xl">
//         {/* HEADER */}
//         <div className="flex bg-white p-4 rounded-2xl items-center gap-3">
//           <button onClick={() => navigate(-1)}>
//             <CircleChevronLeft size={28} />
//           </button>
//           <h1 className="text-xl font-semibold">Candidate Profile</h1>
//         </div>

//         <hr className="border-gray-300 mt-2 mb-5" />

//         {/* MAIN PROFILE CARD */}
//         <div className="bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] rounded-lg p-6 mt-4">
//           <div className="grid grid-cols-2 gap-6">
//             {/* LEFT SIDE */}
//             <div>
//               {/* PROFILE */}
//               <div className="flex gap-4 items-center mb-4">
//                 <img
//                   src="https://i.pravatar.cc/70"
//                   className="w-16 h-16 rounded-full"
//                   alt=""
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">Aman Kumar</h2>
//                   <p className="text-sm text-gray-500">Android Developer</p>
//                   <p className="text-xs text-gray-400">
//                     Nagpur, Maharashtra, India
//                   </p>
//                 </div>
//               </div>

//               {/* ABOUT */}
//               <div className="mb-4">
//                 <h3 className="font-medium mb-2">About</h3>
//                 <p className="text-sm text-gray-600">
//                   Android Developer with a passion for building scalable,
//                   high-performance mobile applications that deliver seamless and
//                   user-centric experiences...
//                 </p>
//               </div>

//               {/* SKILLS */}
//               <div className="border border-[0.96px] border-[rgba(151,151,151,1)] rounded-lg p-3 mb-4">
//                 <h3 className=" flex items-center gap-2 text-sm font-medium mb-1">
//                   <Gem size={15} /> Top skills
//                 </h3>
//                 <p className="text-sm text-gray-600">Java, Kotlin, Angular</p>
//               </div>

//               {/* EDUCATION */}
//               <div>
//                 <h3 className="font-medium mb-3">Education</h3>

//                 <p className=" flex items-center gap-3 ">
//                   <img
//                     src={candidateimg}
//                     alt="candidateimg"
//                     className="w-5 h-5 object-contain"
//                   />
//                   <span className="text-sm font-medium">
//                     Anna University, Chennai
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-500 mb-3">
//                   Master of Technology
//                 </p>

//                 <p className=" flex items-center gap-3 ">
//                   <img
//                     src={candidateimg}
//                     alt="candidateimg"
//                     className="w-5 h-5 object-contain"
//                   />
//                   <span className="text-sm font-medium">
//                     Anna University, Chennai
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-500">Artificial Intelligence</p>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="border-l pl-6">
//               {/* EXPERIENCE */}
//               <h3 className="font-medium mb-4">Experience</h3>

//               <div className="mb-4 flex items-center gap-3">
//                 <div className="img">
//                   <img
//                     src={profile}
//                     alt="profile"
//                     className="w-10 h-10 object-contain"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <p className="text-sm font-medium">
//                     Senior Android Developer - Full-time
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Jul 2024 - Present · 5 mos
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Bangalore,Karnatak,India · On-site
//                   </p>
//                 </div>
//               </div>
//               <hr className="border-gray-300 mt-2 mb-5" />
//               <div className="mb-4 flex items-center gap-1" >
//               <div className="img">
//                 <img src={profile2} alt="profile2" className="w-10 h-10 object-contain" />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <p className="text-sm font-medium">
//                   Junior Android Developer - Full-time
//                 </p>
//                 <p className="text-xs text-gray-500">Jan 2023 - Jun 2024</p>
//                 </div>
//               </div>
//                <hr className="border-gray-300 mt-2 mb-5" />
//               {/* CERTIFICATIONS */}
//               <h3 className="font-medium mt-6 mb-3">Certifications</h3>

//               <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center gap-2">
//                 <img src={profile3} alt="profile3" className="w-20 h-20 object-contain" />
//                 <div>
//                   <p className="text-sm font-medium">Android Developer</p>
//                   <p className="text-xs text-gray-500">Google</p>
//                 </div>
//                   </div>
//                 <div className="flex gap-3 text-purple-600">
//                   <Eye size={18} />
//                   <Download size={18} />
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center gap-2">
//                 <img src={profile3} alt="profile3" className="w-20 h-20 object-contain" />
//                 <div>
//                   <p className="text-sm font-medium">Java Full Stack</p>
//                   <p className="text-xs text-gray-500">Google</p>
//                 </div>
//                   </div>
//                 <div className="flex gap-3 text-purple-600">
//                   <Eye size={18} />
//                   <Download size={18} />
//                 </div>
//               </div>

//               {/* Resume */}
//               <h3 className="font-medium mt-6 mb-3">Resume</h3>

//               <div className="flex justify-between items-center mb-3">
//                 <div>
//                   <p className="text-sm font-medium">Charlie_CV.Pdf</p>
//                 </div>

//                 <div className="flex gap-3 text-purple-600">
//                   <Eye size={18} />
//                   <Download size={18} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default CandidateProfile;






import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Download, CircleChevronLeft, Gem } from "lucide-react";
import { fetchCandidateProfile, clearProfile } from "../../redux/slice/hrManagement/getProfile";
import candidateimg from "../../assets/university.png";
import profile from "../../assets/cadidate.png";
import profile2 from "../../assets/cadidate2.png";
import profile3 from "../../assets/cadidate3.png";
import Footer from "../Footer";

function CandidateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, loading } = useSelector((state) => state.candidateProfile);

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

  if (!data) return null;

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
                <img
                  src="https://i.pravatar.cc/70"
                  className="w-16 h-16 rounded-full"
                  alt="avatar"
                />
                <div>
                  <h2 className="text-lg font-semibold">{data.candidateName}</h2>
                  <p className="text-sm text-gray-500">{data.designation?.name || "N/A"}</p>
                  <p className="text-xs text-gray-400">
                    India
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  {data.additionalNotes || "No additional notes provided."}
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
                  <img src={candidateimg} alt="edu" className="w-5 h-5 object-contain" />
                  <span className="text-sm font-medium">{data.education}</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">{data.category?.name} {data.subCategory?.name}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border-l pl-6">
              <h3 className="font-medium mb-4">Candidate Details</h3>
              <div className="mb-4 flex flex-col gap-2">
                <p className="text-sm"><span className="font-medium">Email:</span> {data.email}</p>
                <p className="text-sm"><span className="font-medium">Phone:</span> {data.phoneNumber}</p>
                <p className="text-sm"><span className="font-medium">Interaction:</span> {data.interactionType}</p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span> 
                  <span className="ml-1 text-purple-600 font-semibold">{data.candidateStatus}</span>
                </p>
              </div>
              
              <hr className="border-gray-300 mt-2 mb-5" />

              <h3 className="font-medium mb-3">Documents</h3>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-medium">Resume_Generated.pdf</p>
                </div>
                <div className="flex gap-3 text-purple-600">
                  <Eye size={18} className="cursor-pointer" />
                  <Download size={18} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CandidateProfile;