import React,{useState} from 'react'

export default function Switch() {
        const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
        <label className="relative inline-flex items-center cursor-pointer">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
  
        {/* Toggle Track */}
        <div className="w-10 h-5  bg-gray-300 rounded-full peer-checked:bg-gray-800 transition duration-300">
          {/* Sun Icon */}
          <div
            className={`absolute left-1 top-[10px] w-6 h-4 flex items-center justify-center bg-gray-800 text-white rounded-full shadow-md transform transition ${
              isDarkMode ? "translate-x-3" : ""
            }`}
          >
            {isDarkMode ? (
              // Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.755 11.992c-3.018 0-5.47-2.452-5.47-5.47 0-1.41.53-2.696 1.41-3.656-.42-.11-.853-.164-1.295-.164-3.208 0-5.81 2.603-5.81 5.81S4.658 14.5 7.867 14.5c3.207 0 5.81-2.603 5.81-5.81 0-.488-.066-.965-.192-1.43-.976.902-2.284 1.464-3.73 1.464z" />
              </svg>
            ) : (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM8 2a.5.5 0 0 0-.5.5V3a.5.5 0 0 0 1 0v-.5A.5.5 0 0 0 8 2zm0 11a.5.5 0 0 0-.5.5V14a.5.5 0 0 0 1 0v-.5a.5.5 0 0 0-.5-.5zM4.354 3.354a.5.5 0 1 0-.707-.707l-.5.5a.5.5 0 1 0 .707.707l.5-.5zm7.292 9.292a.5.5 0 0 0-.707-.707l-.5.5a.5.5 0 0 0 .707.707l.5-.5zm-9.292 0a.5.5 0 0 0-.707.707l.5.5a.5.5 0 1 0 .707-.707l-.5-.5zm9.292-9.292a.5.5 0 1 0-.707.707l.5.5a.5.5 0 1 0 .707-.707l-.5-.5zM2 8a.5.5 0 0 0-.5.5V8.5a.5.5 0 0 0 1 0v-.5A.5.5 0 0 0 2 8zm11 0a.5.5 0 0 0-.5.5V8.5a.5.5 0 0 0 1 0v-.5A.5.5 0 0 0 13 8z" />
              </svg>
            )}
          </div>
        </div>
      </label>
  )
}
