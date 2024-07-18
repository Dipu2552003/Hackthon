import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import profile from "../json/modal_output.json"; // Assuming modal_output.json is correctly imported
import { MonetizationOn } from "@mui/icons-material"; // Import icons from Material-UI

// Card component to display stock information
const Card = ({ name, amount, sector }) => {
  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>{name}</h4>
        {/* Placeholder for stock icons */}
        <MonetizationOn style={{ fontSize: 24 }} />
      </div>
      <p>{amount}</p>
      {sector && <p style={{ fontSize: "12px", color: "#a0aec0" }}>{sector}</p>}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  padding: "10px",
  margin: "10px",
  textAlign: "center",
  width: "150px",
};

export default function Portfolio({ navVisible }) {
  const [records, setRecords] = useState([]);
  const [data, setData] = useState(null);

  // Fetching JSON data on component mount
  useEffect(() => {
    // Instead of fetching, directly use imported profile data
    setData(profile[0]); // Accessing the first object in the array

    // Create rows for optimal weights
    const optimalWeightRows = [
      {
        id: 1,
        firstName: "Optimal Weights",
        lastName: "SPY",
        age: Math.round(profile[0]["Optimal Weights"]["SPY"] * 10),
        sector: "Technology",
      },
      {
        id: 2,
        firstName: "Optimal Weights",
        lastName: "BND",
        age: Math.round(profile[0]["Optimal Weights"]["BND"] * 10),
        sector: "Healthcare",
      },
      {
        id: 3,
        firstName: "Optimal Weights",
        lastName: "GLD",
        age: Math.round(profile[0]["Optimal Weights"]["GLD"] * 10),
        sector: "Finance",
      },
      {
        id: 4,
        firstName: "Optimal Weights",
        lastName: "QQQ",
        age: Math.round(profile[0]["Optimal Weights"]["QQQ"] * 10),
        sector: "Technology",
      },
      {
        id: 5,
        firstName: "Optimal Weights",
        lastName: "VTI",
        age: Math.round(profile[0]["Optimal Weights"]["VTI"] * 10),
        sector: "Finance",
      },
    ];

    // Create rows for performance metrics
    const performanceMetricRows = [
      {
        id: 6,
        firstName: "Expected Annual Return",
        lastName: "",
        age: profile[0]["Expected Annual Return"],
      },
      {
        id: 7,
        firstName: "Expected Volatility",
        lastName: "",
        age: profile[0]["Expected Volatility"],
      },
      {
        id: 8,
        firstName: "Sharpe Ratio",
        lastName: "",
        age: profile[0]["Sharpe Ratio"],
      },
    ];

    // Combine both sets of rows
    const allRows = [...optimalWeightRows, ...performanceMetricRows];

    setRecords(allRows);
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const columns = [
    { field: "firstName", headerName: "Name", width: 300 },
    { field: "lastName", headerName: "Trend", width: 300 },
    {
      field: "age",
      headerName: "Amount",
      type: "number",
      width: 300,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // Apply green color only to performance metrics
        const isPerformanceMetric = params.row.id >= 6; // Performance metrics start from id 6
        const value = parseFloat(params.value);
        const color = isPerformanceMetric && value >= 0 ? "green" : "inherit";
        return (
          <span style={{ color }}>
            {params.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        );
      },
    },
  ];

  function handleSearch(event) {
    const newData = records.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  // Extracting the top 5 stock cards data
  const topStocks = data
    ? [
        {
          name: "SPY",
          amount: Math.round(data["Optimal Weights"]["SPY"] * 10),
          sector: "Technology",
        },
        {
          name: "BND",
          amount: Math.round(data["Optimal Weights"]["BND"] * 10),
          sector: "Healthcare",
        },
        {
          name: "GLD",
          amount: Math.round(data["Optimal Weights"]["GLD"] * 10),
          sector: "Finance",
        },
        {
          name: "QQQ",
          amount: Math.round(data["Optimal Weights"]["QQQ"] * 10),
          sector: "Technology",
        },
        {
          name: "VTI",
          amount: Math.round(data["Optimal Weights"]["VTI"] * 10),
          sector: "Finance",
        },
      ]
    : [];

  return (
    <>
      <div className="portfolio">
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <div className="container-fluid mt-5">
            <div style={{ marginTop: "30px" }}>
              <h3
                className="mt-5"
                style={{ fontWeight: "600", color: "black" }}
              >
                Portfolio
              </h3>
              <p
                style={{
                  marginTop: "20px",
                  color: "#69748B",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Stocks in your Portfolio
              </p>

              {/* Top Stock Cards */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {topStocks.map((stock, index) => (
                  <Card
                    key={index}
                    name={stock.name}
                    amount={stock.amount}
                    sector={stock.sector}
                  />
                ))}
              </div>

              {/* Optimal Weights Section */}
              <div style={{ marginTop: "50px" }}>
                <h4 style={{ fontWeight: "600", color: "black" }}>
                  Optimal Weights
                </h4>
                <div className="text-start mb-3">
                  <input
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      height: "40px",
                      width: "320px",
                      padding: "5px",
                    }}
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Stock...."
                  />
                </div>

                <div style={{ height: 350, width: "100%", fontWeight: "600" }}>
                  <DataGrid
                    rows={records.slice(0, 5)} // Only show rows up to index 4
                    columns={columns}
                    hideFooter
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    disableColumnMenu
                    style={{ fontWeight: "600" }}
                  />
                </div>
              </div>

              {/* Performance Metrics Section */}
              <div style={{ marginTop: "50px" }}>
                <h4 style={{ fontWeight: "600", color: "black" }}>
                  Performance Metrics
                </h4>
                <div style={{ height: 300, width: "100%", fontWeight: "600" }}>
                  <DataGrid
                    rows={records.slice(5)} // Show rows starting from index 5
                    columns={columns}
                    hideFooter
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    disableColumnMenu
                    style={{ fontWeight: "600" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
