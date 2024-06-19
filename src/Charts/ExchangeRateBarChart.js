import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";

const ExchangeRateBarChart = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const API_KEY = "TU_API_KEY"

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        if (response.status === 200) {
          setExchangeRates(response.data.conversion_rates);
        } else {
          throw new Error("Failed to fetch exchange rates");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  if (!exchangeRates) {
    return <p>Cargando datos...</p>;
  }

  const chartData = {
    labels: ["USD to MXN", "MXN to USD"],
    datasets: [
      {
        label: "Paridad de Peso y Dólar",
        data: [exchangeRates.MXN, 1 / exchangeRates.MXN],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 25,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} height={400} options={options} />
    </div>
  );
};

export default ExchangeRateBarChart;
