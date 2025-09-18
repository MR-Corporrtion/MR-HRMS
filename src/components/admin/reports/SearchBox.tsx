// components/SearchBox.tsx

import React, { useState, useEffect } from "react";
import { apiClient } from "../../../../config/route.config";

const SearchBox = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10); // Set items per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/report/query", {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Query": query,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setResults(response.data.data);
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  console.log(currentResults);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="search-box">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {currentResults.length > 0 && (
        <div className="mt-4 overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Result</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result, index) => (
                <tr key={index} className="border-b">
                  {Object.entries(result).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <td className="px-4 py-2 font-semibold">
                        {key || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {value?.toString() || "N/A"}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            resultsPerPage={resultsPerPage}
            totalResults={results.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

const Pagination = ({
  resultsPerPage,
  totalResults,
  paginate,
  currentPage,
}: {
  resultsPerPage: number;
  totalResults: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 mx-1 ${
            number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default SearchBox;
