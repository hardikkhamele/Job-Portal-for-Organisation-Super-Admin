import bookm from "../smallicon/bookm.svg";
import batch1 from "../smallicon/batch1.svg";

const SubscriptionCard = ({ plan }) => (
  <div
    className={`p-5 rounded-lg shadow-md ${plan.color} relative hover:shadow-lg transition duration-300`}
  >
    {/* Header Section */}
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg text-black">{plan.name}</h3>
          {/* Bookmark Icon */}
      <img src={batch1} alt="Bookmark" className="w-12 h-12" />
      <img src={bookm} alt="Batch" className="w-10 h-8 relative bottom-7" />
      <div className="absolute bottom-2 right-2">
    </div>
    </div>
    

    {/* Subscriber Count */}
    <p className="text-gray-700 mt-1">{plan.count} Subscribers</p>

    {/* Price Section */}
    <p className="font-semibold text-xl mt-3 text-gray-800">₹{plan.price} / month</p>



    {/* Change Indicator */}
    <p
      className={`mt-2 ${plan.change > 0 ? "text-green-500" : "text-red-500"}`}
    >
      {plan.change}% {plan.change > 0 ? "Up" : "Down"} from yesterday
    </p>
  </div>
);

export default SubscriptionCard;
