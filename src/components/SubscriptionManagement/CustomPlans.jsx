import React, { useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import DeleteModal from "../common/DeleteModal";
import googlelogo from "../../assets/Google.svg";
import hcllogo from "../../assets/HCL.svg";
import microsoftlogo from "../../assets/Microsoft.svg";
import nvidialogo from "../../assets/Nvidia.svg";
import infosys from "../../assets/Infosys.svg";
import useOutsideClick from "../../hooks/useOutsideClick";

const CustomPlan = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const dropdownRef = useRef(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const navigate = useNavigate();

  // ✅ Close dropdown on outside click
  useOutsideClick(dropdownRef, () => setOpenStatus(false));

  // ✅ Data
  const data = useMemo(
    () => [
      {
        id: 1,
        company: "Google",
        logo: googlelogo,
        validity: "1 Month",
        price: "₹9999",
        discount: "35%",
        date: "5th Feb 2026",
        status: "Active",
      },
      {
        id: 2,
        company: "HCL",
        logo: hcllogo,
        validity: "3 Month",
        price: "₹9999",
        discount: "35%",
        date: "5th Feb 2026",
        status: "Active",
      },
      {
        id: 3,
        company: "Microsoft",
        logo: microsoftlogo,
        validity: "6 Month",
        price: "₹9999",
        discount: "35%",
        date: "5th Feb 2026",
        status: "Active",
      },
      {
        id: 4,
        company: "Nvidia",
        logo: nvidialogo,
        validity: "6 Month",
        price: "₹9999",
        discount: "35%",
        date: "5th Feb 2026",
        status: "Expired",
      },
      {
        id: 5,
        company: "Infosys",
        logo: infosys,
        validity: "6 Month",
        price: "₹9999",
        discount: "35%",
        date: "5th Feb 2026",
        status: "Expired",
      },
    ],
    []
  );

  // ✅ Filter (Search + Status)
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(globalFilter.toLowerCase());

      const matchesStatus =
        selectedStatus === "Status" ||
        selectedStatus === "All" ||
        item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data, globalFilter, selectedStatus]);

  // ✅ Columns
  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Company",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.logo || googlelogo}
            alt="logo"
            className="w-9 h-9 rounded-full bg-gray-100 p-1 object-contain border border-gray-300"
          />
          <span className="font-medium text-gray-800">
            {row.original.company}
          </span>
        </div>
      ),
    },
    { header: "Plan Validity", accessorKey: "validity" },
    { header: "Plan Price", accessorKey: "price" },
    { header: "Discount", accessorKey: "discount" },
    { header: "Create Date", accessorKey: "date" },

    // ✅ Status with icon
    {
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.status === "Active";
        return (
          <div className="flex items-center justify-center gap-2">
            {isActive ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <XCircle className="text-red-500" size={16} />
            )}
            <span
              className={`text-sm font-medium ${
                isActive ? "text-green-600" : "text-red-500"
              }`}
            >
              {row.original.status}
            </span>
          </div>
        );
      },
    },

    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Eye className="text-purple-600 cursor-pointer" size={18} />
          <Edit
            className="text-purple-600 cursor-pointer"
            size={18}
            onClick={() => navigate("/edit-custom-plan")}
          />
          <Trash2
            className="text-red-500 cursor-pointer"
            size={18}
            onClick={() => {
              setSelectedRow(row.original);
              setDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Custom Plans</h2>
        <hr className="border-gray-300 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          
          {/* 🔹 Top Section */}
          <div className="flex justify-between mb-4">

            {/* Search */}
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

            {/* 🔥 Custom Dropdown */}
            <div className="flex gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenStatus((prev) => !prev)}
                  className="border border-gray-300 px-4 py-2 rounded-md bg-white text-sm w-28 flex justify-between items-center"
                >
                  {selectedStatus}
                  <span>▾</span>
                </button>

                {openStatus && (
                  <div className="absolute top-10 left-0 w-28 bg-white border border-gray-300 rounded-md shadow-md z-50">
                    {["All", "Active", "Expired"].map((item) => (
                      <p
                        key={item}
                        onClick={() => {
                          setSelectedStatus(item);
                          setOpenStatus(false);
                        }}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="bg-yellow-500 text-white px-6 py-2 rounded-md text-sm font-medium"
                onClick={() => navigate("/create-custom-plan")}
              >
                Create Custom Plan
              </button>
            </div>
          </div>

          {/* 🔹 Table */}
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-center">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-300 text-center hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}{" "}
              of {filteredData.length} Custom Plans
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600"
              >
                <ChevronLeft size={18} />
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
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("Delete:", selectedRow);
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default CustomPlan;