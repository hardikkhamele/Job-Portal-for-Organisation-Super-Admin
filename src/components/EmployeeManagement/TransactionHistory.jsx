import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../redux/slice/RevenueManagement/revenueSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Users, Zap, Clock, Eye,  TrendingUp, ArrowLeftRight, X} from "lucide-react";

function TransactionHistory({ employerId, employer }) {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.revenue);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTransactions({ page: 1, limit: 150 }));
  }, [dispatch]);

  //  TABLE DATA
  const data = useMemo(
    () => {
      const employerName = employer?.name?.toLowerCase() || "";
      const filtered = (transactions || []).filter(
        (item) => item.employerName?.toLowerCase() === employerName || item.companyName?.toLowerCase() === employerName
      );

      return filtered.map((item, idx) => ({
        sr: idx + 1,
        id: item.transactionId || "N/A",
        plan: item.planDetails || item.planDescription || "N/A",
        price: item.price ? `₹ ${item.price.toLocaleString()}` : item.totalAmountPaid ? `₹ ${item.totalAmountPaid.toLocaleString()}` : "N/A",
        rawPrice: item.price || item.totalAmountPaid || 0,
        date: item.createdAt ? new Date(item.createdAt).toLocaleString("en-GB") : item.paymentDateTime ? new Date(item.paymentDateTime).toLocaleString("en-GB") : "N/A",
        rawDate: item.createdAt || item.paymentDateTime,
        status: item.status === "success" || item.paymentStatus === "success" ? "Successful" : "Failed",
        originalItem: item
      }));
    },
    [transactions, employer]
  );


      const filteredData = useMemo(() => {
      return data.filter((item) => {
        const matchesSearch =
          item.id.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.plan.toLowerCase().includes(globalFilter.toLowerCase());
      
        const matchesStatus =
          statusFilter === "All" || item.status === statusFilter;
      
        return matchesSearch && matchesStatus;
      });
    }, [data, globalFilter, statusFilter]);

  //  COLUMNS
  const columns = useMemo(
    () => [
      { accessorKey: "sr", header: "Sr.No." },
      { accessorKey: "id", header: "Transaction Id" },
      { accessorKey: "plan", header: "Plan Details" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "date", header: "Purchase Date & time" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={
              row.original.status === "Successful"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {row.original.status}
          </span>
        ),
      },
      {
         header: "Action",
         cell: ({row}) => (
           <div className="flex justify-center items-center w-full">
            <Eye
              className="cursor-pointer text-purple-800"
              size={20}
              onClick={() => {
                setSelectedRow(row.original);
                setIsModalOpen(true);
              }}
            />
           </div>
         ),
        }
    ],
    []
  );

      const [pagination, setPagination] = useState({
         pageIndex: 0,
         pageSize: 5, 
        });

         //  TABLE INSTANCE
         const table = useReactTable({
         data: filteredData,
         columns,
         state: { 
           globalFilter,
           pagination, 
         },
         onGlobalFilterChange: setGlobalFilter,
         onPaginationChange: setPagination, 
         getCoreRowModel: getCoreRowModel(),
         getPaginationRowModel: getPaginationRowModel(),
         getFilteredRowModel: getFilteredRowModel(),

        });

  const totalMoneySpent = useMemo(() => {
    return data
      .filter((t) => t.status === "Successful")
      .reduce((sum, t) => sum + t.rawPrice, 0);
  }, [data]);

  const thisMonthSpent = useMemo(() => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return data
      .filter((t) => t.status === "Successful" && t.rawDate && new Date(t.rawDate) >= startOfMonth)
      .reduce((sum, t) => sum + t.rawPrice, 0);
  }, [data]);

  const latestTransactionPrice = data[0]?.price || "N/A";
  const latestTransactionDate = data[0]?.date || "N/A";

  return (
    <div className="p-4">

      {/*  TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-7">
        <div className="border border-purple-500 rounded-xl p-5 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text mb-5">Total Money Spent</p>
            <h2 className="text-2xl font-bold ">₹ {totalMoneySpent.toLocaleString()}</h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="text-purple-600" />
          </div>
        </div>

        <div className="border border-purple-500 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text mb-3">This Month Spent</p>
            <h2 className="text-2xl font-bold mb-5">₹ {thisMonthSpent.toLocaleString()}</h2>
           <div className="flex items-center gap-1 text-green-500 text">
              <TrendingUp size={20} />
              <span className="text-black">Real-time stats</span>
            </div>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Zap className="text-purple-600" />
          </div>
        </div>

        <div className="border border-purple-500 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text mb-5">Latest Transaction</p>
            <h2 className="text-2xl font-bold mb-5">{latestTransactionPrice}</h2>
            <div className="flex items-center gap-1 text-gray-500 text">
                 <ArrowLeftRight size={20} />
            <p className="text-gray-700 text">{latestTransactionDate}</p>
          </div>
           </div>

          <div className="bg-purple-100 p-3 rounded-full">
            <Clock className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* SEARCH */}
        <div className="flex justify-between items-center mb-4">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className=" bg-[#F7F8F9] border border-gray-200 rounded-lg px-3 py-2 w-1/5 outline-none"
          />

          <div className="relative">
        <div
          onClick={() => setOpen(!open) }
          
          className="border border-gray-300 rounded-lg px-3 py-2 w-40 cursor-pointer "
        >
          {statusFilter}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg z-10">
            {["All Transaction", "Successful", "Failed"].map((item) => (
              <div
                key={item}
                onClick={() => {
                  setStatusFilter(item === "All Transaction" ? "All" : item);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/*  TABLE */}
      <div className="border border-gray-200 rounded-xl overflow-hidden ]">
        <table className="w-full text">
          <thead className="bg-[#D3D3D3]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-center">
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-center">
                      {flexRender(
                        cell.column.columnDef.cell ??
                          cell.column.columnDef.accessorKey,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-8 text-gray-400 italic text-center">
                  No billing transactions found for this employer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     

      {/*  PAGINATION */}
      <div className="flex justify-between items-center mt-4">
 
        {/* LEFT TEXT */}
        <p className="text-purple-600 text font-bold">
        Showing{" "}
        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
        {" "}to{" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize,
          data.length
        )}{" "}
        of {data.length} Transactions
        </p>
      
        {/* RIGHT PAGINATION */}
        <div className="flex items-center gap-2">
      
          {/* PREVIOUS BUTTON */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500
              ${!table.getCanPreviousPage() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            {"<"}
          </button>
            
          {/* PAGE NUMBERS */}
          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 font-bold
                ${
                  table.getState().pagination.pageIndex === i
                    ? "bg-purple-600 text-white" 
                    : "border hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT BUTTON */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500 font-bold
              ${!table.getCanNextPage() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            {">"}
          </button>
            
        </div>
      </div>


      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

          <div className="bg-white w-[420px] rounded p-5 relative shadow-xl">
      
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 left-5/5 -translate-x-1/2 bg-purple-300 border border-white rounded-full p-2 shadow-md cursor-pointer"
            >
              <X size={16} className="text-purple-700" />
            </button>
      
            {/* STATUS HEADER */}
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-gray-300">
              <p className="text-gray-500">Status</p>
              <span
                className={`font-semibold ${
                  selectedRow?.status === "Successful"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
              {selectedRow?.status}
            </span>
            </div>
      
            {/* GENERAL INFO */}
            <div className="mt-3 text-sm space-y-2">
              <p className="font-semibold text-gray-700">General Info</p>
      
              <div className="flex justify-between text-gray-600">
                <span>Transaction Id</span>
                <span className="text-black">{selectedRow?.id}</span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>Company Name</span>
                <span className="text-black">Technokrate</span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>GSTIN / ISD -GSTIN</span>
                <span className="text-black">07AAACC1206D1ZI</span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>Payment Date & Time</span>
                <span className="text-black">{selectedRow?.date}</span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>Payment Method</span>
                <span className="text-black">GPay</span>
              </div>
            </div>
      
            {/* BILLING DETAILS */}
            <div className="mt-4 text-sm space-y-2">
              <p className="font-semibold text-gray-700">General Billing Details</p>
      
              <div className="flex justify-between text-gray-600">
                <span>Description</span>
                <span className="text-black">
                  x1 ({selectedRow?.plan})
                </span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>Plan Charges</span>
                <span className="text-black">₹2330.00</span>
              </div>
      
              <div className="flex justify-between text-gray-600">
                <span>Discount (16%)</span>
                <span className="text-black">-₹381</span>
              </div>
            </div>
      
            {/* TOTAL */}
            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between font-semibold">
              <span>Total Amount Paid</span>
              <span className="text-green-600">{selectedRow?.price}</span>
            </div>
      
          </div>
        </div>
      )}

    </div>
  );
}

export default TransactionHistory;