import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./DebouncingHook";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage, debouncedSearch]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://roxiler-server-onmc.onrender.com/products",
        {
          params: {
            month: selectedMonth,
            search: debouncedSearch,
            page: currentPage,
            perPage: perPage,
          },
        }
      );
      setTransactions(response.data.products);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1); // Reset current page when changing month
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log("curent page", currentPage);

  return (
    <div
      style={{ backgroundColor: "#edf6f6" }}
      className="container  mx-auto m-4 p-4 rounded"
    >
      <h1 className="text-2xl font-bold my-4 flex justify-center">
        Transactions Dashboard
      </h1>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="month" className="mr-2">
            Select Month:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded-md p-2"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search" className="mr-2">
            Search Transaction:
          </label>
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      {transactions.length === 0 ? (
        <p className="text-gray-600">
          No transactions found for the selected month.
        </p>
      ) : (
        <>
          <table className="border border-collapse border-gray-400 w-full mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">ID</th>
                <th className="border border-gray-400 p-2">Title</th>
                <th className="border border-gray-400 p-2">Description</th>
                <th className="border border-gray-400 p-2">Price</th>
                <th className="border border-gray-400 p-2">Category</th>
                <th className="border border-gray-400 p-2">Sold</th>
                <th className="border border-gray-400 p-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="border border-gray-400 p-2">
                    {transaction._id}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {transaction.title}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {transaction.price}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {transaction.category}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {transaction.sold ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <img src={transaction.image} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className="flex justify-between">
        <p className="text-gray-600">{`Page ${currentPage} of ${Math.ceil(
          transactions.length / perPage
        )}`}</p>
        <div>
          <button
            onClick={handlePrevPage}
            className={`${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            } text-white py-2 px-4 rounded mr-2`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`${
              transactions.length < perPage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            } text-white py-2 px-4 rounded`}
            disabled={transactions.length < perPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
