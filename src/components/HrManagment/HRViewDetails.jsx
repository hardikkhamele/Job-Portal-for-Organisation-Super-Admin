import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  CircleChevronLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fetchHrById, clearHrDetails } from "../../redux/slice/hrManagement/getHrById";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Footer from "../Footer";

function HRViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const hrId = location.state?.hr?._id;

  const { hrDetails, loading } = useSelector((state) => state.hrDetails);
  
  const hrInfo = hrDetails?.hr;
  const summaryList = hrDetails?.dailySummary || []; 
  const totalRecords = hrDetails?.pagination?.total || 0;

  useEffect(() => {
    if (hrId) {
      dispatch(fetchHrById(hrId));
    }
    
    return () => {
      dispatch(clearHrDetails());
    };
  }, [dispatch, hrId]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

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
      cell: ({ row }) => row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => {
        const val = getValue();
        return val ? new Date(val).toLocaleDateString() : "N/A";
      }
    },
    {
      accessorKey: "totalCalls",
      header: "Total Calls",
    },
    {
      accessorKey: "totalEmails",
      header: "Total Emails",
    },
   {
    header: "Action",
    cell: ({ row }) => {
      const rawDate = row.original.date; // Table row se date li
      const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : "";
      
      return (
        <Eye
          size={18}
          className="text-purple-600 cursor-pointer mx-auto"
          onClick={() => navigate("/hr-management/daily-work-update", { 
            state: { hrId, date: formattedDate } // Data pass ho raha hai
          })}
        />
      );
    },
  },
  ];

  const table = useReactTable({
    data: summaryList, 
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={28} className="text-gray-700 hover:text-black transition" />
          </button>
          <h1 className="text-xl font-semibold">View Details</h1>
        </div>

        <hr className="border-gray-300 mt-4 mb-5" />

        {/* Profile Section */}
        {loading && !hrInfo ? ( // Sirf tabhi loader dikhaye jab data bilkul na ho
          <div className="flex flex-col justify-center items-center gap-3 h-[150px]">
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
        ) : (
          <div className="bg-[#F4F6FA] rounded-xl p-4 flex justify-between items-center mt-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={hrInfo?.image?.url || "https://i.pravatar.cc/60"}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                alt="HR Profile"
              />
              <div>
                <h2 className="text-lg font-semibold">{hrInfo?.hrName || "Loading..."}</h2>
                <p className="text-sm text-gray-500">{hrInfo?.designation || "N/A"}</p>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p className="font-medium">{hrInfo?.email || "N/A"}</p>
              <p className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full inline-block mt-1">
                {hrInfo?.isverified ? "Verified" : "Pending Verification"}
              </p>
            </div>
          </div>
        )}

        {/* Report Section */}
        <div className="bg-white border border-[rgba(211,211,211,1)] rounded-lg p-5">
          <h2 className="text-purple-600 font-medium mb-4 border-b pb-2">
            Daily Work Report
          </h2>

          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-64 h-11">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div ref={calendarRef} className="flex gap-3 relative">
              <input
                value={selected ? selected.toLocaleDateString() : ""}
                placeholder="Start Date"
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm w-44 cursor-pointer focus:ring-1 focus:ring-purple-400 outline-none"
              />
              {showCalendar && (
                <div className="absolute top-12 right-0 bg-white p-4 rounded-2xl shadow-xl z-50 border border-gray-100">
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

          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4 text-center font-semibold border-b">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {loading ? ( // Jab naya data load ho raha ho, loader dikhayein
                  <tr>
                    <td colSpan={columns.length} className="py-10 text-center">
                     <div className="flex flex-col justify-center items-center gap-3">
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-medium">Loading Daily Reports...</span>
                        </div>
                    </td>
                  </tr>
                ) : summaryList.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="text-center border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-3 px-4 text-gray-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="py-10 text-center text-gray-400 italic">
                      No daily summary records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600 font-medium">
              Showing {summaryList.length > 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0} to{" "}
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRecords)} of {totalRecords}
            </p>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || loading}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(table.getPageCount())].map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  disabled={loading}
                  className={`w-8 h-8 rounded-full text-xs font-semibold ${
                    pagination.pageIndex === i ? "bg-purple-600 text-white" : "border text-purple-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || loading}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HRViewDetails;