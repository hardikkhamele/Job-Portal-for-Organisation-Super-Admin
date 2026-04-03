import React, { useMemo, useState,  useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender,} from "@tanstack/react-table";
import { Eye, Trash2, CheckCircle, XCircle, Briefcase, Layers, Database, AlertTriangle, TrendingUp} from "lucide-react";
import DeleteModal from "../../components/common/DeleteModal";


function JobInformation({ setViewJob }) {

    const [search, setSearch] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("All");

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [open, setOpen] = useState(false);
    // const [viewJob, setViewJob] = useState(null);

    const handleConfirmDelete = () => {
      console.log("Deleting job:", selectedJob);

      setIsDeleteOpen(false);
    };

    const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
    };

      useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
    }, [search, jobTypeFilter]);

  // DATA
  const data = useMemo(
    () => [
      { sr: 1, post: "UI/UX Designer", type: "Classic", date: "Feb 12, 2026 19:28", status: "Active" },
      { sr: 2, post: "Senior UX Designer", type: "Super", date: "Feb 12, 2026 19:28", status: "Expired" },
      { sr: 3, post: "Technical Support Specialist", type: "Premium", date: "Feb 10, 2026 19:28", status: "Active" },
      { sr: 4, post: "Senior UX Designer", type: "Premium", date: "Feb 14, 2026 19:28", status: "Active" },
      { sr: 5, post: "Junior Graphic Designer", type: "Classic", date: "Feb 19, 2026 19:28", status: "Active" },
      { sr: 6, post: "Junior UI/UX Designer", type: "Super", date: "Feb 20, 2026 19:28", status: "Expired" },
      { sr: 7, post: "Front End Developer", type: "Premium", date: "Feb 2, 2026 19:28", status: "Expired" },

      { sr: 8, post: "UI/UX Designer", type: "Classic", date: "Feb 12, 2026 19:28", status: "Active" },
      { sr: 9, post: "Senior UX Designer", type: "Super", date: "Feb 12, 2026 19:28", status: "Expired" },
      { sr: 10, post: "Technical Support Specialist", type: "Premium", date: "Feb 10, 2026 19:28", status: "Active" },
      { sr: 11, post: "Senior UX Designer", type: "Classic", date: "Feb 14, 2026 19:28", status: "Active" },
      { sr: 12, post: "Junior Graphic Designer", type: "Premium", date: "Feb 19, 2026 19:28", status: "Expired" },
      { sr: 13, post: "Junior UI/UX Designer", type: "Super", date: "Feb 20, 2026 19:28", status: "Active" },
      { sr: 14, post: "Front End Developer", type: "Premium", date: "Feb 2, 2026 19:28", status: "Expired" },

      { sr: 15, post: "UI/UX Designer", type: "Premium", date: "Feb 12, 2026 19:28", status: "Active" },
      { sr: 16, post: "Senior UX Designer", type: "Super", date: "Feb 12, 2026 19:28", status: "Expired" },
      { sr: 17, post: "Technical Support Specialist", type: "Premium", date: "Feb 10, 2026 19:28", status: "Active" },
      { sr: 18, post: "Senior UX Designer", type: "Classic", date: "Feb 14, 2026 19:28", status: "Active" },
      { sr: 19, post: "Junior Graphic Designer", type: "Classic", date: "Feb 19, 2026 19:28", status: "Expired" },
      { sr: 20, post: "Junior UI/UX Designer", type: "Super", date: "Feb 20, 2026 19:28", status: "Active" },
      { sr: 21, post: "Front End Developer", type: "Premium", date: "Feb 2, 2026 19:28", status: "Expired" },
    ],
    []
  );

  // PAGINATION
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  // COLUMNS
  const columns = useMemo(
    () => [
      { accessorKey: "sr", header: "Sr.No." },
      { accessorKey: "post", header: "Job Post" },
      { accessorKey: "type", header: "Job Type" },
      { accessorKey: "date", header: "Expiry Date & time" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            {row.original.status === "Active" ? (
              <>
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-green-500">Active</span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500" size={16} />
                <span className="text-red-500">Expired</span>
              </>
            )}
          </div>
        ),
      },
      {
        header: "Action",
        cell: ({row}) => (
          <div className="flex justify-center gap-3">
            <Eye
              className="text-purple-600 cursor-pointer"
              size={20}
              onClick={() => setViewJob(row.original)}
            />

            <Trash2
              className="cursor-pointer text-red-500"
              onClick={() => handleDeleteClick(row.original)} size={20}
            />
          </div>
        ),
      },
    ],
    [handleDeleteClick]
  );

  const filteredData = useMemo(() => {
  return data.filter((item) => {
    const matchesSearch =
      item.post.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      jobTypeFilter === "All" || item.type === jobTypeFilter;

    return matchesSearch && matchesType;
  });
}, [data, search, jobTypeFilter]);

  // TABLE
  const table = useReactTable({
    data:  filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <div className="p-4">
        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-7">

          {/* Total Job Uploaded */}
          <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
            <div>
              <p className="text-gray-800 text mb-5">Total Job Uploaded</p>
              <h2 className="text-2xl font-semibold mb-5">120</h2>

              <p className="text-sm flex items-center gap-1">
                <TrendingUp className="text-green-500" size={20} />
                <span className="text-gray-800 text-lg">10% vs Last months</span>
              </p>
            </div>

            <div className="bg-purple-100 p-3 rounded-full">
              <Briefcase className="text-purple-600" size={20} />
            </div>
          </div>

          {/* Active Jobs */}
          <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
            <div>
              <p className="text-gray-800 text mb-5">Active Jobs</p>
              <h2 className="text-2xl font-semibold mb-5">28</h2>

              <p className="text flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span className="text-gray-700">
                  <span className="font-semibold text-gray-800 underline">1 Job Post</span>{" "}
                  will Expire on Feb 07, 2026
                </span>
              </p>
            </div>

            <div className="bg-purple-100 p-3 rounded-full">
              <Layers className="text-purple-600" size={20} />
            </div>
          </div>

          {/* Latest Job Post */}
          <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
            <div>
              <p className="text-gray-800 text mb-5">Latest Job Post</p>
              <h2 className="text-2xl font-semibold mb-5">UI/UX Designer</h2>

              <p className="text flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span className="text-gray-700">
                  <span className="font-semibold text-gray-800 underline">Job Post</span>{" "}
                  will Expire on Feb 12, 2026
                </span>
              </p>
            </div>

            <div className="bg-purple-100 p-3 rounded-full">
              <Database className="text-purple-600" size={20} />
            </div>
          </div>

        </div>


      {/* SEARCH */}
      <div className="flex justify-between mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border border-gray-200 rounded-lg px-3 py-2 w-1/4 bg-[#F7F8F9] outline-none"
        />

        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer min-w-[140px]"
          >
            {jobTypeFilter === "All" ? "All Job Type" : jobTypeFilter}
          </div>
        
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg z-10">
              {["All Job Type", "Classic", "Super", "Premium"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setJobTypeFilter(item === "All Job Type" ? "All" : item);
                    setOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* TABLE */}
      <div className=" border border-gray-200 rounded-xl overflow-hidden bg-[#D3D3D3] mb-6">
        <table className="w-full bg-[#FFFFFF]">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-center">
                    {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">

        <p className="text-purple-600 font-bold">
          Showing{" "}
          {pagination.pageIndex * pagination.pageSize + 1} to{" "}
          {Math.min(
            (pagination.pageIndex + 1) * pagination.pageSize,
           filteredData.length
          )}{" "}
          of {filteredData.length} Jobs
        </p>

        <div className="flex gap-2">

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-8 h-8 border rounded-full border-purple-400 text-purple-600 font-bold"
          >
            {"<"}
          </button>

          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`w-8 h-8 rounded-full border border-purple-400 font-bold text-purple-600 ${
                pagination.pageIndex === i
                  ? "bg-purple-600 text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-8 h-8 border border-purple-400 rounded-full font-bold text-purple-600"
          >
            {">"}
          </button>

          <DeleteModal
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={handleConfirmDelete}
            />
        </div>
      </div>
    </div>
  );
}

export default JobInformation;