import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Eye,
  Trash2,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

// 🔹 Logos
import technokrateLogo from "../../assets/Technokreat.svg";
import googlelogo from "../../assets/Google.svg";
import hcllogo from "../../assets/HCL.svg";
import microsoftlogo from "../../assets/Microsoft.svg";
import nvidialogo from "../../assets/Nvidia.svg";
// import DeleteModal from "./DeleteModal";
import DeleteModal from "../common/DeleteModal";
const JobManagement = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const navigate = useNavigate();

  // ✅ Pagination State
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const handleConfirmDelete = () => {

  setIsModalOpen(false);
  setSelectedRow(null);
};
  const handleDeleteClick = (row) => {
  setSelectedRow(row);
  setIsModalOpen(true);
};

  // 🔹 Data
  const data = useMemo(
    () => [
      {
        id: 1,
        employer: "Technokrate",
        logo: technokrateLogo,
        job: "UI/UX Designer",
        location: "Kolkata, West Bengal",
        salary: "₹50k–80k/month",
        reports: 1858,
        date: "Jan 7, 2026 19:28",
        category: "Design",
      },
      {
        id: 2,
        employer: "Google",
        logo: googlelogo,
        job: "Product Designer",
        location: "Kolkata, West Bengal",
        salary: "₹50k–80k/month",
        reports: 1858,
        date: "Jan 7, 2026 19:28",
        category: "Design",
      },
      {
        id: 3,
        employer: "HCL",
        logo: hcllogo,
        job: "Graphic Designer",
        location: "Kolkata, West Bengal",
        salary: "₹50k–80k/month",
        reports: 1858,
        date: "Jan 7, 2026 19:28",
        category: "Design",
      },
      {
        id: 4,
        employer: "Microsoft",
        logo: microsoftlogo,
        job: "Frontend Developer",
        location: "Kozhikode, Kerala",
        salary: "₹50k–80k/month",
        reports: 1858,
        date: "Jan 7, 2026 19:28",
        category: "Development",
      },
      {
        id: 5,
        employer: "Nvidia",
        logo: nvidialogo,
        job: "Full Stack Developer",
        location: "Chennai, Tamil Nadu",
        salary: "₹50k–80k/month",
        reports: 1858,
        date: "Jan 7, 2026 19:28",
        category: "Development",
      },
    ],
    []
  );

  // 🔹 Filter Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const search = globalFilter.toLowerCase();

      const matchesSearch =
        item.job.toLowerCase().includes(search) ||
        item.employer.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [data, globalFilter, category]);

  // 🔹 Columns
  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Employer",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.logo}
            alt="logo"
            className="w-9 h-9 rounded-full bg-gray-100 p-1 object-contain border border-gray-300"
          />
          <span className="font-medium text-gray-800">
            {row.original.employer}
          </span>
        </div>
      ),
    },
    {
      header: "Job list",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.job}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} className="text-gray-400" />
            <span>
              {row.original.location} • {row.original.salary}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Spam Counts",
      cell: ({ row }) => (
        <div>
          <p>{row.original.reports}</p>
          <span className="text-xs text-gray-500">Reports</span>
        </div>
      ),
    },
    {
      header: "Posted Time & Date",
      accessorKey: "date",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center">
          <Eye className="text-purple-600 cursor-pointer" size={18}
          onClick={()=>
          navigate("/job-view-details",{
            state:row.original,
          })
          }
           />
          <Trash2 className="text-red-500 cursor-pointer" size={18}
          onClick={() => handleDeleteClick(row.original)}
           />
        </div>
      ),
    },
  ];

  // 🔹 Table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Job Management</h2>
        <hr className="border-gray-300 mt-2 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          {/* 🔹 Search + Filter */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-[#F7F8F9] w-72 h-11">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            <select
              className="border border-gray-300 p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">Job Category</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
            </select>
          </div>

          {/* 🔹 Table */}
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-center">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3">
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
                <tr
                  key={row.id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                filteredData.length
              )}{" "}
              of {filteredData.length} Jobs
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
      <DeleteModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onConfirm={handleConfirmDelete}
/>
    </div>
  );
};

export default JobManagement;