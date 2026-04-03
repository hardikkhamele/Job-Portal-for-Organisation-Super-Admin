import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Loader2 } from "lucide-react";
import { fetchAllCredits, updateCredit } from "../../redux/slice/credit/getCredit";
import Footer from "../Footer";

const CreditModel = () => {
  const dispatch = useDispatch();
  const { credits, loading, updateLoading } = useSelector((state) => state.getCredit);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllCredits());
  }, [dispatch]);

  const handleEditClick = (credit) => {
    setSelectedCredit(credit);
    setIsOpen(true);
  };

  const handleUpdate = async (id, newValue) => {
    const result = await dispatch(updateCredit({ id, credits: newValue }));
    if (updateCredit.fulfilled.match(result)) {
      setIsOpen(false);
    }
  };

  const filteredCredits = useMemo(() => {
    const dataArray = Array.isArray(credits) ? credits : [];
    return dataArray.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [credits, searchQuery]);

  const databaseCredits = filteredCredits.filter(
    (c) => c.title.toLowerCase().includes("profile") || c.title.toLowerCase().includes("excel")
  );
  
  const jobPostCredits = filteredCredits.filter((c) =>
    c.title.toLowerCase().includes("job post")
  );

  const otherCredits = filteredCredits.filter((c) => 
    !databaseCredits.includes(c) && !jobPostCredits.includes(c)
  );

  return (
    <div className="p-3 bg-gray-100 min-h-screen flex flex-col pb-20">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-3 text-gray-900">Credit Management</h1>
        <hr className="mb-6" />

        <div className="relative w-64 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search credits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md w-full bg-[#F7F8F9] outline-none border border-[#D3D3D3] focus:border-purple-400"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-600 w-10 h-10" />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Database Credit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {databaseCredits.length > 0 ? (
                databaseCredits.map((item) => <CreditCard key={item._id} item={item} onEdit={handleEditClick} />)
              ) : (
                <p className="text-gray-400 italic">No database credits found.</p>
              )}
            </div>

            {/* Job Post Credits Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Post Credit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {jobPostCredits.length > 0 ? (
                jobPostCredits.map((item) => <CreditCard key={item._id} item={item} onEdit={handleEditClick} />)
              ) : (
                <p className="text-gray-400 italic">No job post credits found.</p>
              )}
            </div>

            {otherCredits.length > 0 && (
               <>
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Credits</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherCredits.map((item) => <CreditCard key={item._id} item={item} onEdit={handleEditClick} />)}
                 </div>
               </>
            )}
          </>
        )}
      </div>

      <CreditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedCredit}
        onUpdate={handleUpdate}
        loading={updateLoading}
      />
      <Footer />
    </div>
  );
};

const CreditCard = ({ item, onEdit }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center flex flex-col justify-between">
    <div>
      <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
      <p className="text-gray-600 text-lg mb-10">{item.message}</p>
    </div>
    <button
      onClick={() => onEdit(item)}
      className="bg-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition shadow-md font-medium"
    >
      Edit ({item.credits})
    </button>
  </div>
);

const CreditModal = ({ isOpen, onClose, data, onUpdate, loading }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (data) setInputValue(data.credits);
  }, [data, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
          Edit {data?.title}
        </h2>

        <div className="mb-5">
          <label className="block mb-2 text-gray-900 font-semibold text-base">
            Credit Required
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="w-full rounded-md px-3 py-2 border border-[#D3D3D3] bg-[#F7F8F9] outline-none focus:border-purple-500 transition-all"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-purple-200 text-purple-700 py-2 rounded-md cursor-pointer hover:bg-purple-300 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdate(data._id, inputValue)}
            disabled={loading}
            className="flex-1 bg-purple-800 text-white py-2 rounded-md cursor-pointer hover:bg-purple-900 transition shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditModel;