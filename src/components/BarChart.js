import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const BarChart = () => {
  const [priceRangeCounts, setPriceRangeCounts] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("March");

  useEffect(() => {
    fetchPriceRangeCounts();
  }, [selectedMonth]);

  const fetchPriceRangeCounts = async () => {
    try {
      const response = await axios.get(
        "https://roxiler-server-onmc.onrender.com/bar-chart",
        {
          params: {
            month: selectedMonth,
          },
        }
      );
      const { priceRangeCounts } = response.data;
      setPriceRangeCounts(priceRangeCounts);
      drawBarChart(priceRangeCounts);
    } catch (error) {
      console.error("Error fetching price range counts:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const drawBarChart = (data) => {
    const priceRanges = Object.keys(data);
    const counts = Object.values(data);

    const ctx = document.getElementById("priceRangeBarChart");
    if (ctx) {
      // Get the existing chart instance and destroy it
      let existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      ctx.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: priceRanges,
          datasets: [
            {
              label: "Number of Items",
              data: counts,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Items",
              },
            },
            x: {
              title: {
                display: true,
                text: "Price Range",
              },
            },
          },
        },
      });
    }
  };

  return (
    <div
      style={{ backgroundColor: "#edf6f6" }}
      className="container mx-auto m-4 p-4 rounded"
    >
      <h1 className="text-2xl font-bold my-4">Transactions Bar Chart</h1>
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
          <canvas id="priceRangeBarChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
