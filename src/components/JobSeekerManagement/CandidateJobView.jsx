import React, { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
  CloudDownload,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import FilterModal from "../common/FilterModal";
import DeleteModal from "../common/DeleteModal";
const candidateData = [
  {
    id: 1,
    name: "Aman Kumar",
    role: "Android developer",
    experience: "1 yrs.",
    location: "Nagpur",
    phone: "124257875",
    email: "aman@gmail.com",
  },
  {
    id: 2,
    name: "Ravi Sharma",
    role: "Android developer",
    experience: "1 yrs.",
    location: "Nagpur",
    phone: "124257875",
    email: "ravi@gmail.com",
  },
  {
    id: 3,
    name: "Abhishek",
    role: "Android developer",
    experience: "1 yrs.",
    location: "Nagpur",
    phone: "124257875",
    email: "abhishek@gmail.com",
  },
  {
    id: 4,
    name: "Deepak",
    role: "Android developer",
    experience: "1 yrs.",
    location: "Nagpur",
    phone: "124257875",
    email: "deepak@gmail.com",
  },
  {
    id: 5,
    name: "Ranjana",
    role: "Android developer",
    experience: "1 yrs.",
    location: "Nagpur",
    phone: "124257875",
    email: "ranjana@gmail.com",
  },
];

function CandidateJobView() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    {
      header: "Candidate",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
              {user.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">({user.role})</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "experience",
      header: "Experience",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center gap-4 text-purple-600">
            <Eye
              size={18}
              className="cursor-pointer"
              onClick={() => navigate("/candidate-profile")}
            />
            <CloudDownload size={18} className="cursor-pointer" />
            <Trash2
              size={18}
              className="cursor-pointer text-red-500"
              onClick={() => {
                setSelectedId(row.original.id);
                setIsDeleteOpen(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: candidateData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-white"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Job seeker Management
            </h1>
          </div>
          <hr className="border-gray-300 mt-2 mb-5" />

          <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={table.getIsAllRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Select All
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex items-center gap-2  px-4 py-2 text-lg"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter size={18} /> Filter
                </button>

                <button className="bg-[rgba(211,171,42,1)] rounded hover:bg-yellow-600 text-white px-5 py-2 text-sm font-medium w-50">
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-gray-100 text-gray-600"
                    >
                      {headerGroup.headers.map((header) => (
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
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-4 px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-purple-600">
                Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  candidateData.length,
                )}{" "}
                of {candidateData.length} Candidates
              </p>

              <div className="flex items-center gap-2">
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

        <div className="text-center text-gray-400 text-sm mt-12">
          Copyright © 2024 TechnoHire. All rights reserved.
        </div>
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          console.log("Delete ID:", selectedId);

          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
}

export default CandidateJobView;
