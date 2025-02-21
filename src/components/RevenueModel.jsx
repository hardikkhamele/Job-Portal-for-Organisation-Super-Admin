import React from 'react';

const RevenueModel = () => {
  const data = [
    {
      title: 'Total Subscription',
      value: '4000',
      change: '-2.3%',
      status: 'Down from yesterday',
      color: 'text-red-500',
      icon: '📉',
    },
    {
      title: 'Total Revenue',
      value: '2M',
      change: '+6.5%',
      status: 'Up from yesterday',
      color: 'text-green-500',
      icon: '💰',
    },
    {
      title: 'Active Subscription',
      value: '3500',
      change: '-4.3%',
      status: 'Down from yesterday',
      color: 'text-red-500',
      icon: '📉',
    },
    {
      title: 'Net Subscribed',
      value: '500',
      change: '+13%',
      status: 'Up from yesterday',
      color: 'text-green-500',
      icon: '📈',
    },
  ];

  return (
    <div className="p-4 bg-gray-100" style={{ minHeight: "350px" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hello! TechnoHire</h1>
      </div>

      <h2 className="text-xl font-semibold mb-6">Revenue Model</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold">{item.title}</div>
                <div className="mt-4 text-2xl font-semibold">{item.value}</div>
                <div className={`mt-2 ${item.color} font-medium`}>
                  {item.change} {item.status}
                </div>
              </div>
              <div className="text-3xl ml-4">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueModel;
