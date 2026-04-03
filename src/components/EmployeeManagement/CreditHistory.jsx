import React, { useMemo, useState, useEffect } from "react";
import { Briefcase, Layers, Database, AlertTriangle, TrendingUp, HandCoins } from "lucide-react";

const CreditHistory = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Credit");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const options = [
    "All Credit",
    "Both Added",
    "Both Spent",
    "Database Credit Added",
    "Database Credit Spent",
    "Job Credit Added",
    "Job Credit Spent",
  ];

  const data = [
    {
      id: 1,
      status: "Job Credits Spent",
      details: "Posted job : Premium",
      credit: "-2 Job Credits",
      type: "Spent",
      date: "Feb 12, 2026 19:28",
    },
    {
      id: 2,
      status: "Job & Database Credits Added",
      details: "Basic Bundle Plan",
      credit: "+6 Job Credits +500 Database Credits",
      type: "Added",
      date: "Feb 2, 2026 19:28",
    },
    {
      id: 3,
      status: "Database Credits Added",
      details: "Basic Database Plan",
      credit: "+100 Database Credits",
      type: "Added",
      date: "Feb 7, 2026 19:38",
    },
    {
      id: 4,
      status: "Database Credits Spent",
      details: "Viewed phone number",
      credit: "-1 Database Credits",
      type: "Spent",
      date: "Feb 7, 2026 19:25",
    },


    {
      id: 5,
      status: "Job Credits Spent",
      details: "Posted job : Premium",
      credit: "-2 Job Credits",
      type: "Spent",
      date: "Feb 12, 2026 19:28",
    },
    {
      id: 6,
      status: "Job & Database Credits Added",
      details: "Basic Bundle Plan",
      credit: "+6 Job Credits +500 Database Credits",
      type: "Added",
      date: "Feb 2, 2026 19:28",
    },
    {
      id: 7,
      status: "Database Credits Added",
      details: "Basic Database Plan",
      credit: "+100 Database Credits",
      type: "Added",
      date: "Feb 7, 2026 19:38",
    },
    {
      id: 8,
      status: "Database Credits Spent",
      details: "Viewed phone number",
      credit: "-1 Database Credits",
      type: "Spent",
      date: "Feb 7, 2026 19:25",
    },

    {
      id: 9,
      status: "Job Credits Spent",
      details: "Posted job : Premium",
      credit: "-2 Job Credits",
      type: "Spent",
      date: "Feb 12, 2026 19:28",
    },
    {
      id: 10,
      status: "Job & Database Credits Added",
      details: "Basic Bundle Plan",
      credit: "+6 Job Credits +500 Database Credits",
      type: "Added",
      date: "Feb 2, 2026 19:28",
    },
    {
      id: 11,
      status: "Database Credits Added",
      details: "Basic Database Plan",
      credit: "+100 Database Credits",
      type: "Added",
      date: "Feb 7, 2026 19:38",
    },
    {
      id: 12,
      status: "Database Credits Spent",
      details: "Viewed phone number",
      credit: "-1 Database Credits",
      type: "Spent",
      date: "Feb 7, 2026 19:25",
    },

    {
      id: 13,
      status: "Job Credits Spent",
      details: "Posted job : Premium",
      credit: "-2 Job Credits",
      type: "Spent",
      date: "Feb 12, 2026 19:28",
    },
    {
      id: 14,
      status: "Job & Database Credits Added",
      details: "Basic Bundle Plan",
      credit: "+6 Job Credits +500 Database Credits",
      type: "Added",
      date: "Feb 2, 2026 19:28",
    },
    {
      id: 15,
      status: "Database Credits Added",
      details: "Basic Database Plan",
      credit: "+100 Database Credits",
      type: "Added",
      date: "Feb 7, 2026 19:38",
    },
    {
      id: 16,
      status: "Database Credits Spent",
      details: "Viewed phone number",
      credit: "-1 Database Credits",
      type: "Spent",
      date: "Feb 7, 2026 19:25",
    },

  ];

  //  SEARCH + FILTER
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.details.toLowerCase().includes(search.toLowerCase());

     const matchesFilter =
        filter === "All Credit" ||
        (filter === "Both Added" && item.type === "Added") ||
        (filter === "Both Spent" && item.type === "Spent") ||
        (filter === "Database Credit Added" &&
          item.status.includes("Database") &&
          item.type === "Added") ||
        (filter === "Database Credit Spent" &&
          item.status.includes("Database") &&
          item.type === "Spent") ||
        (filter === "Job Credit Added" &&
          item.status.includes("Job") &&
          item.type === "Added") ||
        (filter === "Job Credit Spent" &&
          item.status.includes("Job") &&
          item.type === "Spent");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, data]);


