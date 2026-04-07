import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Eye,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

import DeleteModal from "../common/DeleteModal";
import BlockModal from "../common/BlockModal";
import Footer from "../Footer";
import { fetchEmployers } from "../../redux/slice/employer/getAllEmployer";

function EmployeeTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux State
  const { employers, total, pages, loading } = useSelector((state) => state.allEmployer);

  const [openModal, setOpenModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch API on page or search change
  useEffect(() => {
    dispatch(fetchEmployers({ page, limit: pageSize, search: searchTerm }));
  }, [dispatch, page, searchTerm]);

  const handleDelete = () => {
    console.log("Deleted:", selectedRow);
    setOpenModal(false);
  };

  const handleBlock = () => {
    console.log("Blocked:", selectedRow);
    setOpenBlockModal(false);
  };

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => (page - 1) * pageSize + row.index + 1,
    },
    {
      header: "Company",
      cell: ({ row }) => {
        const logo = row.original.companyLogo?.[0];
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#FFFFFF] to-[#8931BA]">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={logo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="logo"
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
              </div>
            </div>
            <span className="text-base font-medium">{row.original.companyName}</span>
          </div>
        );
      },
    },
    { 
      accessorKey: "companyType", 
      header: "Company Type",
      cell: ({ getValue }) => getValue() === "N/A" ? "N/A" : getValue() 
    },
    { accessorKey: "totalJobs", header: "Posted Jobs" },
    {
      header: "Credits Left",
      cell: ({ row }) => (
        <div className="text-base leading-5">
          <p>Job Credits {row.original.creditsLeft || 0}</p>
          <p className="text-gray-500">Database Credits 0</p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm">
          {row.original.status === "active" ? (
            <>
              <CheckCircle size={20} className="text-green-500" />
              <span className="text-green-600 capitalize">Active</span>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-red-500" />
              <span className="text-red-600 capitalize">{row.original.status}</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Eye
            size={20}
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate(`/employee/company-details/${row.original._id}`)}
          />
          <Ban
            size={20}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setSelectedRow(row.original);
              setOpenBlockModal(true);
            }}
          />
          <Trash2
            size={22}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setSelectedRow(row.original._id);
            }}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: employers || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-3 bg-gray-100 min-h-screen overflow-y-auto no-scrollbar pb-20">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Employer Management</h2>
        <div className="border-b border-gray-500 mb-5"></div>

        {/* <div className="mb-6">
          <div className="flex items-center w-[240px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-lg">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search here....."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to page 1 on search
              }}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div> */}


        <div className="mb-6 flex items-center justify-between">
  {/* Search Bar - Left Side */}
  <div className="flex items-center w-[240px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-lg">
    <Search size={16} className="text-gray-500 mr-2" />
    <input
      type="text"
      placeholder="Search here....."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to page 1 on search
      }}
      className="bg-transparent outline-none text-sm w-full"
    />
  </div>

  <button 
    onClick={() => {
      console.log("Add Employee Clicked");
      navigate("/employee/add-employee")
    }}
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
  >
    + Add Employee
  </button>
</div>

        <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[400px]">
          <table className="w-full text-base border-collapse">
            <thead className="bg-[#F1F1F1] text-gray-700">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="py-4 px-4 text-left font-semibold text-[15px]">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-20 text-gray-500">
                    <div className="flex flex-col justify-center items-center gap-3">
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-medium">Loading Employee Management...</span>
                        </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 h-21 hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-20 text-gray-500">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6 font-bold text-purple-600">
          <span>
            Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, total)} of {total}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="w-8 h-8 border rounded-full disabled:opacity-50"
            >
              {"<"}
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  page === i + 1 ? "bg-purple-600 text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(page + 1, pages))}
              disabled={page === pages}
              className="w-8 h-8 border rounded-full disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>

        <BlockModal
          isOpen={openBlockModal}
          onClose={() => setOpenBlockModal(false)}
          onConfirm={handleBlock}
        />

        <DeleteModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleDelete}
        />
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeTable;