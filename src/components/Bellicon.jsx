import React from "react";

export default function Bellicon({ number }) {
  return (
    <div className="flex justify-center items-center relative">
      <button>
        <img className="h-6 w-6" src="Bellicon.svg" alt="" />
        {number > 0 && (
          <div className="flex justify-center items-center absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-[50%]">
            <p className="text-[10px] text-white font-medium">
              {number > 9 ? "9+" : <>{number}</>}
            </p>
          </div>
        )}
      </button>
    </div>
  );
}
