import React, { useState, useEffect } from "react";
import { getUnreadCount } from "../utils/notificationHelper";

export default function Bellicon({ number }) {
  const [count, setCount] = useState(() => (number !== undefined ? number : getUnreadCount()));

  useEffect(() => {
    if (number !== undefined) {
      setCount(number);
      return;
    }

    const updateCount = () => {
      setCount(getUnreadCount());
    };

    window.addEventListener("notificationsUpdated", updateCount);
    // Initial sync
    updateCount();

    return () => {
      window.removeEventListener("notificationsUpdated", updateCount);
    };
  }, [number]);

  return (
    <div className="flex justify-center items-center relative">
      <button className="focus:outline-none">
        <img className="h-6 w-6" src="Bellicon.svg" alt="" />
        {count > 0 && (
          <div className="flex justify-center items-center absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-[50%] animate-pulse">
            <p className="text-[10px] text-white font-medium">
              {count > 9 ? "9+" : <>{count}</>}
            </p>
          </div>
        )}
      </button>
    </div>
  );
}
