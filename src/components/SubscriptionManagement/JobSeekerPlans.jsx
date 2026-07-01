import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSeekerPlans, deleteJobSeekerPlan } from "../../redux/slice/subscriptions/jobseekerPlans/jobseekerPlansSlice";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { plans, loading } = useSelector((state) => state.jobseekerPlans);

  // ✅ Load real-time plans from API
  useEffect(() => {
    dispatch(fetchJobSeekerPlans());
  }, [dispatch]);

  // ✅ Search Filter
  const filteredData = useMemo(() => {
    return (plans || []).filter((item) =>
      item.planName?.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [plans, globalFilter]);

  // ✅ Columns
  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Plan Name",
      accessorKey: "planName",
    },
    {
      header: "Plan Tag",
      accessorKey: "planTag",
    },
    {
      header: "Validity",
      accessorKey: "validity",
      cell: ({ getValue }) => `${getValue()} Month(s)`,
    },
    {
      header: "Plan Price",
      accessorKey: "planPrice",
      cell: ({ getValue }) => `₹${String(getValue()).replace("₹", "")}`,
    },
    {
      header: "Discount",
      accessorKey: "discount",
      cell: ({ getValue }) => `${String(getValue()).replace("%", "")}%`,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Eye
            className="text-purple-600 cursor-pointer"
            size={18}
            onClick={() => {
              setSelectedRow(row.original);
              setOpenModal(true);
            }}
          />
          <Edit className="text-purple-600 cursor-pointer" size={18} 
            onClick={()=> navigate("/edit-job-seeker-plan", { state: row.original }) }
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
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                    No Job Seeker Plans Found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
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
                ))
              )}
            </tbody>
          </table>

          {/* 🔹 Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {filteredData.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1} to{" "}
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
        data={selectedRow}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (selectedRow) {
            dispatch(deleteJobSeekerPlan(selectedRow._id));
          }
          setDeleteModalOpen(false);
          setSelectedRow(null);
        }}
      />
    </div>
  );
};

export default JobSeekerPlans;