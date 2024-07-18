import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Market({ navVisible }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [topGainers, setTopGainers] = useState([]);
  const [remainingGainers, setRemainingGainers] = useState([]);

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
        );
        const topGainersWithId = response.data.top_gainers.map((gainer, index) => ({
          id: index + 1, // Generate a unique ID (you can use any unique identifier here)
          ...gainer,
        }));

        // Separate top 5 and remaining
        setTopGainers(topGainersWithId.slice(0, 5));
        setRemainingGainers(topGainersWithId.slice(5));
      } catch (error) {
        console.error('Error fetching top gainers:', error);
      }
    };

    fetchTopGainers();
  }, []);

  const handleRowClick = (id) => {
    window.location.href = `/stock?id=${id}`;
  };

  return (
    <div className='market'>
      <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
        <div className='container mt-5'>
          <h3 className='mt-5' style={{ fontWeight: '600', color: '#00B386' }}>
            Stocks
          </h3>

          <div className="top-gainers-section">
            <div className="top-gainers-header">Top Gainers</div>
            <div className="top-gainers-cards">
              {topGainers.map((gainer) => (
                <div key={gainer.id} className="gainer-card" onClick={() => handleRowClick(gainer.id)}>
                  <div className="gainer-ticker">{gainer.ticker}</div>
                  <div className="gainer-details">
                    <p>Price: {gainer.price}</p>
                    <p>Change Amount: {gainer.change_amount}</p>
                    <p>Change %: {gainer.change_percentage}</p>
                    <p>Volume: {gainer.volume}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="remaining-gainers-section">
            <table className="gainers-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>Change Amount</th>
                  <th>Change %</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {remainingGainers.map((gainer) => (
                  <tr key={gainer.id} className={selectedRow === gainer.id ? 'clickable-row' : ''} onClick={() => handleRowClick(gainer.id)}>
                    <td>{gainer.ticker}</td>
                    <td>{gainer.price}</td>
                    <td>{gainer.change_amount}</td>
                    <td>{gainer.change_percentage}</td>
                    <td>{gainer.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS styles
const styles = `
.market {
  font-family: Arial, sans-serif;
  color: #333;
}

.page {
  padding: 20px;
}

.page-with-navbar {
  padding-top: 70px; /* Adjust as per your navbar height */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.mt-5 {
  margin-top: 30px;
}

.top-gainers-section {
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

.top-gainers-header {
  font-size: 24px;
  font-weight: bold;
  color: #00B386;
}

.top-gainers-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.gainer-card {
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  width: 200px;
  transition: box-shadow 0.3s ease;
}

.gainer-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.gainer-ticker {
  background-color: #f0f0f0;
  padding: 5px;
  font-weight: bold;
  text-align: center;
}

.gainer-details {
  padding: 10px;
}

.remaining-gainers-section {
  margin-top: 20px;
}

.gainers-table {
  width: 100%;
  border-collapse: collapse;
}

.gainers-table th, .gainers-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.gainers-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.clickable-row {
  background-color: #f0f0f0;
}
`;

// Insert CSS styles into the DOM
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
