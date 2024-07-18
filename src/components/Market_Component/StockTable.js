// src/components/StockTable.js
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StockTable = ({ rows, columns }) => {
  const [records, setRecords] = useState(rows);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSearch = (event) => {
    const newData = rows.filter(row => row.firstName.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  };

  const handleRowClick = (params) => {
    window.location.href = `/stock?id=${params.id}`;
  };

  return (
    <div className='mb-5'>
      <p style={{ marginTop: '35px', color: '#69748B', fontSize: '14px', fontWeight: '600' }}>Stocks Details</p>
      <div className='text-start mb-3'>
        <input
          style={{ border: '1px solid #E2E8F0', borderRadius: '8px', height: '40px', width: '320px', padding: '5px' }}
          type='text'
          onChange={handleSearch}
          placeholder='Search Stock....'
        />
      </div>
      <div style={{ height: 482, width: '97%', fontWeight: '600' }}>
        <DataGrid
          rows={records}
          columns={columns}
          hideFooter
          hideFooterPagination
          hideFooterSelectedRowCount
          disableColumnMenu
          style={{ fontWeight: '600' }}
          getRowHeight={() => 85}
          onRowClick={handleRowClick}
          onMouseEnter={(params) => setSelectedRow(params.id)}
          onMouseLeave={() => setSelectedRow(null)}
          rowClassName={(params) => (selectedRow === params.id ? 'clickable-row' : '')}
        />
      </div>
    </div>
  );
};

export default StockTable;
