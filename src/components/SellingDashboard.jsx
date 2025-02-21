import React from 'react';

const SellingDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 h-[400px] flex flex-col items-center overflow-auto">
      <div className="flex gap-8 flex-wrap justify-center w-full h-full"> {/* Responsive layout */}
        
  
       {/* <h1 className="text-lg font-semibold">Top Selling Category</h1>*/}
        <div className="relative w-80 h-80 bg-white rounded-xl shadow-md flex items-center justify-center"> {/* Adjusted size */}
          <div className="absolute left-16 top-4 w-32 h-32 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            Candidates
            <br />
            40%<br />
            Per Day
          </div>
          <div className="absolute left-24 top-20 w-28 h-28 bg-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            Employer
            <br />
            25%<br />
            Per Day
          </div>
          <div className="absolute left-4 top-20 w-24 h-24 bg-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            Boosted Ads
            <br />
            20%<br />
            Per Day
          </div>
          <div className="absolute left-20 top-36 w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            Sponsored Ads
            <br />
            15%<br />
            Per Day
          </div>
        </div>

        {/* Last Transactions */}
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md h-full flex flex-col"> {/* Responsive width */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Last Transactions</h1>
            <a href="#" className="text-purple-500 hover:underline">View All</a>
          </div>
          <div className="overflow-auto flex-1"> {/* Scroll for transactions */}
            <table className="w-full text-base text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-2">Date</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '22/11/24', name: 'Damon', type: 'Standard', amount: 1200 },
                  { date: '22/11/24', name: 'Lily', type: 'Premium', amount: 1200 },
                  { date: '22/11/24', name: 'Adam', type: 'Enterprise', amount: 1200 },
                  { date: '22/11/24', name: 'Eva', type: 'Basic', amount: 1200 },
                  { date: '22/11/24', name: 'Nora', type: 'Premium', amount: 1200 }
                ].map((transaction, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">{transaction.name}</td>
                    <td className="p-2">{transaction.type}</td>
                    <td className="p-2">{transaction.amount}</td>
                    <td className="p-2 text-purple-500 hover:underline cursor-pointer">View Detail</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingDashboard;



