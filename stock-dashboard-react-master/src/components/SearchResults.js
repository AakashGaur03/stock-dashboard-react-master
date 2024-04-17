import React, { useContext } from "react";
import StockContext from "../context/StockContext";
import ThemeContext from "../context/ThemeContext";

const SearchResults = ({ results, onResultSelect, isLoading }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);
  const handleResultClick = (symbol) => {
    if (symbol !== "No Data Found") {
      setStockSymbol(symbol);
      onResultSelect(symbol);
    }
  };
  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md max-h-64 overflow-y-scroll ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 custom-scrollbar"
      }`}
    >
      {isLoading ? (
        <li className="p-4 m-2 flex justify-center items-center min-h-full">
          <div className="spinner-border spinnerClass" role="status"></div>
        </li>
      ) : (
        results.map((item) => (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"
            } transition duration-300`}
            onClick={() => handleResultClick(item.symbol)}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        ))
      )}
    </ul>
  );
};

export default SearchResults;
