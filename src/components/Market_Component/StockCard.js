// src/components/StockCard.js
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

// Define the generateChartData function locally
const generateChartData = () => {
  return {
    data: [
      { x: '2024-07-10', y: 100 },
      { x: '2024-07-11', y: 102 },
      { x: '2024-07-12', y: 105 },
      { x: '2024-07-13', y: 103 },
      { x: '2024-07-14', y: 108 },
      { x: '2024-07-15', y: 107 },
      { x: '2024-07-16', y: 110 },
    ],
  };
};

const StockCard = ({ companyLogo, companyName, value, percentageChange, color }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartData = generateChartData();

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      
      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance and save it in the ref
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            borderColor: '#00B386',
            borderWidth: 1,
            radius: 0,
            data: chartData.data,
          }],
        },
        options: {
          scales: {
            x: { display: false },
            y: { display: false },
          },
          plugins: {
            legend: false,
          },
        },
      });
    }

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="StockCard col-sm-6 col-md-4 col-lg-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <img src={require(`../image/trendingStocksLogo/${companyLogo}.png`)} alt={companyLogo} style={{ height: '40px', width: '40px', border: 'solid 1px #E9E9EB', borderRadius: '5px', marginTop: '10px' }} /> */}
        <span style={{ background: color, fontSize: '12px', borderRadius: '10px', padding: '1px 10px', marginBottom: '10px' }}>
          {percentageChange}
        </span>
      </div>
      <h6 style={{ padding: '15px 8px 5px 1px', color: '#69748B', fontSize: '14px' }}>{companyName}</h6>
      <h6 style={{ color: 'black', fontWeight: '600', marginTop: '-10px' }}>{value}</h6>
      <canvas ref={chartContainer} />
      <hr style={{ margin: '0px', padding: '0px' }}></hr>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px 0px' }}>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px', color: 'green' }}>NSE</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>1D</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>1W</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>1M</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>1Y</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>5Y</button>
        <button className='btn btn-light' style={{ fontWeight: '600', fontSize: '12px', padding: '0px 2px' }}>ALL</button>
      </div>
    </div>
  );
};

export default StockCard;
