import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import HrModal from "../common/HrModal";
import { fetchAllHr } from "../../redux/slice/hrManagement/getAllHr";
// import {
//   deleteHr,
//   resetDeleteState,
// } from "../../redux/slice/hrManagement/deleteHr";
import { toggleHrStatus } from "../../redux/slice/hrManagement/updateStatus"; // Import Toggle Action
import Footer from "../Footer";

function HRManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux States
  const { hrList, total, loading } = useSelector((state) => state.allHr);
  // const { loading: deleting, success: deleteSuccess } = useSelector(
  //   (state) => state.deleteHr,
  // );
  const { loadingId } = useSelector((state) => state.updateStatus); // Toggle loading state

  // Local States
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const loadHrData = () => {
    dispatch(
      fetchAllHr({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
      }),
    );
  };

  useEffect(() => {
    loadHrData();
  }, [dispatch, pagination.pageIndex, pagination.pageSize, searchTerm]);

  const handleStatusToggle = (id) => {
    // API call karenge aur fir table refresh karenge
    dispatch(toggleHrStatus(id)).then(() => {
      loadHrData();
    });
  };

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) =>
        row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    {
      accessorKey: "hrName",
      header: "HR Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => {
        const hr = row.original;
        const isCurrentLoading = loadingId === hr._id;

        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleStatusToggle(hr._id)}
              disabled={isCurrentLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isCurrentLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              } ${hr.isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  hr.isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const hr = row.original;
        return (
          <div className="flex justify-center gap-4 text-purple-600">
            <Eye
              size={18}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() =>
                navigate(`/hr-management/hr-view-details/${hr._id}`, {
                  state: { hr },
                })
              }
            />
            <Edit
              size={18}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() =>
                navigate(`/hr-management/edit-hr/${hr._id}`, { state: { hr } })
              }
            />
            {/* <Trash2
              size={18}
              className="cursor-pointer text-red-500 hover:scale-110 transition"
              onClick={() => {
                setSelectedId(hr._id);
                setIsModalOpen(true);
              }}
            /> */}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: hrList || [],
    columns,
    pageCount: Math.max(1, Math.ceil((total || 0) / pagination.pageSize)),
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-2xl font-bold text-black">HR Management</h4>
          <hr className="border-gray-300 mt-3 mb-5" />

          <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11 focus-within:border-purple-400 transition">
                <Search size={18} className="text-[#D3D3D3] mr-2" />
                <input
                  type="text"
                  placeholder="Search HR..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/hr-management/create-hr")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  + Add HR
                </button>
              </div>
            </div>

            <div className="overflow-x-auto h-auto">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-gray-100 text-gray-600"
                    >
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-3 px-4 font-semibold">
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
                  {loading ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-20 text-gray-500"
                      >
                        <div className="flex flex-col justify-center items-center gap-3">
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-medium">
                            Loading HR Records...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : hrList?.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-4 px-4 text-gray-700">
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
                        className="py-20 text-gray-400 italic"
                      >
                        No HR records found{" "}
                        {searchTerm && `for "${searchTerm}"`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-purple-600 font-medium">
                Showing{" "}
                {hrList?.length > 0
                  ? pagination.pageIndex * pagination.pageSize + 1
                  : 0}{" "}
                to{" "}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  total || 0,
                )}{" "}
                of {total || 0} HRs
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage() || loading}
                  className="w-8 h-8 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(Math.max(1, table.getPageCount()))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-8 h-8 rounded-full text-xs font-semibold transition ${
                      pagination.pageIndex === i
                        ? "bg-purple-600 text-white shadow-md"
                        : "border border-purple-200 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage() || loading}
                  className="w-8 h-8 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <HrModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedId(null);
          }}
          // onConfirm={handleDelete}
          // loading={deleting}
        />
      </div>
      <Footer />
    </div>
  );
}

export default HRManagement;
