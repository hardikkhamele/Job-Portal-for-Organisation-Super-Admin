import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import JobSeekerValidityModal from "../common/JobSeekerValidityModal";
import DeleteModal from "../common/DeleteModal";
const JobSeekerPlans = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
 const navigate = useNavigate ();

  // ✅ Data
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Basic",
        tag: "For Active Job Seekers",
        validity: "1 Month",
        price: "₹199",
        discount: "35%",
      },
      {
        id: 2,
        name: "Premium",
        tag: "Most Popular",
        validity: "1 Month",
        price: "₹299",
        discount: "35%",
      },
      {
        id: 3,
        name: "Premium",
        tag: "Most Popular",
        validity: "1 Month",
        price: "₹399",
        discount: "35%",
      },
      {
        id: 4,
        name: "Premium",
        tag: "Most Popular",
        validity: "1 Month",
        price: "₹499",
        discount: "35%",
      },
      {
        id: 5,
        name: "Premium",
        tag: "Most Popular",
        validity: "1 Month",
        price: "₹599",
        discount: "35%",
      },
    ],
    []
  );

  // ✅ Search Filter
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [data, globalFilter]);

  // ✅ Columns
  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Plan Name",
      accessorKey: "name",
    },
    {
      header: "Plan Tag",
      accessorKey: "tag",
    },
    {
      header: "Validity",
      accessorKey: "validity",
    },
    {
      header: "Plan Price",
      accessorKey: "price",
    },
    {
      header: "Discount",
      accessorKey: "discount",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Eye
            className="text-purple-600 cursor-pointer"
            size={18}
            onClick={() => setOpenModal(true)}
          />
          <Edit className="text-purple-600 cursor-pointer" size={18} 
            onClick={()=> navigate("/edit-job-seeker-plan") }
          />
          <Trash2 className="text-red-500 cursor-pointer" size={18}
           
            onClick={() => {
    setSelectedRow(row.original); 
    setDeleteModalOpen(true);     
  }}
           />
        </div>
      ),
    },
  ];

  // ✅ Table Setup
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
        <h2 className="text-xl font-semibold mb-4">Job Seeker Plans</h2>
        <hr className="border-gray-300 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          
          {/* 🔹 Search + Button */}
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

            <button className="bg-yellow-500 text-white px-10 rounded-md text-sm font-medium"
            onClick={()=> navigate("/create-job-seeker-plan") }
            >
              Create Plan
            </button>
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
                  className="border-b border-gray-300 text-center hover:bg-gray-50"
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
              of {filteredData.length} Job Seeker Plans
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
      <JobSeekerValidityModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
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

export default JobSeekerPlans;