const totalPages = Math.ceil(filteredData.length / pageSize);

const paginatedData = filteredData.slice(
  (page - 1) * pageSize,
  page * pageSize
);

useEffect(() => {
  setPage(1);
}, [search, filter]);

  return (
    <div className="p-4">

      
        {/* SAME CARDS DESIGN */}
      <div className="grid grid-cols-3 gap-6 mb-7">

        {/* Total Credits */}
        <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
          <div>
            <p className="text-gray-800 mb-5 text-lg">Total Credits + Database Credits</p>
            <h2 className="text-2xl font-semibold mb-5">725</h2>

            <p className="flex items-center gap-1">
              <TrendingUp className="text-green-500" size={20} />
              <span className="text-gray-800">10% vs Last months</span>
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded-full">
            <Database className="text-purple-600" size={25} />
          </div>
        </div>

        {/* Used Credits */}
        <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
          <div>
            <p className="text-gray-800 mb-5 text-lg">Job Credits left</p>
            <h2 className="text-2xl font-semibold mb-5">25</h2>

            <p className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" size={20} />
              <span className="text-gray-800">
                <span className="font-semibold underline text-lg text-gray-800 ">1 Credit</span> will Expire on Feb 07,2026
              </span>
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded-full">
            <HandCoins  className="text-purple-600" size={25} />
          </div>
        </div>

        {/* Remaining Credits */}
        <div className="border border-purple-400 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
          <div>
            <p className="text-gray-800 mb-5 text-lg">Database Credits left</p>
            <h2 className="text-2xl font-semibold mb-5">700</h2>

            <p className="flex items-center gap-1">
              <AlertTriangle className="text-yellow-500" size={20} />
              <span className="text-gray-800">
              <span className="text-gray-800 underline font-semibold text-lg">20 credits</span> will Expire on Feb 07,2026
              </span>
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded-full">
            <Database className="text-purple-600" size={25} />
          </div>
        </div>

      </div>

      {/*  SEARCH + FILTER */}
      <div className="flex justify-between mb-4 ">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-lg w-1/4 bg-[#F7F8F9] outline-none"
        />

        <div className="relative w-52">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="border border-gray-300 px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center "
          >
            {filter}
            <span>▾</span>
          </div>

          {isOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg z-10 ">
            
              {options.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setFilter(item);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer outline-none"
                >
                  {item}
                </div>
              ))}

            </div>
          )}
        </div>
      </div>


      {/*  TABLE */}
      <div className="border border-gray-200 rounded-xl overflow-hidden ">

        {/* SCROLLABLE TABLE */}
       <div>

          <table className="w-full text-center ">
            <thead className="bg-gray-200 sticky top-0 ">
              <tr>
                <th className="p-4 ">Sr.No.</th>
                <th>Credit Status</th>
                <th>Transaction details</th>
                <th>Credit Status</th>
                <th>Date & time</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="p-4">{(page - 1) * pageSize + index + 1}</td>
                  <td>{item.status}</td>
                  <td>{item.details}</td>

                  {/* COLOR LOGIC */}
                  <td
                    className={
                      item.credit.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.credit}
                  </td>

                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* PAGINATION UI */}
      <div className="flex justify-between mt-4 items-center">
  <p className="text-purple-600 text-sm">
    Showing {(page - 1) * pageSize + 1} to{" "}
    {Math.min(page * pageSize, filteredData.length)} of{" "}
    {filteredData.length} Credit Transactions
  </p>

  <div className="flex gap-2">

    {/* PREVIOUS */}
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="w-8 h-8 border rounded-full border border-purple-900 font-bold text-purple-900 text-xl"
    >
      {"<"}
    </button>

    {/* PAGE NUMBERS */}
    {Array.from({ length: totalPages }).map((_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`w-8 h-8 rounded-full font-bold text-purple-900 border ${
          page === i + 1 ? "bg-purple-600 text-white" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}

    {/* NEXT */}
    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className="w-8 h-8 border border-purple-900 rounded-full font-bold text-purple-900 text-xl"
    >
      {">"}
    </button>

  </div>
</div>

    </div>
  );
};

export default CreditHistory;