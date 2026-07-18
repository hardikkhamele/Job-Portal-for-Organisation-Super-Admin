import React, { useState, useEffect } from "react";
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
  Edit,
} from "lucide-react";

import DeleteModal from "../common/DeleteModal";
import BlockModal from "../common/BlockModal";
import Footer from "../Footer";
import { fetchEmployers } from "../../redux/slice/employer/getAllEmployer";
import {
  updateEmployerStatus,
  resetUpdateStatus,
} from "../../redux/slice/employer/updateStatusSlice";
import {
  updateCompanyType,
  resetCompanyTypeState,
} from "../../redux/slice/employer/updateCompanyTypeSlice";
// import { deleteEmployer, resetDeleteState } from "../../redux/slice/employer/deleteEmployeeSlice";

function EmployeeTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employers, total, pages, loading } = useSelector(
    (state) => state.allEmployer,
  );
  const { success: updateSuccess, loading: updateLoading } = useSelector(
    (state) => state.updateStatus,
  );
  const { loading: companyTypeLoading } = useSelector(
    (state) => state.updateCompanyType,
  );
  // const { success: deleteSuccess, loading: deleteLoading } = useSelector((state) => state.deleteEmployee);

  // const [openModal, setOpenModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Global loading state to block screen
  // const isActionLoading = updateLoading || deleteLoading;

  // Initial Fetch & Search Fetch
  useEffect(() => {
    dispatch(fetchEmployers({ page, limit: pageSize, search: searchTerm }));
  }, [dispatch, page, searchTerm]);

  // ✅ Refresh data automatically when update or delete is successful
  useEffect(() => {
    if (updateSuccess) {
      dispatch(fetchEmployers({ page, limit: pageSize, search: searchTerm }));

      // Cleanup states
      if (updateSuccess) dispatch(resetUpdateStatus());
      // if (deleteSuccess) dispatch(resetDeleteState());
    }
  }, [updateSuccess, dispatch, page, searchTerm, pageSize]);

  const handleCompanyTypeChange = (id, newType) => {
    if (!newType) return;
    if (
      window.confirm(
        `Are you sure you want to set this company as "${newType}"?`,
      )
    ) {
      dispatch(updateCompanyType({ id, companyType: newType })).then(() => {
        dispatch(fetchEmployers({ page, limit: pageSize, search: searchTerm }));
      });
    }
  };

  // const handleDeleteConfirm = () => {
  //   if (selectedRow) {
  //     dispatch(deleteEmployer(selectedRow));
  //   }
  //   setOpenModal(false);
  //   setSelectedRow(null);
  // };

  const handleBlock = () => {
    if (selectedRow) {
      const newStatus = selectedRow.status === "active" ? "blocked" : "active";
      dispatch(updateEmployerStatus({ id: selectedRow._id, status: newStatus }))
        .unwrap()
        .then(() => {
          dispatch(
            fetchEmployers({ page, limit: pageSize, search: searchTerm }),
          );
        });
    }
    setOpenBlockModal(false);
    setSelectedRow(null);
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
                  src={
                    logo ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="logo"
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
              </div>
            </div>
            <span className="text-base font-medium">
              {row.original.companyName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "companyType",
      header: "Company Type",
      cell: ({ getValue }) => (getValue() === "N/A" ? "N/A" : getValue()),
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
              <span className="text-green-600 capitalize font-medium">
                Active
              </span>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-red-500" />
              <span className="text-red-600 capitalize font-medium">
                {row.original.status || "Blocked"}
              </span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const currentType = row.original.companyType;
        const normalizedType =
          currentType === "Internal" || currentType === "External"
            ? currentType
            : "";
        return (
          <div className="flex gap-3 items-center flex-wrap justify-center ">
            {/* Company Type Dropdown */}
            <select
              value={normalizedType}
              onChange={(e) =>
                handleCompanyTypeChange(row.original._id, e.target.value)
              }
              disabled={companyTypeLoading}
              title="Set Company Type"
              className="text-xs border border-purple-300 rounded-md px-2 py-1.5 bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed min-w-[110px]"
            >
              <option value="">Company Type</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
            </select>

            {/* Action Icons */}
            <Eye
              size={20}
              className="text-purple-500 cursor-pointer"
              onClick={() =>
                navigate(`/employee/company-details/${row.original._id}`)
              }
              title="View Details"
            />
            <Edit
              size={20}
              className="text-purple-500 cursor-pointer"
              onClick={() =>
                navigate(`/employee/edit-employee//${row.original._id}`)
              }
              title="Edit Details"
            />
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedRow(row.original);
                setOpenBlockModal(true);
              }}
            >
              {row.original.status === "active" ? (
                <Ban size={20} className="text-red-500" title="Block Employer" />
              ) : (
                <CheckCircle
                  size={20}
                  className="text-green-600"
                  title="Unblock Employer"
                />
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: employers || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-3 bg-gray-100 min-h-screen overflow-y-auto no-scrollbar pb-20 relative">
      {/* Processing Loader Overlay */}
      {/* {isActionLoading && (
        <div className="fixed inset-0 bg-black/20 z-[9999] flex items-center justify-center cursor-wait">
          <div className=" p-6  flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-b border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-semibold text-sm">Please wait...</p>
          </div>
        </div>
      )} */}

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Employer Management
        </h2>
        {/* <div className="border-b border-gray-500 mb-5"></div> */}
        <hr className="border-gray-300  mb-5" />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center w-[240px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-lg">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search here....."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <button
            onClick={() => navigate("/employee/add-employee")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Employee
          </button>
        </div>

        <div className=" rounded-lg overflow-hidden min-h-[400px]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#F1F1F1] text-gray-700">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="bg-gray-100 text-gray-600">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-4 text-left font-semibold text-[15px]"
                    >
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
                    className="text-center py-20 text-gray-500"
                  >
                    <div className="flex flex-col justify-center items-center gap-3">
                      <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium">
                        Loading Employee Management...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 h-21 hover:bg-gray-50 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 align-middle text-left">
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
                    className="text-center py-20 text-gray-500"
                  >
                    No data found
                  </td>
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
          onClose={() => {
            if (!updateLoading) {
              setOpenBlockModal(false);
              setSelectedRow(null);
            }
          }}
          onConfirm={handleBlock}
          loading={updateLoading}
          title={selectedRow?.status === "active" ? "Block Employer" : "Unblock Employer"}
          message={
            selectedRow?.status === "active"
              ? `Are you sure you want to block "${selectedRow?.name}"?`
              : `Are you sure you want to unblock "${selectedRow?.name}"?`
          }
          buttonText={selectedRow?.status === "active" ? "Block" : "Unblock"}
          variant={selectedRow?.status === "active" ? "danger" : undefined}
        />

        {/* <DeleteModal
          isOpen={openModal}
          onClose={() => { if(!isActionLoading) setOpenModal(false); }}
          onConfirm={handleDeleteConfirm}
        /> */}
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeTable;
