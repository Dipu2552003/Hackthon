// src/components/TrendingStocks.js
import React from 'react';
import StockCard from './StockCard';

const TrendingStocks = ({ trendingStockData }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ marginTop: '15px', color: 'black', fontSize: '18px', fontWeight: '600', marginBottom: '0px' }}>Trending Stocks</p>
      <p style={{ marginTop: '30px', color: '#00B386', fontSize: '15px', fontWeight: '600', marginBottom: '0px', marginRight: '40px' }}>See all</p>
    </div>
    <div className="row treandingCard">
      {trendingStockData.map((stock, index) => (
        <StockCard key={index} {...stock} />
      ))}
    </div>
  </>
);

export default TrendingStocks;
