import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, SquarePen , Trash2, X, ChevronDown } from "lucide-react";


import DeleteModal from "../common/DeleteModal";
import Footer from "../Footer";



const FAQs = () => {

const [dropdownOpen, setDropdownOpen] = useState(false);
const [selectedType, setSelectedType] = useState("All Jobs");
const options = ["All Jobs", "Job Seeker", "Employer"];
const [openDelete, setOpenDelete] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [openCreateModal, setOpenCreateModal] = useState(false);
const [searchTerm, setSearchTerm] = useState("");


const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
const [modalSelected, setModalSelected] = useState("Job Seeker");
const modalOptions = ["Job Seeker", "Employer"];

const [openEditModal, setOpenEditModal] = useState(false);
const [editData, setEditData] = useState(null);


const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
const createOptions = ["Job Seeker", "Employer"];

const [openViewModal, setOpenViewModal] = useState(false);
const [viewData, setViewData] = useState(null);

const [createQuestion, setCreateQuestion] = useState("");
const [createAnswer, setCreateAnswer] = useState("");

const [faqsData, setFaqsData] = useState(() => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    userType: i % 2 === 0 ? "Job Seeker" : "Employer",
    question: `This is a question ${i + 1}?`,
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }));
});

// Dynamic filtering and search logic
const filteredData = useMemo(() => {
  let result = faqsData;

  // Filter by User Type dropdown selectionz
  if (selectedType !== "All Jobs") {
    result = result.filter((item) => item.userType === selectedType);
  }

  // Filter by search query input
  if (searchTerm.trim() !== "") {
    const searchLower = searchTerm.toLowerCase();
    result = result.filter(
      (item) =>
        item.question.toLowerCase().includes(searchLower) ||
        item.answer.toLowerCase().includes(searchLower) ||
        item.userType.toLowerCase().includes(searchLower)
    );
  }

  // Re-index Sr.No for filtered results
  return result.map((item, idx) => ({
    ...item,
    sr: idx + 1,
  }));
}, [faqsData, selectedType, searchTerm]);

const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 5,
});

