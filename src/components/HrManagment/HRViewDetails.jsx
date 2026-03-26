// import React, { useState, useRef, useEffect } from "react";
// import {
//   Eye,
//   CircleChevronLeft,
//   Search,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate } from "react-router";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// const reportData = [
//   { id: 1, date: "Feb 2, 2026", calls: 55, emails: 100 },
//   { id: 2, date: "Feb 10, 2026", calls: 100, emails: 120 },
//   { id: 3, date: "Feb 12, 2026", calls: 87, emails: 20 },
//   { id: 4, date: "Feb 14, 2026", calls: 100, emails: 122 },
//   { id: 5, date: "Feb 17, 2026", calls: 200, emails: 20 },
//   { id: 6, date: "Feb 19, 2026", calls: 65, emails: 80 },
//   { id: 7, date: "Feb 20, 2026", calls: 40, emails: 10 },
//   { id: 8, date: "Feb 21, 2026", calls: 30, emails: 25 },
//   { id: 9, date: "Feb 22, 2026", calls: 90, emails: 60 },
//   { id: 10, date: "Feb 23, 2026", calls: 77, emails: 99 },
// ];

// function HRViewDetails() {
//   const navigate = useNavigate();
//   const calendarRef = useRef(null);

//   // ✅ TanStack Pagination
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   // ✅ Calendar state
//   const [selected, setSelected] = useState();
//   const [showCalendar, setShowCalendar] = useState(false);

//   // ✅ Outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(event.target)
//       ) {
//         setShowCalendar(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Columns
//   const columns = [
//     {
//       header: "Sr.No.",
//       cell: ({ row }) =>
//         row.index + 1 + pagination.pageIndex * pagination.pageSize,
//     },
//     {
//       accessorKey: "date",
//       header: "Date",
//     },
//     {
//       accessorKey: "calls",
//       header: "Total Calls",
//     },
//     {
//       accessorKey: "emails",
//       header: "Total Emails",
//     },
//     {
//       header: "Action",
//       cell: () => (
//         <Eye
//           size={18}
//           className="text-purple-600 cursor-pointer mx-auto"
//           onClick={() => navigate("/daily-work-update")}
//         />
//       ),
//     },
//   ];

//   // ✅ Table instance
//   const table = useReactTable({
//     data: reportData,
//     columns,
//     state: { pagination },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
//       <div className="bg-white p-5 rounded-2xl">
//         {/* Header */}
//         <div className="flex bg-white p-4 rounded-2xl items-center gap-3">
//           <button onClick={() => navigate(-1)}>
//             <CircleChevronLeft size={28} />
//           </button>
//           <h1 className="text-xl font-semibold">View Details</h1>
//         </div>

//         <hr className="border-gray-300 mt-2 mb-5" />

//         {/* Profile */}
//         <div className="bg-[#F4F6FA] rounded-xl p-4 flex justify-between items-center mt-4 mb-6">
//           <div className="flex items-center gap-4">
//             <img
//               src="https://i.pravatar.cc/60"
//               className="w-14 h-14 rounded-full"
//               alt=""
//             />
//             <div>
//               <h2 className="text-lg font-semibold">Kristin Watson</h2>
//               <p className="text-sm text-gray-500">HR Manager</p>
//             </div>
//           </div>

//           <div className="text-right text-sm text-gray-600">
//             <p>kristian@gmail.com</p>
//             <p>Password@1234</p>
//           </div>
//         </div>

//         {/* Report Section */}
//         <div className="bg-white border border-[rgba(211,211,211,1)] rounded-lg p-5">
//           <h2 className="text-purple-600 font-medium mb-4 border-b pb-2">
//             Daily Work Report
//           </h2>

//           {/* Search + Date */}
//           <div className="flex justify-between mb-4">
//             <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
//               <Search size={18} className="text-[#D3D3D3] mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="bg-transparent outline-none text-sm w-full"
//               />
//             </div>

//             {/* Calendar */}
//             <div ref={calendarRef} className="flex gap-3 relative">
//               <input
//                 value={selected ? selected.toDateString() : ""}
//                 placeholder="DD/MM/YYYY"
//                 readOnly
//                 onClick={() => setShowCalendar(!showCalendar)}
//                 className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm w-44 cursor-pointer"
//               />
//               <input
//                 value={selected ? selected.toDateString() : ""}
//                 placeholder="DD/MM/YYYY"
//                 readOnly
//                 onClick={() => setShowCalendar(!showCalendar)}
//                 className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm w-44 cursor-pointer"
//               />

//               {showCalendar && (
//                 <div className="absolute top-12 right-0 bg-white p-4 rounded-2xl shadow-lg z-50">
//                   <DayPicker
//                     mode="single"
//                     selected={selected}
//                     onSelect={(date) => {
//                       setSelected(date);
//                       setShowCalendar(false);
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Table */}
//           <div className="w-full overflow-x-auto">
//             <table className="w-full table-fixed border-collapse text-sm">
//               <thead className="bg-gray-100 text-gray-600">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id} className="py-3 px-4 text-center">
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr
//                     key={row.id}
//                     className=" text-center border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="py-3 px-4">
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
// <div className="flex justify-between items-center mt-6">
//   <p className="text-sm text-purple-600">
//     Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
//     {Math.min(
//       (pagination.pageIndex + 1) * pagination.pageSize,
//       reportData.length
//     )}{" "}
//     of {reportData.length}
//   </p>

//   <div className="flex gap-2 items-center">
//     <button
//       onClick={() => table.previousPage()}
//       disabled={!table.getCanPreviousPage()}
//       className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
//     >
//       <ChevronLeft size={20} />
//     </button>

//     {[...Array(table.getPageCount())].map((_, i) => (
//       <button
//         key={i}
//         onClick={() => table.setPageIndex(i)}
//         className={`w-8 h-8 rounded-full ${
//           pagination.pageIndex === i
//             ? "bg-purple-600 text-white"
//             : "border text-purple-600"
//         }`}
//       >
//         {i + 1}
//       </button>
//     ))}

//     <button
//       onClick={() => table.nextPage()}
//       disabled={!table.getCanNextPage()}
//       className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
//     >
//       <ChevronRight size={20} />
//     </button>
//   </div>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HRViewDetails;

import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Change 1: added useLocation
import {
  Eye,
  CircleChevronLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useGetHrById from "../../hooks/hr/useGetHrById"; // Change 2: import hook

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

function HRViewDetails() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const calendarRef = useRef(null);

  const hrId = location.state?.hr?._id;

  const { getHrById, hrDetails, dailySummary, loading } = useGetHrById();

  useEffect(() => {
    if (hrId) {
      getHrById(hrId);
    }
  }, [hrId, getHrById]);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

  // Outside click logic (Same as yours)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "calls", header: "Total Calls" },
    { accessorKey: "emails", header: "Total Emails" },
    {
      header: "Action",
      cell: () => (
        <Eye
          size={18}
          className="text-purple-600 cursor-pointer mx-auto"
          onClick={() => navigate("/daily-work-update")}
        />
      ),
    },
  ];

  const table = useReactTable({
    // Change 5: Use dailySummary from API or fallback to empty array
    data: dailySummary.length > 0 ? dailySummary : [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

 if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#F4F6FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-purple-600 font-medium animate-pulse">Loading HR Details...</p>
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
          <h1 className="text-xl font-semibold">View Details</h1>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* Change 6: Show Real Data from API */}
        <div className="bg-[#F4F6FA] rounded-xl p-4 flex justify-between items-center mt-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={hrDetails?.image?.url || "https://i.pravatar.cc/60"}
              className="w-14 h-14 rounded-full object-cover border border-purple-200"
              alt="profile"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {hrDetails?.hrName || "N/A"}
              </h2>
              <p className="text-sm text-gray-500">
                {hrDetails?.designation || "N/A"}
              </p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-600">
            <p>{hrDetails?.email || "N/A"}</p>
            {/* Password Security note: APIs usually don't return passwords */}
            <p className="text-xs text-purple-400 italic">
              Verified: {hrDetails?.isverified ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white border border-[rgba(211,211,211,1)] rounded-lg p-5">
          <h2 className="text-purple-600 font-medium mb-4 border-b pb-2">
            Daily Work Report
          </h2>

          {/* Calendar and Search (Existing UI) */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div ref={calendarRef} className="flex gap-3 relative">
              <input
                value={selected ? selected.toDateString() : ""}
                placeholder="Start Date"
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm w-44 cursor-pointer"
              />
              <input
                value={selected ? selected.toDateString() : ""}
                placeholder="End Date"
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm w-44 cursor-pointer"
              />
              {showCalendar && (
                <div className="absolute top-12 right-0 bg-white p-4 rounded-2xl shadow-lg z-50">
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      setSelected(date);
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Table (Existing UI) */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm text-center">
              <thead className="bg-gray-100 text-gray-600">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-3 px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-10 text-gray-400 italic"
                    >
                      No daily summary available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                dailySummary.length,
              )}{" "}
              of {dailySummary.length}{" "}
            </p>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(table.getPageCount())].map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`w-8 h-8 rounded-full ${
                    pagination.pageIndex === i
                      ? "bg-purple-600 text-white"
                      : "border text-purple-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRViewDetails;
