import { TrendingUp } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SubscriberCard = ({ title, value, growth }) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md w-full sm:w-48 flex flex-col items-center">
      <h3 className="text-sm sm:text-md font-semibold text-gray-600">
        {title}
      </h3>
      <span className="text-lg sm:text-2xl font-bold text-gray-900 mt-2">
        {value}
      </span>
      <div className="flex items-center text-green-600 text-xs sm:text-sm font-medium mt-2">
        <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
        {growth}% Up from last Month
      </div>
    </div>
  );
};

const TotalSubscribers = ({ newSubscribers, total, growth }) => {
  return (
    <div className="flex flex-col  sm:flex-row flex-wrap gap-8 sm:gap-5 items-center bg-white rounded-xl ">
      <SubscriberCard
        title="New Subscriber"
        value={newSubscribers}
        growth={8.5}
      />
      <SubscriberCard title="Total Subscriber" value={total} growth={2.5} />

      <div className="flex flex-col items-center w-full sm:w-auto">
        <h3 className="text-sm sm:text-md font-semibold text-gray-600">
          Total Subscriber
        </h3>
        <div className="w-12 h-12  sm:w-24 sm:h-24">
          <CircularProgressbar
            value={growth}
            text={`${total}`}
            styles={buildStyles({
              textSize: "16px",
              textColor: "#000",
              pathColor: "#2563eb",
              trailColor: "#e0e7ff"
            })}
          />
        </div>
        <div className="flex items-center text-green-600 text-xs sm:text-sm font-medium mt-2">
          <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
          {growth}% Up from last Month
        </div>
      </div>
    </div>
  );
};

export default TotalSubscribers;
