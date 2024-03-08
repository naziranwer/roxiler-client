import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const PieChart = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");

  useEffect(() => {
    console.log("useefect called");
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "https://roxiler-server-onmc.onrender.com/pie-chart",
        {
          params: {
            month: selectedMonth,
          },
        }
      );
      const { categoryCounts } = response.data;

      setCategoryCounts(categoryCounts);
      drawPieChart(categoryCounts);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const drawPieChart = (data) => {
    const categories = data.map((category) => category._id);
    const counts = data.map((category) => category.count);

    const ctx = document.getElementById("categoryPieChart");
    if (ctx) {
      let existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      ctx.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  };

  return (
    <div
      style={{ backgroundColor: "#edf6f6" }}
      className="container mx-auto m-4 p-4 rounded text-center"
    >
      <h1 className="text-2xl font-bold my-4">PieChart</h1>
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
          <canvas id="categoryPieChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
