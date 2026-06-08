import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
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
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../common/DeleteModal";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {
  fetchCustomPlans,
  deleteCustomPlan,
  fetchCustomPlanStatusDropdown,
} from "../../../redux/slice/subscriptions/customPlan/customPlanSlice";

const CustomPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    plans = [],
    pagination,
    loading,
    deleteLoading,
    error,
    statusOptions = [],
  } = useSelector((state) => state.customPlan || {});

  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(
      fetchCustomPlans({
        page: currentPage,
        limit: pageSize,
        status: selectedStatus === "Status" || selectedStatus === "All" ? "" : selectedStatus.toLowerCase(),
      }),
    );
  }, [dispatch, currentPage, selectedStatus]);

  useEffect(() => {
    dispatch(fetchCustomPlanStatusDropdown());
  }, [dispatch]);

  const handleStatusChange = (statusObj) => {
    setSelectedStatus(statusObj.label);
    const apiValue = statusObj.value === "all" ? "" : statusObj.value;

    dispatch(
      fetchCustomPlans({
        page: 1,
        limit: pageSize,
        status: apiValue,
      }),
    );
    setCurrentPage(1);
    setOpenStatus(false);
  };

  useOutsideClick(dropdownRef, () => setOpenStatus(false));

  const filteredData = useMemo(() => {
    const planList = Array.isArray(plans) ? plans : [];
    if (!globalFilter.trim()) return planList;
    return planList.filter((item) =>
      item.companyName?.toLowerCase().includes(globalFilter.toLowerCase()),
    );
  }, [plans, globalFilter]);

  const formatDuration = (days) => {
    if (!days) return "-";
    if (days >= 365) return `${Math.round(days / 365)} Year`;
    if (days >= 30) return `${Math.round(days / 30)} Month`;
    return `${days} Days`;
  };

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => (currentPage - 1) * pageSize + row.index + 1,
    },
    {
      header: "Company",
      cell: ({ row }) => {
        const { companyName, companyLogo } = row.original;
        return (
          <div className="flex items-center gap-3">
            {companyLogo ? (
              <img src={companyLogo} alt="logo" className="w-9 h-9 rounded-full bg-gray-100 p-1 object-contain border border-gray-300" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm border border-gray-300">
                {companyName?.charAt(0) ?? "?"}
              </div>
            )}
            <span className="font-medium text-gray-800">{companyName}</span>
          </div>
        );
      },
    },
    {
      header: "Plan Type",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">
          {row.original.planType?.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      header: "Duration",
      cell: ({ row }) => formatDuration(row.original.duration),
    },
    {
      header: "Price",
      cell: ({ row }) => `₹${row.original.price}`,
    },
    {
      header: "Discount",
      cell: ({ row }) => `${row.original.discount}%`,
    },
    {
      header: "Job Credits",
      accessorKey: "jobCredits",
    },
    {
      header: "Purchase Date",
      cell: ({ row }) =>
        row.original.purchaseDate
          ? new Date(row.original.purchaseDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "-",
    },
    {
      header: "End Date",
      cell: ({ row }) =>
        row.original.endDate
          ? new Date(row.original.endDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "-",
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.status === "active";
        return (
          <div className="flex items-center justify-center gap-2">
            {isActive ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <XCircle className="text-red-500" size={16} />
            )}
            <span
              className={`text-sm font-medium capitalize ${
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
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center gap-3">
          <Eye
            onClick={() => navigate(`/custom-plans/view/${row.original._id}`)}
            className="text-purple-600 cursor-pointer"
            size={18}
            title="View Custom Plan"
          />
          <Edit
            className="text-purple-600 cursor-pointer"
            size={18}
            onClick={() => navigate(`/edit-custom-plan/${row.original._id}`)}
            title="Edit Custom Plan"
          />
          {/* <Trash2
            className="text-red-500 cursor-pointer"
            size={18}
            onClick={() => {
              setSelectedRow(row.original);
              setDeleteModalOpen(true);
            }}
            title="Delete Custom Plan"
          /> */}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteConfirm = async () => {
    if (selectedRow?._id) {
      await dispatch(deleteCustomPlan(selectedRow._id));
    }
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Custom Plans</h2>
        <hr className="border-gray-300 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-[#F7F8F9] w-72 h-11">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by company"
                className="bg-transparent outline-none text-sm w-full"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative border border-gray-300 rounded-md flex items-center justify-center px-2" ref={dropdownRef}>
                <button
                  onClick={() => setOpenStatus((prev) => !prev)}
                  className="cursor-pointer flex items-center gap-1 text-sm text-gray-700 focus:outline-none"
                >
                  {selectedStatus} <span><ChevronDown size={16} /></span>
                </button>

                {openStatus && (
                  <div className="absolute top-12 left-0 w-28 bg-white border border-gray-300 rounded-md shadow-md z-50">
                    {statusOptions.map((item) => (
                      <p
                        key={item.value}
                        onClick={() => handleStatusChange(item)}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {item.label}
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

          {error && <p className="text-red-500 text-sm mb-3">⚠ {error}</p>}

          {/* 🔹 FIX: Added overflow wrapper to prevent table grow issues */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-center">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 whitespace-nowrap">
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
                    <td colSpan={columns.length} className="text-center py-16 text-purple-600">
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-10 text-gray-400">
                      No custom plans found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-gray-300 text-center hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3 whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && pagination && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-purple-600">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.total,
                )}{" "}
                of {pagination.total} Custom Plans
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={!pagination.hasPrevPage}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === i + 1
                        ? "bg-purple-600 text-white"
                        : "border text-purple-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={!pagination.hasNextPage}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setSelectedRow(null); }}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default CustomPlan;