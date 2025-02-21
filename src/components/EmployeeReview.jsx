import React from "react";

function EmployeeReview() {
  return (
    <div className="bg-white p-4 shadow rounded w-1/2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Reviews</h3>
        <button className="text-purple-500">View More</button>
      </div>
      {["Cameron", "Sarah"].map((name, index) => (
        <div key={index} className="border-b py-2">
          <p className="font-bold">{name} ⭐⭐⭐⭐⭐</p>
          <p className="text-gray-600">
            This company provided a great learning experience and career growth.
          </p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeReview;
