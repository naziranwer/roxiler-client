import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("March");

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "https://roxiler-server-onmc.onrender.com/statistics",
        {
          params: {
            month: selectedMonth,
          },
        }
      );
      const { totalSaleAmount, totalSoldItems, totalNotSoldItems } =
        response.data;
      setTotalSaleAmount(totalSaleAmount);
      setTotalSoldItems(totalSoldItems);
      setTotalNotSoldItems(totalNotSoldItems);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        style={{ backgroundColor: "#edf6f6" }}
        className="container mx-auto m-4 p-4 rounded"
      >
        <h1 className="text-2xl font-bold my-4">Statistics</h1>
        <div className="mb-4">
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
        <div className="flex justify-center">
          <div>
            <p className="font-bold">Total Sale Amount: {totalSaleAmount}</p>
            <p className="font-bold">Total Sold Items: {totalSoldItems}</p>
            <p className="font-bold">
              Total Not Sold Items: {totalNotSoldItems}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
