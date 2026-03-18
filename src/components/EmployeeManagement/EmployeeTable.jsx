import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

import technokrateLogo from "../../assets/Technokreat.svg";
import googlelogo from "../../assets/Google.svg";
import hcllogo from "../../assets/HCL.svg";
import microsoftlogo from "../../assets/Microsoft.svg";
import nvidialogo from "../../assets/Nvidia.svg";
import infosyslogo from "../../assets/Infosys.svg";
import DeleteModal from "../common/DeleteModal";
import BlockModal from "../common/BlockModal";



const data = [
  {
    sr: 1,
    company: "Technokrate",
    logo: technokrateLogo,
    type: "IT Services & IT Consulting",
    jobs: 28,
    jobCredits: 25,
    dbCredits: 700,
    status: "Active",
  },
  {
    sr: 2,
    company: "Google",
    logo: googlelogo,
    type: "Product-based",
    jobs: 29,
    jobCredits: 12,
    dbCredits: 50,
    status: "Active",
  },
  {
    sr: 3,
    company: "HCL",
    logo: hcllogo,
    type: "Service-based",
    jobs: 45,
    jobCredits: 20,
    dbCredits: 120,
    status: "Active",
  },
  {
    sr: 4,
    company: "Microsoft",
    logo: microsoftlogo,
    type: "IT Services & IT Consulting",
    jobs: 76,
    jobCredits: 23,
    dbCredits: 30,
    status: "Blocked",
  },
  {
    sr: 5,
    company: "Nvidia",
    logo: nvidialogo,
    type: "Service-based",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },
  {
    sr: 6,
    company: "Infosys",
    logo: infosyslogo,
    type: "IT Services & IT Consulting",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },
  {
    sr: 7,
   company: "Technokrate",
    logo: technokrateLogo,
    type: "IT Services & IT Consulting",
    jobs: 28,
    jobCredits: 25,
    dbCredits: 700,
    status: "Active",
  },
  {
    sr: 8,
    company: "Google",
    logo: googlelogo,
    type: "Product-based",
    jobs: 29,
    jobCredits: 12,
    dbCredits: 50,
    status: "Active",
  },

  {
    sr: 9,
    company: "Nvidia",
    logo: nvidialogo,
    type: "Service-based",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },

  {
    sr: 10,
    company: "Infosys",
    logo: infosyslogo,
    type: "IT Services & IT Consulting",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },

  {
    sr: 11,
    company: "Microsoft",
    logo: microsoftlogo,
    type: "IT Services & IT Consulting",
    jobs: 76,
    jobCredits: 23,
    dbCredits: 30,
    status: "Blocked",
  },

  {
    sr: 12,
    company: "HCL",
    logo: hcllogo,
    type: "Service-based",
    jobs: 45,
    jobCredits: 20,
    dbCredits: 120,
    status: "Active",
  },

  {
    sr: 13,
   company: "Nvidia",
    logo: nvidialogo,
    type: "Service-based",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },

  {
    sr: 14,
    company: "Infosys",
    logo: infosyslogo,
    type: "IT Services & IT Consulting",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },

  {
    sr: 15,
    company: "Google",
    logo: googlelogo,
    type: "Product-based",
    jobs: 29,
    jobCredits: 12,
    dbCredits: 50,
    status: "Active",
  },

  {
    sr: 16,
    company: "HCL",
    logo: hcllogo,
    type: "Service-based",
    jobs: 45,
    jobCredits: 20,
    dbCredits: 120,
    status: "Active",
  },

  {
    sr: 17,
    company: "Infosys",
    logo: infosyslogo,
    type: "IT Services & IT Consulting",
    jobs: 32,
    jobCredits: 45,
    dbCredits: 90,
    status: "Active",
  },

  {
    sr: 18,
    company: "Microsoft",
    logo: microsoftlogo,
    type: "IT Services & IT Consulting",
    jobs: 76,
    jobCredits: 23,
    dbCredits: 30,
    status: "Blocked",
  },
];

function EmployeeTable() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const handleDelete = () => {
    console.log("Deleted:", selectedRow);
    setOpenModal(false);
  };

  const handleBlock = () => {
  console.log("Blocked:", selectedRow);
  setOpenBlockModal(false);
  };


  const columns = [
    { accessorKey: "sr", header: "Sr.No." },

    {
      header: "Company",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#FFFFFF] to-[#8931BA]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <img
                src={row.original.logo}
                alt="logo"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                }}
                className="w-9 h-9 object-contain"
              />
            </div>
          </div>

          <span className="text-base font-medium">
            {row.original.company}
          </span>
        </div>
      ),
    },

    { accessorKey: "type", header: "Company Type" },
    { accessorKey: "jobs", header: "Posted Jobs" },

    {
      header: "Credits Left",
      cell: ({ row }) => (
        <div className="text-base leading-5">
          <p>Job Credits {row.original.jobCredits}</p>
          <p className="text-gray-500">
            Database Credits {row.original.dbCredits}
          </p>
        </div>
      ),
    },

    {
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm">
          {row.original.status === "Active" ? (
            <>
              <CheckCircle size={20} className="text-green-500" />
              <span className="text-green-600">Active</span>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-red-500" />
              <span className="text-red-600">Blocked</span>
            </>
          )}
        </div>
      ),
    },

    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Eye
            size={20}
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate("/company-details")}
          />

          <Ban
            size={20}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setSelectedRow(row.original);
              setOpenBlockModal(true);
            }}
          />

          <Trash2
            size={22}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setSelectedRow(row.original);
            }}
          />
        </div>
      ),
    },
  ];

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page]);

  const totalPages = Math.ceil(data.length / pageSize);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto no-scrollbar">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Employer Management
        </h2>
        <div className="border-b border-gray-500 mb-5"></div>

        <div className="mb-6">
          <div className="flex items-center w-[240px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-lg">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-base border-collapse">
            <thead className="bg-[#F1F1F1] text-gray-700">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-4 text-left font-semibold text-[15px]"
                    >
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
                <tr
                  key={row.id}
                  className="border-b border-gray-200 h-21 hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 align-middle">
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
        </div>

        <div className="flex justify-between mt-6 font-bold text-purple-600">
          <span>
            Showing {(page - 1) * 6 + 1} to{" "}
            {Math.min(page * 6, data.length)} of {data.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              className="w-8 h-8 border rounded-full"
            >
              {"<"}
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  page === i + 1
                    ? "bg-purple-600 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setPage(Math.min(page + 1, totalPages))
              }
              className="w-8 h-8 border rounded-full"
            >
              {">"}
            </button>
          </div>
        </div>

        <BlockModal
          isOpen={openBlockModal}
          onClose={() => setOpenBlockModal(false)}
          onConfirm={handleBlock}
        />

        <DeleteModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}

export default EmployeeTable;