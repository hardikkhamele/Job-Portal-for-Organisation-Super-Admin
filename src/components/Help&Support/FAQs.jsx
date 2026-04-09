import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, SquarePen , Trash2, X  } from "lucide-react";


import DeleteModal from "../common/DeleteModal";
import Footer from "../Footer";



const FAQs = () => {

const [dropdownOpen, setDropdownOpen] = useState(false);
const [selectedType, setSelectedType] = useState("All Jobs");
const options = ["All Jobs", "Job Seeker", "Employer"];
const [openDelete, setOpenDelete] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [openCreateModal, setOpenCreateModal] = useState(false);


const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
const [modalSelected, setModalSelected] = useState("Job Seeker");
const modalOptions = ["Job Seeker", "Employer"];

const [openEditModal, setOpenEditModal] = useState(false);
const [editData, setEditData] = useState(null);


const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
const [createSelectedType, setCreateSelectedType] = useState("Job Seeker");
const createOptions = ["Job Seeker", "Employer"];

const [openViewModal, setOpenViewModal] = useState(false);
const [viewData, setViewData] = useState(null);

 const data = useMemo(() => {
  return Array.from({ length: 20 }, (_, i) => ({
    sr: i + 1,
    userType: i % 2 === 0 ? "Job Seeker" : "Employer",
    question: "This is a question?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }));
}, []);

  const columns = useMemo(
    () => [
      { header: "Sr.No.", accessorKey: "sr" },
      { header: "User Type", accessorKey: "userType" },
      { header: "Question", accessorKey: "question" },
      { header: "Answer", accessorKey: "answer" },
      {
        header: "Action",
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

  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 5,
});

 const table = useReactTable({
  data,
  columns,
  state: {
    pagination,
  },
  onPaginationChange: setPagination, 
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

  const handleDeleteConfirm = () => {
    console.log("Deleted:", selectedRow);
    setOpenDelete(false);
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
            placeholder="Search"
            className="border border-gray-200 px-3 py-2 rounded-md w-64 bg-[#F7F8F9]"
          />

          <div className="flex gap-3 ">
            <div className="relative w-44">
              {/* Selected */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-gray-200 px-3 py-2 rounded-md bg-white flex justify-between items-center cursor-pointer"
              >
               
                {selectedType}
                 

                
              
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white  rounded-md mt-1 shadow z-10">
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
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center p-5 text">
            <span className="text-purple-600 font-bold">
              Showing{" "}
              {table.getState().pagination.pageIndex * 5 + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * 5,
                data.length
              )}{" "}
              of {data.length} FAQ's
            </span>

            <div className="flex gap-2 items-center rounded-full ">
              {/* Prev */}
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border px-2 py-1 rounded-full cursor-pointer"
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
                      ? "bg-purple-600 text-white font-bold cursor-pointer"
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
                className="border px-2 py-1 rounded-full p-5 cursor-pointer"
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
                      className="w-full border border-gray-200 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer"
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
                <label className="text-lf text-gray-900">Question</label>
                <input
                  type="text"
                  placeholder="This is a question?"
                  className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base"
                />
              </div>

              {/* Answer */}
              <div className="mb-4">
                <label className="text-lg text-gray-900">Answer</label>
                <textarea
                  rows="3"
                  placeholder="Write Answer Here....."
                  className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none text-base"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={() => setOpenCreateModal(false)}
                  className="px-15 py-2 rounded-md bg-purple-200 text-purple-700 cursor-pointer"
                >
                  Cancel
                </button>

                <button 
                onClick={() => setOpenCreateModal(false)}
                className="px-15 py-2 rounded-md bg-purple-600 text-white cursor-pointer">
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
                  <label className="text-sm text-gray-600">User Type</label>

                  <div className="relative mt-1">

                    {/* Selected */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreateDropdownOpen(!createDropdownOpen);
                      }}
                      className="w-full border border-gray-200 p-2 rounded-md bg-gray-100 flex justify-between items-center cursor-pointer"
                    >
                      {createSelectedType}
                      <span>⌄</span>
                    </div>
                    
                    {/* Dropdown */}
                    {createDropdownOpen && (
                      <div className="absolute w-full bg-white  rounded-md mt-1 shadow z-50">
                        {createOptions.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setCreateSelectedType(item);
                              setCreateDropdownOpen(false);
                            }}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                              createSelectedType === item ? "bg-gray-200" : ""
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
                    
                     placeholder="This is a question?"
                    onChange={(e) =>
                      setEditData({ ...editData, question: e.target.value })
                    }
                    className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none"
                  />
                </div>
                  
                {/* Answer */}
                <div className="mb-4">
                  <label className="text-lg text-gray-900">Answer</label>
                  <textarea
                    rows="3"
                    placeholder="Write Answer Here...."
                    onChange={(e) =>
                      setEditData({ ...editData, answer: e.target.value })
                    }
                    className="w-full border border-gray-200 mt-1 p-2 rounded-md bg-gray-100 outline-none"
                  />
                </div>
                  
                {/* Buttons */}
                <div className="flex justify-center gap-6 mt-6">
                  <button
                    onClick={() => setOpenEditModal(false)}
                    className="px-15 py-2 rounded-md bg-purple-200 text-purple-700"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log("Updated Data:", editData);
                      setOpenEditModal(false);
                    }}
                    className="px-15 py-2 rounded-md bg-purple-600 text-white"
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