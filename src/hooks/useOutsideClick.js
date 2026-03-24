

import { useEffect } from "react";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      callback();
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, callback]);
}

export default useOutsideClick;