// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import Footer from "../Footer";
// import useGetCredit from "../../hooks/creditManagement/useGetCredit"; 
// import useUpdateCredit from "../../hooks/creditManagement/useUpdateCredit"; // Naya Hook

// const CreditModel = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCredit, setSelectedCredit] = useState(null);
  
//   const { credits, loading, refetch } = useGetCredit();
//   const { updateCredit, updating } = useUpdateCredit();

//   const handleEditClick = (credit) => {
//     setSelectedCredit(credit);
//     setIsOpen(true);
//   };

//   // --- Modal Component Inside ---
//   const CreditModal = ({ isOpen, onClose, data }) => {
//     const [inputValue, setInputValue] = useState("");

//     // Autofill effect
//     useEffect(() => {
//       if (data) setInputValue(data.credits);
//     }, [data]);

//     if (!isOpen) return null;

//     const handleSubmit = () => {
//       updateCredit(data._id, inputValue, () => {
//         refetch(); // List refresh karein
//         onClose(); // Modal band karein
//       });
//     };

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
//         <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
//           <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
//             Edit {data?.title}
//           </h2>

//           <div className="mb-5">
//             <label className="block mb-2 text-gray-900 font-semibold text-base">
//               Credit Required
//             </label>
//             <input
//               type="number"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full rounded-md px-3 py-2 border border-[#D3D3D3] bg-[#F7F8F9] outline-none"
//             />
//           </div>

//           <div className="flex justify-between gap-4">
//             <button
//               onClick={onClose}
//               className="flex-1 bg-purple-200 text-purple-700 py-2 rounded-md cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={updating}
//               className="flex-1 bg-purple-800 text-white py-2 rounded-md cursor-pointer disabled:bg-purple-400"
//             >
//               {updating ? "Updating..." : "Update"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // UI Filtering
//   const databaseCredits = credits.filter(c => 
//     c.title.includes("Profile") || c.title.includes("Excel")
//   );
//   const jobPostCredits = credits.filter(c => 
//     c.title.includes("Job Post")
//   );

//   return (
//     <div className="p-3 bg-gray-100 min-h-screen flex flex-col pb-20">
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h1 className="text-2xl font-bold mb-3 text-gray-900">Credit Management</h1>
//         <hr className="mb-6" />

//         <div className="relative w-64 mb-4">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="pl-10 pr-4 py-2 rounded-md w-full bg-[#F7F8F9] outline-none border border-[#D3D3D3]"
//           />
//         </div>

//         {loading ? (
//           <div className="text-center py-50">Loading...</div>
//         ) : (
//           <>
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Database Credit</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//               {databaseCredits.map((item) => (
//                 <div key={item._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
//                   <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
//                   <p className="text-gray-600 text-xl mb-10">{item.message}</p>
//                   <button
//                     onClick={() => handleEditClick(item)}
//                     className="bg-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition"
//                   >
//                     Edit ({item.credits})
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Post Credit</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {jobPostCredits.map((item) => (
//                 <div key={item._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
//                   <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
//                   <p className="text-gray-600 text-xl mb-10">{item.message}</p>
//                   <button
//                     onClick={() => handleEditClick(item)}
//                     className="bg-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition"
//                   >
//                     Edit ({item.credits})
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <CreditModal 
//         isOpen={isOpen} 
//         onClose={() => setIsOpen(false)} 
//         data={selectedCredit} 
//       />
//       <Footer />
//     </div>
//   );
// };

// export default CreditModel;







import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import Footer from "../Footer";

const CreditModel = () => {
  // --- Dummy Data ---
  const initialCredits = [
    { _id: "1", title: "Profile Search", message: "Credits required to view a candidate profile.", credits: 5 },
    { _id: "2", title: "Excel Export", message: "Credits required to export data to excel.", credits: 50 },
    { _id: "3", title: "Job Post Standard", message: "Credits required for a standard job post.", credits: 10 },
    { _id: "4", title: "Job Post Premium", message: "Credits required for a premium job post.", credits: 25 },
  ];

  const [credits, setCredits] = useState(initialCredits);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditClick = (credit) => {
    setSelectedCredit(credit);
    setIsOpen(true);
  };

  // Function to update local state (simulating API update)
  const handleUpdateLocal = (id, newValue) => {
    const updatedData = credits.map((c) =>
      c._id === id ? { ...c, credits: newValue } : c
    );
    setCredits(updatedData);
  };

  // --- Modal Component Inside ---
  const CreditModal = ({ isOpen, onClose, data, onUpdate }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      if (data) setInputValue(data.credits);
    }, [data]);

    if (!isOpen) return null;

    const handleSubmit = () => {
      onUpdate(data._id, inputValue);
      onClose();
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg animate-in fade-in zoom-in duration-200">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Edit {data?.title}
          </h2>

          <div className="mb-5">
            <label className="block mb-2 text-gray-900 font-semibold text-base">
              Credit Required
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-md px-3 py-2 border border-[#D3D3D3] bg-[#F7F8F9] outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-purple-200 text-purple-700 py-2 rounded-md cursor-pointer hover:bg-purple-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-800 text-white py-2 rounded-md cursor-pointer hover:bg-purple-900 transition shadow-md"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Filtering Logic ---
  const filteredCredits = useMemo(() => {
    return credits.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [credits, searchQuery]);

  const databaseCredits = filteredCredits.filter(
    (c) => c.title.includes("Profile") || c.title.includes("Excel")
  );
  const jobPostCredits = filteredCredits.filter((c) =>
    c.title.includes("Job Post")
  );

  return (
    <div className="p-3 bg-gray-100 min-h-screen flex flex-col pb-20">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-3 text-gray-900">Credit Management</h1>
        <hr className="mb-6" />

        <div className="relative w-64 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search credits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md w-full bg-[#F7F8F9] outline-none border border-[#D3D3D3] focus:border-purple-400"
          />
        </div>

        {/* Database Credits Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Database Credit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {databaseCredits.length > 0 ? (
            databaseCredits.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
                  <p className="text-gray-600 text-xl mb-10">{item.message}</p>
                </div>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition shadow-md"
                >
                  Edit ({item.credits})
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No database credits found.</p>
          )}
        </div>

        {/* Job Post Credits Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Post Credit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobPostCredits.length > 0 ? (
            jobPostCredits.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
                  <p className="text-gray-600 text-xl mb-10">{item.message}</p>
                </div>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition shadow-md"
                >
                  Edit ({item.credits})
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No job post credits found.</p>
          )}
        </div>
      </div>

      <CreditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedCredit}
        onUpdate={handleUpdateLocal}
      />
      <Footer />
    </div>
  );
};

export default CreditModel;