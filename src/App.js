import React, { useState } from "react";

import Statistics from "./components/Statistics";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("transactions");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 flex justify-center">Dashboard</h1>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleOptionChange("transactions")}
          className={`border p-2 ${
            selectedOption === "transactions" ? "bg-gray-300" : ""
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => handleOptionChange("statistics")}
          className={`border p-2 ${
            selectedOption === "statistics" ? "bg-gray-300" : ""
          }`}
        >
          Statistics
        </button>
        <button
          onClick={() => handleOptionChange("pieChart")}
          className={`border p-2 ${
            selectedOption === "pieChart" ? "bg-gray-300" : ""
          }`}
        >
          Pie Chart
        </button>
        <button
          onClick={() => handleOptionChange("barChart")}
          className={`border p-2 ${
            selectedOption === "barChart" ? "bg-gray-300" : ""
          }`}
        >
          Bar Chart
        </button>
      </div>
      {selectedOption === "transactions" && <TransactionTable />}
      {selectedOption === "statistics" && <Statistics />}
      {selectedOption === "pieChart" && <PieChart />}
      {selectedOption === "barChart" && <BarChart />}
    </div>
  );
};

export default App;
