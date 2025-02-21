function SummaryCard({ title, value, icon, growth, growthType, timeFrame }) {
  return (
    <div className="p-4 flex flex-col justify-between shadow-lg bg-white rounded-lg w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p
          className={growthType === "down" ? "text-red-500" : "text-green-500"}
        >
          {growth} {growthType === "down" ? "Down" : "Up"} from Yesterday{" "}
          {timeFrame}
        </p>
      </div>
    </div>
  );
}

export default SummaryCard;
