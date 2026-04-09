import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MessageCircle, CheckCircle, Wifi  } from "lucide-react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const ChatSupport = () => {
   const navigate = useNavigate();
  //  Pagination State
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  //  Dummy Data (15 items = 3 pages)
  const data = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      sr: i + 1,
      name: ["Tames John", "Hamilton Fast", "Johny Willison", "Archer Root", "Bravo Hairly"][i % 5],
      userType: i % 2 === 0 ? "Job Seeker" : "Employer",
      date:
        i === 0
          ? "Today"
          : i === 1
          ? "Yesterday"
          : `Feb ${5 - i}, 2026 12:00`,
      status: i < 2 ? "Ongoing" : "Solved",
    }));
  }, []);

  //  Columns
  const columns = useMemo(
    () => [
      { header: "Sr.No.", accessorKey: "sr" },
      { header: "User name", accessorKey: "name" },
      { header: "User Type", accessorKey: "userType" },
      { header: "Date", accessorKey: "date" },
      {
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status;

    return (

      
      <div className="flex items-center justify-center gap-2">
        {status === "Ongoing" ? (
          <>
           <Wifi size={20} className="text-yellow-500" />
            <span className="text-yellow-500 text">Ongoing</span>
          </>
        ) : (
          <>
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-green-600 text">Solved</span>
          </>
        )}
      </div>
    );
  },
},

      {
  header: "Action",
  cell: ({ row }) => {
    const status = row.original.status;

    return (
      <div className="flex items-center justify-center gap-3">
        
        {/* Chat Icon */}
        <MessageCircle
          size={25}
          className="text-purple-600 cursor-pointer"
          onClick={() => navigate("/chat-conversation")}
        />

        {/* Mark as solved */}
        {status === "Solved" ? (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle size={20} />
            <span>Mark As Solved</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <CheckCircle size={20} />
            <span>Mark As Solved</span>
          </div>
        )}
      </div>
    );
  },
}
    ],
    []
  );

  //  Table
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

const [filterOpen, setFilterOpen] = useState(false);
const [selectedFilter, setSelectedFilter] = useState("All User Type");

const filterOptions = ["All User Type", "Job Seeker", "Employer"];

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6">
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Chat Support</h1>
        <hr className="mb-6 border-gray-300" />

        {/* Top bar */}
        <div className="flex justify-between mb-4">
          <input
            placeholder="Search"
            className="border border-gray-200 px-3 py-2 rounded-md w-64 bg-gray-100 outline-none"
          />

          <div className="relative w-44">
  
            {/* Selected */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setFilterOpen(!filterOpen);
              }}
              className="border px-3 py-2 rounded-md bg-white flex justify-between items-center cursor-pointer"
            >
              {selectedFilter}
              
            </div>
            
            {/* Dropdown */}
            {filterOpen && (
              <div className="absolute w-full bg-white  rounded-md mt-1 shadow z-10">
                {filterOptions.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedFilter(item);
                      setFilterOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedFilter === item ? "bg-gray-200" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-3 px-4 font-semibold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 text-gray-700 ">
                      {flexRender(
                        cell.column.columnDef.cell ??
                          cell.column.columnDef.accessorKey,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text">
            <span className="text-purple-600 font-bold">
              Showing{" "}
              {pagination.pageIndex * 5 + 1} to{" "}
              {Math.min((pagination.pageIndex + 1) * 5, data.length)} of{" "}
              {data.length} Chats
            </span>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border px-2 py-1 rounded-full"
              >
                {"<"}
              </button>

              {[...Array(table.getPageCount()).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`px-3 py-1 rounded-full ${
                    pagination.pageIndex === page
                      ? "bg-purple-600 text-white"
                      : "border"
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border px-2 py-1 rounded-full"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ChatSupport;