import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { searchSymbol } from "../utils/api/stock-api";
import SearchResults from "./SearchResults";
import { SearchIcon, XIcon } from "@heroicons/react/solid";

const Search = () => {
  const { darkMode } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [bestMatches, setBestMatches] = useState([]);
  const handleResultSelect = (symbol) => {
    setInput(symbol);
    setBestMatches([]);
  };
  const updateBestMatches = async () => {
    try {
      if (input.length>0) {
        const searchResults = await searchSymbol(input, setLoadingSearch);
        let result = searchResults;
        if (result.length > 0) {
          setBestMatches(result);
          setLoadingSearch(false);

        } else {
          result = [{ symbol: "No Data Found" }];
          setBestMatches(result);
          setLoadingSearch(false);
        }
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  useEffect(() => {
  if(input.length===0){
    setBestMatches([]);
    setLoadingSearch(false);
  }
  }, [input])
  

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 sm:w-96 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : null
        }`}
        placeholder="Search stock..."
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1">
          <XIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      >
        <SearchIcon className="h-4 w-4 fill-gray-100" />
      </button>
      { (
        <SearchResults
          results={bestMatches}
          onResultSelect={handleResultSelect}
          isLoading={loadingSearch}
        />
      ) }
    </div>
  );
};

export default Search;