// Reset pagination when filter/search changes
useEffect(() => {
  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
}, [selectedType, searchTerm]);

  const columns = useMemo(
    () => [
      { header: "Sr.No.", accessorKey: "sr" },
      { header: "User Type", accessorKey: "userType" },
      { header: "Question", accessorKey: "question" },
      { header: "Answer", accessorKey: "answer" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3 justify-center">
            <Eye
              size={20}
              className="cursor-pointer text-purple-600"
              onClick={() => {
                setViewData(row.original);
                setOpenViewModal(true);
              }}
            />
            <SquarePen
              size={20}
              className="cursor-pointer text-purple-600"
              onClick={() => {
                setEditData(row.original); 
                setOpenEditModal(true);
              }}
            />
            {/* DELETE */}
            <Trash2
              size={20}
              className="cursor-pointer text-red-500"
              onClick={() => {
                setSelectedRow(row.original);
                setOpenDelete(true);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

 const table = useReactTable({
  data: filteredData,
  columns,
  state: {
    pagination,
  },
  onPaginationChange: setPagination, 
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      setFaqsData((prev) => prev.filter((item) => item.id !== selectedRow.id));
    }
    setOpenDelete(false);
    setSelectedRow(null);
  };

  const handleCreateFAQ = () => {
    if (!createQuestion.trim() || !createAnswer.trim()) return;
    const newFaq = {
      id: Date.now(),
      userType: modalSelected,
      question: createQuestion,
      answer: createAnswer,
    };
    setFaqsData((prev) => [newFaq, ...prev]);
    setOpenCreateModal(false);
    setCreateQuestion("");
    setCreateAnswer("");
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setCreateQuestion("");
    setCreateAnswer("");
  };

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

          <div className="flex gap-3 ">
            <div className="relative w-44">
              {/* Selected */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-gray-200 px-3 py-2 rounded-md bg-white flex justify-between items-center cursor-pointer"
              >
               
                {selectedType}
                <ChevronDown size={18} className="text-gray-500" />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white rounded-md mt-1 shadow z-10">
                  {options.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedType(item);
                        setDropdownOpen(false);
                      }}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedType === item ? "bg-gray-200" : ""
                      }`}
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
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-gray-500">
                    No FAQs found matching the filters.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.accessorKey,
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
              Showing{" "}
              {filteredData.length === 0 ? 0 : table.getState().pagination.pageIndex * 5 + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * 5,
                filteredData.length
              )}{" "}
              of {filteredData.length} FAQ's
            </span>

            <div className="flex gap-2 items-center rounded-full ">
              {/* Prev */}
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border px-2 py-1 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"<"}
              </button>

              {/* Page Numbers */}
              {[...Array(table.getPageCount()).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    table.getState().pagination.pageIndex === page
                      ? "bg-purple-600 text-white font-bold"
                      : "border"
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border px-2 py-1 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm} 
      />

      {openCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 ">

            {/* Modal Box */}
            <div className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_8px_30px_rgba(0,0,0,0.15)]">

              {/* Title */}
              <h2 className="text-center text-xl font-semibold text-purple-600 mb-4">
                Add FAQ
              </h2>

              {/* User Type */}
             
                <div className="mb-4">
                  <label className="text-lg text-gray-900">User Type</label>

                  <div className="relative mt-1">

                    {/* Selected */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalDropdownOpen(!modalDropdownOpen);
                      }}
                      className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer text-base h-[42px]"
                    >
                      {modalSelected}
                      <span>⌄</span>
                    </div>
                    
                    {/* Dropdown */}
                    {modalDropdownOpen && (
                      <div className="absolute w-full bg-white  rounded-md mt-1 shadow z-50">
                        {modalOptions.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setModalSelected(item);
                              setModalDropdownOpen(false);
                            }}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                              modalSelected === item ? "bg-gray-200" : ""
                            }`}
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
                ></textarea>
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
                  className="px-15 py-2 rounded-md bg-purple-600 text-white cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}


        {openEditModal && editData && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 ">

              <div
                className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_10px_40px_rgba(0,0,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Title */}
                <h2 className="text-center text-xl font-semibold text-purple-600 mb-4">
                  Edit FAQ
                </h2>

                {/* User Type */}
                <div className="mb-4">
                  <label className="text-lg text-gray-900">User Type</label>

                  <div className="relative mt-1">

                    {/* Selected */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreateDropdownOpen(!createDropdownOpen);
                      }}
                      className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer text-base h-[42px]"
                    >
                      {editData.userType}
                      <span>⌄</span>
                    </div>
                    
                    {/* Dropdown */}
                    {createDropdownOpen && (
                      <div className="absolute w-full bg-white  rounded-md mt-1 shadow z-50">
                        {createOptions.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setEditData({ ...editData, userType: item });
                              setCreateDropdownOpen(false);
                            }}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                              editData.userType === item ? "bg-gray-200" : ""
                            }`}
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
                    onChange={(e) =>
                      setEditData({ ...editData, question: e.target.value })
                    }
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
                    onChange={(e) =>
                      setEditData({ ...editData, answer: e.target.value })
                    }
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
                      setFaqsData((prev) =>
                        prev.map((item) =>
                          item.id === editData.id ? editData : item
                        )
                      );
                      setOpenEditModal(false);
                    }}
                    className="px-15 py-2 rounded-md bg-purple-600 text-white cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}


          {openViewModal && viewData && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

              <div
                className="bg-white rounded-xl p-6 w-[490px] shadow-[0px_10px_40px_rgba(0,0,0,0.2)] relative"
                onClick={(e) => e.stopPropagation()}
              >
              
                {/* Close Button */}
                <div
                  onClick={() => setOpenViewModal(false)}
                  className="absolute -top-3 -right-3 bg-purple-200 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-purple-300"
                >
                  <X size={16} />
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-purple-600 mb-4">FAQ</h2>

                {/* Question */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Question</p>
                  <p className="text-gray-800 mt-1">{viewData.question}</p>
                </div>

                {/* Answer */}
                <div>
                  <p className="text-sm font-medium text-gray-600">Answer</p>
                  <p className="text-gray-800 mt-1">{viewData.answer}</p>
                </div>
              </div>
            </div>
          )}


   <Footer/>
   
    </div>
  );
};

export default FAQs;