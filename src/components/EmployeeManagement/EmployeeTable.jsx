import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Clock,
  Building2,
  ShieldCheck,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  Plus,
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
} from "../../redux/slice/employer/updateCompanyTypeSlice";
import { deleteEmployer, resetDeleteState } from "../../redux/slice/employer/deleteEmployeeSlice";
import { toast } from "react-toastify";

// A newly registered employer may not have a status in older API responses.
// Treat it as pending until an admin explicitly approves it.
const normalizeEmployerStatus = (status) =>
  String(status || "pending").trim().toLowerCase();

const isActiveEmployerStatus = (status) =>
  ["active", "approved", "accepted"].includes(
    normalizeEmployerStatus(status),
  );

const resolveEmployerStatus = (employer, overrideStatus) => {
  if (overrideStatus != null) return normalizeEmployerStatus(overrideStatus);

  const accountValue = employer.status;
  const approvalValue = employer.approvalStatus ?? employer.companyApprovalStatus;
  const accountStatus = normalizeEmployerStatus(accountValue);
  const approvalStatus = normalizeEmployerStatus(approvalValue);

  // Pending/rejected approvals are workflow decisions and must not be hidden
  // when their account-level status is also marked as blocked.
  if (["pending", "pending_approval", "verification", "rejected"].includes(approvalStatus)) {
    return approvalStatus;
  }
  // Blocking an approved employer is an account-level decision and remains in
  // Employee Management, where it can be unblocked.
  if (accountStatus === "blocked") return accountStatus;
  if (accountValue != null && String(accountValue).trim() !== "") return accountStatus;
  if (approvalValue != null && String(approvalValue).trim() !== "") return approvalStatus;
  return "pending";
};

// Approval tabs must be calculated from the complete employer list. Fetching
// only the current API page could hide a pending company that belongs to a
// different page from both the Pending Approvals count and its table.
const EMPLOYERS_FETCH_LIMIT = 1000;

function EmployeeTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employers, loading } = useSelector(
    (state) => state.allEmployer,
  );
  const { success: updateSuccess, loading: updateLoading } = useSelector(
    (state) => state.updateStatus,
  );
  const { loading: companyTypeLoading } = useSelector(
    (state) => state.updateCompanyType,
  );
  const { success: deleteSuccess, loading: deleteLoading } = useSelector((state) => state.deleteEmployee);

  const [activeTab, setActiveTab] = useState("approved"); // 'approved' | 'pending' | 'rejected'
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Approval Modal state
  const [approvalModal, setApprovalModal] = useState({
    isOpen: false,
    company: null,
    actionType: "approve", // 'approve' | 'reject'
    reason: "",
  });

  // Local state override for pending/rejected companies to demonstrate real-time workflow
  const [localStatusUpdates, setLocalStatusUpdates] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [companyTypeFilter, setCompanyTypeFilter] = useState("all");
  const [accountStatusFilter, setAccountStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch the complete list so approval-status tabs are accurate. Pagination
  // and search are applied locally after the approval-status filter. Do not
  // include search here: that would replace the full list and make card counts
  // change whenever a company is searched.
  useEffect(() => {
    dispatch(fetchEmployers({ page: 1, limit: EMPLOYERS_FETCH_LIMIT, fetchAll: true }));
  }, [dispatch]);

  // ✅ Refresh data automatically when update or delete is successful
  useEffect(() => {
    if (updateSuccess || deleteSuccess) {
      dispatch(fetchEmployers({ page: 1, limit: EMPLOYERS_FETCH_LIMIT, fetchAll: true }));

      // Cleanup states
      if (updateSuccess) dispatch(resetUpdateStatus());
      if (deleteSuccess) {
        dispatch(resetDeleteState());
        setOpenModal(false);
        setSelectedRow(null);
      }
    }
  }, [updateSuccess, deleteSuccess, dispatch]);

  // Reset page to 1 whenever a table filter changes.
  useEffect(() => {
    setPage(1);
  }, [activeTab, pageSize, searchTerm, companyTypeFilter, accountStatusFilter]);

  // Reset companyTypeFilter when switching to pending tab if it was set from approved tab
  useEffect(() => {
    if (activeTab !== "approved" && activeTab !== "pending") {
      setCompanyTypeFilter("all");
    }
  }, [activeTab]);

  const location = useLocation();

  // Local storage persistence for custom created employers
  const [createdEmployers, setCreatedEmployers] = useState(() => {
    const saved = localStorage.getItem("custom_created_employers");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse custom created employers", e);
      }
    }
    return [];
  });

  // Listen for new employer created from AddEmployee page
  useEffect(() => {
    if (location.state?.newEmployer) {
      const newEmp = location.state.newEmployer;
      setCreatedEmployers((prev) => {
        if (prev.some((e) => e.email && e.email.toLowerCase() === newEmp.email.toLowerCase())) return prev;
        const entry = {
          _id: "local_emp_" + Date.now(),
          companyName: newEmp.companyName || newEmp.employerName,
          email: newEmp.email,
          mobileNumber: newEmp.mobileNumber,
          category: newEmp.designation || "Corporate",
          postedJobs: 0,
          location: "India",
          status: "approved",
          approvalStatus: "approved",
          createdAt: new Date().toISOString()
        };
        const updated = [entry, ...prev];
        localStorage.setItem("custom_created_employers", JSON.stringify(updated));
        return updated;
      });
      setActiveTab("approved");
    }
  }, [location.state]);

  // Combine fetched employers with local overrides applied
  const allProcessedEmployers = useMemo(() => {
    const list = [...createdEmployers, ...(employers || [])];

    return list.map((emp) => {
      const overrideStatus = localStatusUpdates[emp._id];
      return {
        ...emp,
        status: resolveEmployerStatus(emp, overrideStatus),
      };
    });
  }, [createdEmployers, employers, localStatusUpdates]);

  // Calculate Metrics & Counts
  const approvedList = useMemo(() => {
    return allProcessedEmployers.filter(
      (e) =>
        e.status === "active" ||
        e.status === "approved" ||
        e.status === "accepted" ||
        e.status === "blocked",
    );
  }, [allProcessedEmployers]);

  const pendingList = useMemo(() => {
    return allProcessedEmployers.filter(
      (e) => e.status === "pending" || e.status === "pending_approval" || e.status === "verification"
    );
  }, [allProcessedEmployers]);

  const rejectedList = useMemo(() => {
    return allProcessedEmployers.filter(
      (e) => e.status === "rejected"
    );
  }, [allProcessedEmployers]);

  // Current tab filtered data
  const currentTabEmployers = useMemo(() => {
    let filtered = [];
    if (activeTab === "approved") filtered = approvedList;
    else if (activeTab === "pending") filtered = pendingList;
    else if (activeTab === "rejected") filtered = rejectedList;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.companyName?.toLowerCase().includes(lower) ||
          e.email?.toLowerCase().includes(lower)
      );
    }

    if (activeTab === "approved" && accountStatusFilter !== "all") {
      filtered = filtered.filter(
        (employer) =>
          accountStatusFilter === "active"
            ? isActiveEmployerStatus(employer.status)
            : employer.status === "blocked",
      );
    }

    if (companyTypeFilter !== "all") {
      filtered = filtered.filter((employer) => {
        const rawType =
          selectedCompanyTypes[employer._id] ||
          employer.companyType ||
          employer.typeOfCompany ||
          employer.businessDetail?.typeOfCompany ||
          employer.businessDetail?.companyType ||
          employer.type ||
          "";
        const normalizedType = String(rawType).trim().toLowerCase();
        
        // Show companies without any type (not internal AND not external)
        if (companyTypeFilter === "pending") {
          return normalizedType !== "internal" && normalizedType !== "external";
        }
        
        // Show companies with exact type match (internal or external)
        return normalizedType === companyTypeFilter;
      });
    }

    return filtered;
  }, [
    activeTab,
    approvedList,
    pendingList,
    rejectedList,
    searchTerm,
    companyTypeFilter,
    accountStatusFilter,
    selectedCompanyTypes,
  ]);

  const handleCompanyTypeChange = (id, newType) => {
    if (!newType) return;
    if (
      window.confirm(
        `Are you sure you want to set this company as "${newType}"?`
      )
    ) {
      setSelectedCompanyTypes((prev) => ({ ...prev, [id]: newType }));
      dispatch(updateCompanyType({ id, companyType: newType })).then(() => {
        dispatch(fetchEmployers({ page: 1, limit: EMPLOYERS_FETCH_LIMIT, fetchAll: true }));
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      dispatch(deleteEmployer(selectedRow._id));
    }
  };

  const handleBlock = () => {
    if (selectedRow) {
      const newStatus = isActiveEmployerStatus(selectedRow.status)
        ? "blocked"
        : "active";
      setLocalStatusUpdates((prev) => ({ ...prev, [selectedRow._id]: newStatus }));
      dispatch(updateEmployerStatus({ id: selectedRow._id, status: newStatus }))
        .unwrap()
        .then(() => {
          dispatch(
            fetchEmployers({ page: 1, limit: EMPLOYERS_FETCH_LIMIT, fetchAll: true })
          );
        });
    }
    setOpenBlockModal(false);
    setSelectedRow(null);
  };

  // Open Approval/Rejection Modal
  const openApprovalActionModal = (company, actionType) => {
    setApprovalModal({
      isOpen: true,
      company,
      actionType,
      reason: "",
    });
  };

  // Execute Approval or Rejection Decision
  const handleConfirmApprovalAction = () => {
    const { company, actionType, reason } = approvalModal;
    if (!company) return;

    let newStatus;
    let dispatchStatus;
    if (actionType === "approve") {
      newStatus = "accepted";
      dispatchStatus = "accepted";
    } else if (actionType === "reject") {
      newStatus = "rejected";
      dispatchStatus = "rejected";
    } else if (actionType === "reapprove") {
      newStatus = "pending";
      dispatchStatus = "reapprove";
    }

    // Update local state immediately for instant feedback
    setLocalStatusUpdates((prev) => ({ ...prev, [company._id]: newStatus }));

    // Dispatch redux update with reason and email
    dispatch(updateEmployerStatus({ 
      id: company._id, 
      status: dispatchStatus, 
      reason: reason, 
      email: company.email 
    }));

    if (actionType === "approve") {
      toast.success(`"${company.companyName}" has been Accepted & Published to Employee Management!`);
    } else if (actionType === "reapprove") {
      toast.success(`"${company.companyName}" has been moved back to Pending Approvals.`);
    } else {
      toast.info(`"${company.companyName}" Job/Registration Request was Rejected.`);
    }

    setApprovalModal({ isOpen: false, company: null, actionType: "approve", reason: "" });
  };

  const getColumnWidthClass = (id) => {
    switch (id) {
      case "srNo":
        return "w-[60px] min-w-[60px]";
      case "company":
        return "w-[280px] min-w-[280px]";
      case "companyType":
        return "w-[120px] min-w-[120px]";
      case "totalJobs":
        return "w-[110px] min-w-[110px]";
      case "creditsLeft":
        return "w-[160px] min-w-[160px]";
      case "status":
        return "w-[160px] min-w-[160px]";
      case "action":
        return "w-[220px] min-w-[220px]";
      default:
        return "";
    }
  };

  const columns = [
    {
      id: "srNo",
      header: "Sr.No.",
      cell: ({ row }) => (page - 1) * pageSize + row.index + 1,
    },
    {
      id: "company",
      header: "Company",
      cell: ({ row }) => {
        const logo = row.original.companyLogo?.[0];
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#FFFFFF] to-[#8931BA] shadow-sm">
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
            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-900">
                {row.original.companyName}
              </span>
              {row.original.email && (
                <span className="text-xs text-gray-500">
                  {row.original.email}
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      id: "companyType",
      accessorKey: "companyType",
      header: "Type",
      cell: ({ row }) => {
        const rawType =
          selectedCompanyTypes[row.original._id] ||
          row.original.companyType ||
          row.original.typeOfCompany ||
          row.original.businessDetail?.typeOfCompany ||
          row.original.businessDetail?.companyType ||
          row.original.type ||
          "";
        const lowerType = String(rawType).toLowerCase();
        const normalizedType = lowerType.includes("internal")
          ? "internal"
          : lowerType.includes("external")
          ? "external"
          : "";

        if (activeTab !== "approved" && activeTab !== "pending") {
          return (
            <span className="text-sm font-medium text-gray-500 capitalize">
              {normalizedType || "N/A"}
            </span>
          );
        }

        return (
          <div className="flex justify-center">
            <select
              value={normalizedType}
              onChange={(e) =>
                handleCompanyTypeChange(row.original._id, e.target.value)
              }
              disabled={companyTypeLoading}
              title="Set Company Type"
              className={`text-xs border rounded-md px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed min-w-[110px] font-medium capitalize ${
                normalizedType
                  ? "bg-purple-50 text-purple-700 border-purple-400 shadow-sm"
                  : "bg-white text-gray-700 border-purple-300"
              }`}
            >
              <option value="">Company Type</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>
        );
      },
    },
    { 
      id: "totalJobs",
      accessorKey: "totalJobs", 
      header: "Posted Jobs",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-800">
          {row.original.totalJobs || 0}
        </span>
      ),
    },
    {
      id: "creditsLeft",
      header: "Credits Left",
      cell: ({ row }) => (
        <div className="text-sm leading-5 text-center">
          <p className="font-medium text-purple-700">Job Credits {row.original.creditsLeft || 0}</p>
          <p className="text-xs text-gray-500">Database Credits 0</p>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const st = row.original.status;
        if (st === "pending" || st === "pending_approval" || st === "verification") {
          return (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-300 text-amber-700 rounded-full text-xs font-semibold shadow-xs animate-pulse">
              <Clock size={14} className="text-amber-600" />
              <span>Pending Approval</span>
            </div>
          );
        }
        if (st === "rejected") {
          return (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-300 text-red-700 rounded-full text-xs font-semibold">
              <XCircle size={14} className="text-red-500" />
              <span>Rejected</span>
            </div>
          );
        }
        if (st === "blocked") {
          return (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-300 text-red-700 rounded-full text-xs font-semibold">
              <Ban size={14} className="text-red-500" />
              <span>Blocked</span>
            </div>
          );
        }
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full text-xs font-semibold">
            <CheckCircle size={14} className="text-emerald-500" />
            <span>Active</span>
          </div>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const st = row.original.status;
        
        // Actions for Pending Requests Tab
        if (st === "pending" || st === "pending_approval" || st === "verification") {
          return (
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() => openApprovalActionModal(row.original, "approve")}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm cursor-pointer"
                title="Accept Company Request"
              >
                <Check size={14} />
                <span>Accept</span>
              </button>
              <button
                onClick={() => openApprovalActionModal(row.original, "reject")}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-all shadow-sm cursor-pointer"
                title="Reject Company Request"
              >
                <X size={14} />
                <span>Reject</span>
              </button>
              <Eye
                size={18}
                className="text-purple-600 hover:text-purple-800 cursor-pointer ml-1"
                onClick={() =>
                  navigate(`/employee/company-details/${row.original._id}`)
                }
                title="View Request Details"
              />
            </div>
          );
        }

        // Actions for Rejected Tab
        if (st === "rejected") {
          return (
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() => openApprovalActionModal(row.original, "reapprove")}
                className="flex items-center gap-1 px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 rounded-lg text-xs font-medium transition-all cursor-pointer"
                title="Re-approve Company"
              >
                <CheckCircle size={14} />
                <span>Re-Approve</span>
              </button>
              <Eye
                size={18}
                className="text-purple-600 hover:text-purple-800 cursor-pointer"
                onClick={() =>
                  navigate(`/employee/company-details/${row.original._id}`)
                }
                title="View Details"
              />
              <Trash2
                size={18}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => {
                  setSelectedRow(row.original);
                  setOpenModal(true);
                }}
                title="Delete Employer"
              />
            </div>
          );
        }

        // Default Actions for Approved/Active Companies
        return (
          <div className="flex gap-3 items-center flex-wrap justify-center">
            <Eye
              size={18}
              className="text-purple-600 hover:text-purple-800 cursor-pointer"
              onClick={() =>
                navigate(`/employee/company-details/${row.original._id}`)
              }
              title="View Details"
            />
            <Edit
              size={18}
              className="text-purple-600 hover:text-purple-800 cursor-pointer"
              onClick={() =>
                navigate(`/employee/edit-employee/${row.original._id}`)
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
              <Ban size={18} className="text-red-500 hover:text-red-700" title="Block Employer" />
            </div>
            <Trash2
              size={18}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => {
                setSelectedRow(row.original);
                setOpenModal(true);
              }}
              title="Delete Employer"
            />
          </div>
        );
      },
    },
  ];

  // All API pages are fetched above, so pagination is always applied locally.
  const displayEmployers = useMemo(() => {
    if (pageSize >= EMPLOYERS_FETCH_LIMIT) {
      return currentTabEmployers;
    }
    const start = (page - 1) * pageSize;
    return currentTabEmployers.slice(start, start + pageSize);
  }, [currentTabEmployers, page, pageSize]);

  const table = useReactTable({
    data: displayEmployers || [],
    columns: columns.filter(col => (activeTab === "approved" || activeTab === "pending") || col.accessorKey !== "companyType"),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen overflow-y-auto no-scrollbar pb-20 relative">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        
        {/* HEADER TITLE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Building2 className="text-purple-600" size={26} />
              Employer Management
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Admin decision center: Accept or Reject new company job requests & manage active employers.
            </p>
          </div>

          <button
            onClick={() => navigate("/employee/add-employee")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Plus size={18} />
            <span>Add Employer</span>
          </button>
        </div>

        {/* METRIC SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div 
            onClick={() => setActiveTab("approved")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "approved" 
                ? "bg-purple-50/80 border-purple-400 ring-2 ring-purple-300/50 shadow-sm" 
                : "bg-white border-gray-200 hover:border-purple-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Approved Companies</span>
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{approvedList.length}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">Active in Employee Management</p>
          </div>

          <div 
            onClick={() => setActiveTab("pending")}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              activeTab === "pending" 
                ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-300/50 shadow-sm" 
                : "bg-white border-gray-200 hover:border-amber-200"
            }`}
          >
            {pendingList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full animate-ping"></span>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Pending Approvals</span>
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-700 mt-2">{pendingList.length}</p>
            <p className="text-xs text-amber-600 font-medium mt-1">Awaiting Admin Accept/Reject</p>
          </div>

          <div 
            onClick={() => setActiveTab("rejected")}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "rejected" 
                ? "bg-red-50/80 border-red-400 ring-2 ring-red-300/50 shadow-sm" 
                : "bg-white border-gray-200 hover:border-red-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Rejected Requests</span>
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-700 mt-2">{rejectedList.length}</p>
            <p className="text-xs text-red-600 font-medium mt-1">Not shown in Employee Management</p>
          </div>
        </div>

        {/* TABLE CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 mb-6 pb-4">
          {/* SEARCH */}
          <div className="flex items-center w-full sm:w-[300px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* PAGE SIZE SELECTOR */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {activeTab === "approved" && (
              <select
                value={companyTypeFilter}
                onChange={(e) => setCompanyTypeFilter(e.target.value)}
                className="h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-purple-300 transition-colors"
                aria-label="Filter companies by type"
              >
                <option value="all">All Types</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
                <option value="pending">Pending</option>
              </select>
            )}
            {activeTab === "pending" && (
              <select
                value={companyTypeFilter}
                onChange={(e) => setCompanyTypeFilter(e.target.value)}
                className="h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-purple-300 transition-colors"
                aria-label="Filter pending companies by type"
              >
                <option value="all">All Pending</option>
                <option value="pending">Type Not Selected</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            )}
            {activeTab === "approved" && (
              <select
                value={accountStatusFilter}
                onChange={(e) => setAccountStatusFilter(e.target.value)}
                className="h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-purple-300 transition-colors"
                aria-label="Filter companies by status"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            )}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-purple-300 transition-colors"
              title="Select Companies Per Page"
            >
              <option value={10}>10 Per Page</option>
              <option value={25}>25 Per Page</option>
              <option value={50}>50 Per Page</option>
              <option value={100}>100 Per Page</option>
              <option value={1000}>Show All ({currentTabEmployers.length})</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="rounded-xl overflow-x-auto min-h-[380px] w-full border border-gray-100">
          <table className="w-full text-sm border-collapse min-w-[1000px]">
            <thead className="bg-[#F8F9FA] text-gray-700 border-b border-gray-200">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`py-3.5 px-4 font-semibold text-[14px] text-gray-600 ${
                        header.id === "company" ? "text-left" : "text-center"
                      } ${getColumnWidthClass(header.id)}`}
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
                        Loading Employer Data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 h-18 hover:bg-purple-50/40 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`py-3 px-4 align-middle ${
                          cell.column.id === "company" ? "text-left" : "text-center"
                        } ${getColumnWidthClass(cell.column.id)}`}
                      >
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
                    className="text-center py-16 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Building2 size={36} className="text-gray-300" />
                      <p className="font-medium text-gray-600">
                        {activeTab === "pending"
                          ? "No pending company requests at the moment."
                          : activeTab === "rejected"
                          ? "No rejected company requests."
                          : "No approved employers found."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {(() => {
          const totalCount = currentTabEmployers.length;
          const totalPageCount = Math.ceil(totalCount / pageSize) || 1;

          return (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6 font-semibold text-purple-600">
              <span className="text-center sm:text-left text-sm text-gray-600">
                Showing {totalCount === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
                {Math.min(page * pageSize, totalCount)} of {totalCount} total companies
              </span>

              <div className="flex gap-2 items-center flex-wrap justify-center sm:justify-end">
                <button
                  onClick={() => setPage(Math.max(page - 1, 1))}
                  disabled={page === 1}
                  className="w-9 h-9 border border-purple-400 text-[#9b27ff] rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-purple-50 transition cursor-pointer font-bold text-sm shadow-sm"
                >
                  {"<"}
                </button>

                {[...Array(totalPageCount)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-full font-bold text-sm transition flex items-center justify-center shadow-sm ${
                      page === i + 1 ? "bg-[#9b27ff] text-white border border-[#9b27ff]" : "border border-purple-400 text-[#9b27ff] hover:bg-purple-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(page + 1, totalPageCount))}
                  disabled={page >= totalPageCount}
                  className="w-9 h-9 border border-purple-400 text-[#9b27ff] rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-purple-50 transition cursor-pointer font-bold text-sm shadow-sm"
                >
                  {">"}
                </button>
              </div>
            </div>
          );
        })()}

        {/* APPROVAL / REJECTION DECISION MODAL */}
        {approvalModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 transform transition-all animate-scaleIn">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {approvalModal.actionType === "approve" || approvalModal.actionType === "reapprove" ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ThumbsUp size={22} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <ThumbsDown size={22} />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {approvalModal.actionType === "approve"
                      ? "Accept Company Request"
                      : approvalModal.actionType === "reapprove"
                      ? "Re-Approve Company Request"
                      : "Reject Company Request"}
                  </h3>
                </div>
                <button
                  onClick={() => setApprovalModal({ isOpen: false, company: null, actionType: "approve", reason: "" })}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {approvalModal.actionType === "approve" ? (
                  <>
                    Are you sure you want to <strong className="text-emerald-700">ACCEPT</strong> company{" "}
                    <strong>&quot;{approvalModal.company?.companyName}&quot;</strong>? Upon acceptance, this company will be published directly to <strong>Employee Management</strong>.
                  </>
                ) : approvalModal.actionType === "reapprove" ? (
                  <>
                    Are you sure you want to <strong className="text-purple-700">RE-APPROVE</strong> company{" "}
                    <strong>&quot;{approvalModal.company?.companyName}&quot;</strong>? It will be moved back to the <strong>Pending Approvals</strong> section.
                  </>
                ) : (
                  <>
                    Are you sure you want to <strong className="text-red-600">REJECT</strong> company{" "}
                    <strong>&quot;{approvalModal.company?.companyName}&quot;</strong>? It will be removed from Employee Management and moved to Rejected Requests.
                  </>
                )}
              </p>

              {approvalModal.actionType === "reject" && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rejection Reason (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for rejection (e.g. Incomplete details, invalid documentation)..."
                    value={approvalModal.reason}
                    onChange={(e) =>
                      setApprovalModal((prev) => ({ ...prev, reason: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-lg outline-none focus:border-red-500 focus:ring-1 focus:ring-red-400"
                  />
                </div>
              )}

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setApprovalModal({ isOpen: false, company: null, actionType: "approve", reason: "" })}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApprovalAction}
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition ${
                    approvalModal.actionType === "approve"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : approvalModal.actionType === "reapprove"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {approvalModal.actionType === "approve"
                    ? "Confirm Accept"
                    : approvalModal.actionType === "reapprove"
                    ? "Confirm Re-Approve"
                    : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        )}

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
          title={isActiveEmployerStatus(selectedRow?.status) ? "Block Employer" : "Unblock Employer"}
          message={
            isActiveEmployerStatus(selectedRow?.status)
              ? `Are you sure you want to block "${selectedRow?.companyName || selectedRow?.name}"?`
              : `Are you sure you want to unblock "${selectedRow?.companyName || selectedRow?.name}"?`
          }
          buttonText={isActiveEmployerStatus(selectedRow?.status) ? "Block" : "Unblock"}
          variant={isActiveEmployerStatus(selectedRow?.status) ? "danger" : undefined}
        />

        <DeleteModal
          isOpen={openModal}
          onClose={() => {
            if (!deleteLoading) {
              setOpenModal(false);
              setSelectedRow(null);
            }
          }}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeTable;

