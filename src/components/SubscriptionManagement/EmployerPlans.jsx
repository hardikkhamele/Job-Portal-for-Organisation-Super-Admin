import React, { useMemo, useRef, useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEmployerPlans, 
  fetchEmployerPlanById, 
  clearSinglePlan,
  deleteEmployerPlan 
} from "../../redux/slice/subscriptions/employerPlans/getEmployerPlans";
import { fetchPlanTypeDropdown } from "../../redux/slice/subscriptions/employerPlans/plantypeDropdown";
import JobSeekerValidityModal from "../common/JobSeekerValidityModal";
import DeleteModal from "../common/DeleteModal";
import useOutsideClick from "../../hooks/useOutsideClick";

const EmployerPlans = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState({ label: "All Plans", value: "" });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { plans, singlePlan, loading, total, totalPages } = useSelector((state) => state.employerPlans);
  const { options } = useSelector((state) => state.planTypeDropdown);

  useOutsideClick(dropdownRef, () => setOpenDropdown(false));

  useEffect(() => {
    dispatch(fetchPlanTypeDropdown());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployerPlans({ 
      page: pagination.pageIndex, 
      limit: pagination.pageSize, 
      planType: selectedCategory.value 
    }));
  }, [dispatch, pagination.pageIndex, pagination.pageSize, selectedCategory.value]);

  const handleViewPlan = (id) => {
    dispatch(fetchEmployerPlanById(id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearSinglePlan());
  };

  // ✅ Delete Handler
  const handleDeleteConfirm = () => {
    if (selectedRow?._id) {
      dispatch(deleteEmployerPlan(selectedRow._id));
      setDeleteModalOpen(false);
      setSelectedRow(null);
    }
  };

  const filteredData = useMemo(() => {
    if (!plans) return [];
    return plans.filter((item) =>
      item.title?.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [plans, globalFilter]);

  const columns = [
    { header: "Sr.No.", cell: ({ row }) => pagination.pageIndex * pagination.pageSize + row.index + 1 },
    { header: "Plan Name", accessorKey: "title" },
    { header: "Plan Tag", accessorKey: "planTag" },
    { header: "Validity", accessorKey: "durationText" },
    { header: "Plan Price", accessorKey: "price", cell: ({ getValue }) => `₹${getValue()}` },
    { header: "Discount", accessorKey: "discount", cell: ({ getValue }) => `${getValue()}%` },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Eye 
            className="text-purple-600 cursor-pointer" 
            size={18} 
            onClick={() => handleViewPlan(row.original._id)} 
          />
          <Edit 
            className="text-purple-600 cursor-pointer" 
            size={18} 
            onClick={() => navigate(`/edit-employer-plan/${row.original._id}`)} 
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
    // ye add kiya
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Employer Plans</h2>
        <hr className="border-gray-300 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
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

            <div className="flex items-center gap-4 relative">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="border border-gray-300 px-4 py-2 rounded-md bg-white text-sm w-52 flex justify-between items-center"
                >
                  {selectedCategory.label}
                  <span className="ml-2">▾</span>
                </button>

                {openDropdown && (
                  <div className="absolute top-10 left-0 w-52 bg-white border border-gray-300 rounded-md shadow-md z-50">
                    <p
                      onClick={() => {
                        setSelectedCategory({ label: "All Plans", value: "" });
                        setPagination({ ...pagination, pageIndex: 0 });
                        setOpenDropdown(false);
                      }}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer border-b"
                    >
                      All Plans
                    </p>
                    {options?.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedCategory(item);
                          setPagination({ ...pagination, pageIndex: 0 });
                          setOpenDropdown(false);
                        }}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {item.label}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="bg-yellow-500 text-white px-10 py-2 rounded-md text-sm font-medium"
                onClick={() => navigate("/create-employer-plan")}
              >
                Create Plan
              </button>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-center text-gray-700 font-semibold">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3 font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading && !openModal ? (
                <tr><td colSpan={columns.length} className="p-10 text-center">Loading...</td></tr>
              ) : filteredData.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-300 text-center hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={columns.length} className="p-10 text-center">No records found</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {/* <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600 font-medium">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)} of {total} Plans
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
                disabled={pagination.pageIndex === 0}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPagination(prev => ({ ...prev, pageIndex: i }))}
                  className={`w-8 h-8 rounded-full ${pagination.pageIndex === i ? "bg-purple-600 text-white" : "border text-purple-600"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
                disabled={pagination.pageIndex >= totalPages - 1}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div> */}


          {/* Pagination Section */}
<div className="flex justify-between items-center mt-6">
  <p className="text-sm text-purple-600 font-medium">
    {/* Correct range calculation */}
    Showing {total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1} to{" "}
    {Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)} of {total} Plans
  </p>

  <div className="flex items-center gap-2">
    {/* Previous Button */}
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50"
    >
      <ChevronLeft size={18} />
    </button>

    {/* Current Page Number Display */}
    <span className="text-sm font-semibold text-purple-600 px-2">
      Page {pagination.pageIndex + 1} of {totalPages}
    </span>

    {/* Next Button */}
    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50"
    >
      <ChevronRight size={18} />
    </button>
  </div>
</div>

        </div>
      </div>

      <JobSeekerValidityModal 
        isOpen={openModal} 
        onClose={handleCloseModal} 
        data={singlePlan} 
      />
      
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm} // Link to handle function
      />
    </div>
  );
};

export default EmployerPlans;