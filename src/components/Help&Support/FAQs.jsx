import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, SquarePen, Trash2, X, ChevronDown } from "lucide-react";

import DeleteModal from "../common/DeleteModal";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFAQs,
  createFAQ,
  deleteFAQ,
  updateFAQ,
  resetFaqState,
} from "../../redux/slice/helpAndSupport/faqSlice";

// ─── Display label → API userType value ─────────────────────────
const USER_TYPE_API_MAP = {
  "All Jobs":   "",
  "Job Seeker": "JobSeeker",
  "Employer":   "Employer",
};

// ─── API userType value → Display label ─────────────────────────
const toDisplayUserType = (apiVal = "") => {
  if (apiVal === "JobSeeker" || apiVal === "job_seeker") return "Job Seeker";
  if (apiVal === "Employer"  || apiVal === "employer")  return "Employer";
  return apiVal;
};

const LIMIT = 5;

const FAQs = () => {
  const dispatch = useDispatch();
  const {
    faqs,
    fetchLoading,
    faqsPagination,
    loading: createLoading,
    success: createSuccess,
    updateLoading,
    updateSuccess,
    deleteLoading,
    deleteSuccess,
  } = useSelector((state) => state.faqs);

  // ─── Filter / Search / Page state ───────────────────────────
  const [selectedType, setSelectedType] = useState("All Jobs");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const options = ["All Jobs", "Job Seeker", "Employer"];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Modal states ────────────────────────────────────────────
  const [openDelete, setOpenDelete]       = useState(false);
  const [selectedRow, setSelectedRow]     = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData]           = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewData, setViewData]           = useState(null);

  // Create modal state
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
  const [modalSelected, setModalSelected] = useState("Job Seeker");
  const modalOptions = ["Job Seeker", "Employer"];
  const [createQuestion, setCreateQuestion] = useState("");
  const [createAnswer, setCreateAnswer]     = useState("");

  // Edit modal state
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const editOptions = ["Job Seeker", "Employer"];

  // ─── Refetch trigger ────────────────────────────────────────
  const [refetchKey, setRefetchKey] = useState(0);
  const triggerRefetch = () => setRefetchKey((k) => k + 1);

  // ─── Debounce search input (400ms) ──────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ─── Reset page when filter changes ─────────────────────────
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  // ─── Main fetch ─────────────────────────────────────────────
  useEffect(() => {
    dispatch(
      fetchFAQs({
        search:   debouncedSearch,
        userType: USER_TYPE_API_MAP[selectedType] || "",
        page:     currentPage,
        limit:    LIMIT,
      })
    );
  }, [debouncedSearch, selectedType, currentPage, refetchKey, dispatch]);

  // ─── On Create success → close modal & re-fetch ─────────────
  useEffect(() => {
    if (createSuccess) {
      setOpenCreateModal(false);
      setCreateQuestion("");
      setCreateAnswer("");
      dispatch(resetFaqState());
      triggerRefetch();
    }
  }, [createSuccess, dispatch]);

  // ─── On Update success → close modal & re-fetch ─────────────
  useEffect(() => {
    if (updateSuccess) {
      setOpenEditModal(false);
      setEditData(null);
      dispatch(resetFaqState());
      triggerRefetch();
    }
  }, [updateSuccess, dispatch]);

  // ─── On Delete success → close modal & re-fetch ─────────────
  useEffect(() => {
    if (deleteSuccess) {
      setOpenDelete(false);
      setSelectedRow(null);
      dispatch(resetFaqState());
      triggerRefetch();
    }
  }, [deleteSuccess, dispatch]);

  // ─── Calculate Pagination details safely ────────────────────
  const totalCount = useMemo(() => {
    const apiTotal = faqsPagination?.totalRecords;
    if (typeof apiTotal === "number" && apiTotal > 0) {
      return apiTotal;
    }
    return (faqs || []).length;
  }, [faqsPagination, faqs]);

  const totalPagesCount = useMemo(() => {
    const apiPages = faqsPagination?.totalPages;
    if (typeof apiPages === "number" && apiPages > 0) {
      return apiPages;
    }
    return Math.ceil(totalCount / LIMIT) || 1;
  }, [faqsPagination, totalCount]);

  // Handle client-side slicing fallback if backend returns more items than LIMIT
  const paginatedFaqs = useMemo(() => {
    const rawList = faqs || [];
    // If backend returned more than LIMIT items in one array, slice locally
    if (rawList.length > LIMIT) {
      const start = (currentPage - 1) * LIMIT;
      return rawList.slice(start, start + LIMIT);
    }
    return rawList;
  }, [faqs, currentPage]);

  // ─── Map API data → display format ──────────────────────────
  const faqsData = useMemo(() => {
    return paginatedFaqs.map((faq, idx) => ({
      _id:      faq._id,
      id:       faq._id,
      sr:       (currentPage - 1) * LIMIT + idx + 1,
      userType: toDisplayUserType(faq.userType),
      question: faq.question,
      answer:   faq.answer,
    }));
  }, [paginatedFaqs, currentPage]);

  // ─── Table columns ───────────────────────────────────────────
  const columns = useMemo(
    () => [
      { header: "Sr.No.",    accessorKey: "sr" },
      { header: "User Type", accessorKey: "userType" },
      { header: "Question",  accessorKey: "question" },
      { header: "Answer",    accessorKey: "answer" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3 justify-center">
            <Eye
              size={20}
              className="cursor-pointer text-purple-600"
              onClick={() => { setViewData(row.original); setOpenViewModal(true); }}
            />
            <SquarePen
              size={20}
              className="cursor-pointer text-purple-600"
              onClick={() => { setEditData(row.original); setOpenEditModal(true); }}
            />
            <Trash2
              size={20}
              className="cursor-pointer text-red-500"
              onClick={() => { setSelectedRow(row.original); setOpenDelete(true); }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: faqsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ─── Handlers ────────────────────────────────────────────────
  const handleDeleteConfirm = () => {
    if (selectedRow) dispatch(deleteFAQ(selectedRow._id));
  };

  const handleCreateFAQ = () => {
    if (!createQuestion.trim() || !createAnswer.trim()) return;
    const userTypeMap = { "Job Seeker": "JobSeeker", "Employer": "Employer" };
    dispatch(
      createFAQ({
        question: createQuestion.trim(),
        answer:   createAnswer.trim(),
        userType: userTypeMap[modalSelected] || "JobSeeker",
      })
    );
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setCreateQuestion("");
    setCreateAnswer("");
  };

  // Record range calculation for display
  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const endRecord   = Math.min(currentPage * LIMIT, totalCount);

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      {/* OUTER CARD */}
      <div className="bg-white rounded-xl shadow-sm p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2">FAQs</h1>
        <hr className="mb-6 border-gray-300" />

        {/* Top bar */}
        <div className="flex justify-between mb-4">
          <input
            placeholder="Search FAQs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md w-64 bg-[#F7F8F9] outline-none"
          />

          <div className="flex gap-3">
            {/* Filter Dropdown */}
            <div className="relative w-44">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-gray-200 px-3 py-2 rounded-md bg-white flex justify-between items-center cursor-pointer"
              >
                {selectedType}
                <ChevronDown size={18} className="text-gray-500" />
              </div>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white rounded-md mt-1 shadow z-10">
                  {options.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => { setSelectedType(item); setDropdownOpen(false); }}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedType === item ? "bg-gray-200" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setOpenCreateModal(true)}
              className="bg-yellow-500 text-white px-10 py-2 rounded-md cursor-pointer"
            >
              Create FAQ
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-[#E4E5E8]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-3 px-4 font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {fetchLoading ? (
                <tr>
                  <td colSpan={columns.length} className="py-10 text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <span className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                      Loading FAQs...
                    </div>
                  </td>
                </tr>
              ) : faqsData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-gray-500">
                    No FAQs found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center p-5">
            <span className="text-purple-600 font-bold text-sm">
              Showing {startRecord} to {endRecord} of {totalCount} FAQ's
            </span>

            <div className="flex gap-2 items-center">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="border px-2.5 py-1 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
              >
                {"<"}
              </button>

              {/* Page Numbers */}
              {[...Array(totalPagesCount).keys()].map((i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-full cursor-pointer transition ${
                      currentPage === page
                        ? "bg-purple-600 text-white font-bold"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPagesCount, p + 1))}
                disabled={currentPage >= totalPagesCount}
                className="border px-2.5 py-1 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── DELETE MODAL ─────────────────────────────────────────── */}
      <DeleteModal
        isOpen={openDelete}
        onClose={() => { setOpenDelete(false); setSelectedRow(null); }}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />

      {/* ─── CREATE FAQ MODAL ─────────────────────────────────────── */}
      {openCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_8px_30px_rgba(0,0,0,0.15)]">
            <h2 className="text-center text-xl font-semibold text-purple-600 mb-4">Add FAQ</h2>

            {/* User Type */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">User Type</label>
              <div className="relative mt-1">
                <div
                  onClick={(e) => { e.stopPropagation(); setModalDropdownOpen(!modalDropdownOpen); }}
                  className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer text-base h-[42px]"
                >
                  {modalSelected}
                  <span>⌄</span>
                </div>
                {modalDropdownOpen && (
                  <div className="absolute w-full bg-white rounded-md mt-1 shadow z-50">
                    {modalOptions.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => { setModalSelected(item); setModalDropdownOpen(false); }}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${modalSelected === item ? "bg-gray-200" : ""}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Question */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">Question</label>
              <input
                type="text"
                value={createQuestion}
                onChange={(e) => setCreateQuestion(e.target.value)}
                placeholder="This is a question?"
                className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base h-[42px]"
              />
            </div>

            {/* Answer */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">Answer</label>
              <textarea
                rows="3"
                value={createAnswer}
                onChange={(e) => setCreateAnswer(e.target.value)}
                placeholder="Write Answer Here....."
                className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={handleCloseCreateModal}
                className="px-15 py-2 rounded-md bg-purple-200 text-purple-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFAQ}
                disabled={createLoading}
                className="px-15 py-2 rounded-md bg-purple-600 text-white cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {createLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    Creating...
                  </>
                ) : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT FAQ MODAL ───────────────────────────────────────── */}
      {openEditModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div
            className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_10px_40px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-xl font-semibold text-purple-600 mb-4">Edit FAQ</h2>

            {/* User Type */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">User Type</label>
              <div className="relative mt-1">
                <div
                  onClick={(e) => { e.stopPropagation(); setEditDropdownOpen(!editDropdownOpen); }}
                  className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer text-base h-[42px]"
                >
                  {editData.userType}
                  <span>⌄</span>
                </div>
                {editDropdownOpen && (
                  <div className="absolute w-full bg-white rounded-md mt-1 shadow z-50">
                    {editOptions.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => { setEditData({ ...editData, userType: item }); setEditDropdownOpen(false); }}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${editData.userType === item ? "bg-gray-200" : ""}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Question */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">Question</label>
              <input
                value={editData.question}
                placeholder="This is a question?"
                onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base h-[42px]"
              />
            </div>

            {/* Answer */}
            <div className="mb-4">
              <label className="text-lg text-gray-900">Answer</label>
              <textarea
                rows="3"
                value={editData.answer}
                placeholder="Write Answer Here...."
                onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={() => setOpenEditModal(false)}
                className="px-15 py-2 rounded-md bg-purple-200 text-purple-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editData) return;
                  const userTypeMap = { "Job Seeker": "JobSeeker", "Employer": "Employer" };
                  dispatch(
                    updateFAQ({
                      id:       editData._id,
                      question: editData.question,
                      answer:   editData.answer,
                      userType: userTypeMap[editData.userType] || editData.userType,
                    })
                  );
                }}
                disabled={updateLoading}
                className="px-15 py-2 rounded-md bg-purple-600 text-white cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {updateLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    Saving...
                  </>
                ) : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW FAQ MODAL ───────────────────────────────────────── */}
      {openViewModal && viewData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_10px_40px_rgba(0,0,0,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setOpenViewModal(false)}
              className="absolute -top-3 -right-3 bg-purple-200 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-purple-300"
            >
              <X size={16} />
            </div>
            <h2 className="text-lg font-semibold text-purple-600 mb-4">FAQ</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Question</p>
              <p className="text-gray-800 mt-1">{viewData.question}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Answer</p>
              <p className="text-gray-800 mt-1">{viewData.answer}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FAQs;