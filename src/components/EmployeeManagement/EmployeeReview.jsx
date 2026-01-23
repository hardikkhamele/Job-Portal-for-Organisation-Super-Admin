import React from "react";

function EmployeeReview() {
  const reviews = [
    {
      name: "Cameron",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "This company provided a great learning experience and career growth.company provided a great learning experience and career growth",
    },
    {
      name: "Sarah",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "This company provided a great learning experience and career growth.company provided a great learning experience and career growth",
    },
  ];

  return (
    <div className="bg-white p-4 rounded w-[320px] shrink-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Reviews</h3>
        <button className="text-purple-500 text-sm">View More</button>
      </div>

      {reviews.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-3">
          {/* Profile Row */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">
                {item.name} ⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-600 text-sm">
            {item.review}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeReview;
