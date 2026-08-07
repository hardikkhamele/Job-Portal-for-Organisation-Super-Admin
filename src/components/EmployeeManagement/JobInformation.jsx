import React, { useMemo, useState,  useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender,} from "@tanstack/react-table";
import { Eye, Trash2, CheckCircle, XCircle, Briefcase, Layers, Database, AlertTriangle, TrendingUp} from "lucide-react";
import DeleteModal from "../../components/common/DeleteModal";


function JobInformation({ setViewJob, jobs = [] }) {

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
    () => (jobs || []).map((job, index) => ({
      ...job,
      sr: index + 1,
      id: job._id,
      post: job.jobTitle || "N/A",
      type: job.jobType || job.advanceInformation?.jobType || "Classic",
      date: job.advanceInformation?.expireDate 
        ? new Date(job.advanceInformation.expireDate).toLocaleDateString("en-GB") 
        : "N/A",
      status: job.status?.toLowerCase() === "active" ? "Active" : "Expired",
    })),
    [jobs]
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


  const totalJobsUploaded = data.length;
  const activeJobsCount = data.filter((item) => item.status === "Active").length;
  const latestJobPost = data[0]?.post || "N/A";
  const latestJobExpiry = data[0]?.date || "N/A";

  return (
    <div className="p-4">
        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-7">

          {/* Total Job Uploaded */}
          <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
            <div>
              <p className="text-gray-800 text mb-5">Total Job Uploaded</p>
              <h2 className="text-2xl font-semibold mb-5">{totalJobsUploaded}</h2>

              <p className="text-sm flex items-center gap-1">
                <TrendingUp className="text-green-500" size={20} />
                <span className="text-gray-800 text-lg">Real-time stats</span>
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
              <h2 className="text-2xl font-semibold mb-5">{activeJobsCount}</h2>

              <p className="text flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span className="text-gray-700">
                  <span className="font-semibold text-gray-800">Active postings</span>
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
              <h2 className="text-2xl font-semibold mb-5">{latestJobPost}</h2>

              <p className="text flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span className="text-gray-700">
                  Expires: <span className="font-semibold text-gray-800">{latestJobExpiry}</span>
                </span>
              </p>
            </div>

            <div className="bg-purple-100 p-3 rounded-full">
              <Database className="text-purple-600" size={20} />
            </div>
          </div>

        </div>


      {/* Delete Modal is still needed if we move the delete logic? No, if the table is gone, no delete buttons. So we can remove the DeleteModal too. */}
    </div>
  );
}

export default JobInformation;