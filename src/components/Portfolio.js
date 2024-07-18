import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import profile from "../json/modal_output.json"; // Assuming modal_output.json is correctly imported

// Card component to display stock information
const Card = ({ name, amount }) => {
  return (
    <div style={cardStyle}>
      <h4>{name}</h4>
      <p>{amount.toFixed(4)}</p>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #E2E8F0',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  width: '150px'
};

export default function Portfolio({ navVisible }) {
  const [records, setRecords] = useState([]);

  // Fetching JSON data on component mount
  useEffect(() => {
    // Instead of fetching, directly use imported profile data
    const data = profile[0]; // Accessing the first object in the array

    const rows = [
      { id: 1, firstName: 'Optimal Weights', lastName: 'SPY', age: data['Optimal Weights']['SPY'] },
      { id: 2, firstName: 'Optimal Weights', lastName: 'BND', age: data['Optimal Weights']['BND'] },
      { id: 3, firstName: 'Optimal Weights', lastName: 'GLD', age: data['Optimal Weights']['GLD'] },
      { id: 4, firstName: 'Optimal Weights', lastName: 'QQQ', age: data['Optimal Weights']['QQQ'] },
      { id: 5, firstName: 'Optimal Weights', lastName: 'VTI', age: data['Optimal Weights']['VTI'] },
      { id: 6, firstName: 'Expected Annual Return', lastName: '', age: data['Expected Annual Return'] },
      { id: 7, firstName: 'Expected Volatility', lastName: '', age: data['Expected Volatility'] },
      { id: 8, firstName: 'Sharpe Ratio', lastName: '', age: data['Sharpe Ratio'] },
    ];

    setRecords(rows);
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const columns = [
    { field: 'firstName', headerName: 'Name', width: 300 },
    { field: 'lastName', headerName: 'Trend', width: 300 },
    {
      field: 'age',
      headerName: 'Amount',
      type: 'number',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  function handleSearch(event) {
    const newData = records.filter(row => {
      return row.firstName.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  // Extracting the top 5 stock cards data
  const topStocks = [
    { name: 'SPY', amount: profile[0]['Optimal Weights']['SPY'] },
    { name: 'BND', amount: profile[0]['Optimal Weights']['BND'] },
    { name: 'GLD', amount: profile[0]['Optimal Weights']['GLD'] },
    { name: 'QQQ', amount: profile[0]['Optimal Weights']['QQQ'] },
    { name: 'VTI', amount: profile[0]['Optimal Weights']['VTI'] }
  ];

  return (
    <>
      <div className="portfolio">
        <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
          <div className="container-fluid mt-5">
            <div style={{ marginTop: '30px' }}>
              <h3 className="mt-5" style={{ fontWeight: '600', color: 'black' }}>
                Portfolio
              </h3>
              <p style={{ marginTop: '20px', color: '#69748B', fontSize: '14px', fontWeight: '600' }}>
                Stocks in your Portfolio
              </p>

              {/* Top Stock Cards */}
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {topStocks.map((stock, index) => (
                  <Card key={index} name={stock.name} amount={stock.amount} />
                ))}
              </div>

              <div className="text-start mb-3">
                <input
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    height: '40px',
                    width: '320px',
                    padding: '5px',
                  }}
                  type="text"
                  onChange={handleSearch}
                  placeholder="Search Stock...."
                />
              </div>

              <div style={{ height: 562, width: '100%', fontWeight: '600' }}>
                <DataGrid
                  rows={records}
                  columns={columns}
                  hideFooter
                  hideFooterPagination
                  hideFooterSelectedRowCount
                  disableColumnMenu
                  style={{ fontWeight: '600' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
