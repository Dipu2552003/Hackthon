// src/components/IndexStockCard.js
import React from 'react';

const IndexStockCard = ({ companyName, value, percentageChange, color }) => (
  <div className="IndexStockCard col-sm-6 col-md-4 col-lg-3">
    <h6 style={{ padding: '15px 8px 5px 1px', color: '#69748B', fontSize: '14px' }}>{companyName}</h6>
    <div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
      <h6 style={{ color: 'black', fontWeight: '600' }}>{value}</h6>
      <span style={{ background: color, fontSize: '12px', borderRadius: '10px', padding: '1px 10px', marginBottom: '10px' }}>
        {percentageChange}
      </span>
    </div>
  </div>
);

export default IndexStockCard;
