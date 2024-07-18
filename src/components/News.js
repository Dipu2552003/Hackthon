import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sectorData from '../json/SectorData.json'; // Import JSON data

export default function News({ navVisible }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo');
        setNews(response.data.feed);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const [expandedNews, setExpandedNews] = useState(null);

  const toggleExpanded = (index) => {
    if (expandedNews === index) {
      setExpandedNews(null);
    } else {
      setExpandedNews(index);
    }
  };

  return (
    <>
      <div className='news'>
        <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
          <div className='container-fluid mt-5'>
            <div style={{ marginTop: '0px' }}>
              <h3 className='mt-5' style={{ fontWeight: '600', color: 'black' }}>Markets</h3>
              <p style={{ marginTop: '15px', color: '#69748B', fontSize: '14px', fontWeight: '600' }}>Get the latest news related to stock market</p>

              {/* Sector Summary Section */}
              <h4 className='mt-5' style={{ fontWeight: '600', color: 'black' }}>Sector Summary</h4>
              <div className="sector-summary-container" style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px 0', marginBottom: '10px' }}>
                {sectorData.map((sector, index) => (
                  <div key={index} style={{ display: 'inline-block', minWidth: '200px', margin: '0 10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <span>{sector.sector}</span>
                    <span style={{ marginLeft: '10px', color: sector.score > 0 ? 'green' : sector.score < 0 ? 'red' : 'gray' }}>{sector.score}</span>
                  </div>
                ))}
              </div>

              {/* News Articles Section */}
              <div>
                {news.map((article, index) => (
                  <div key={index}>
                    <div className='row' style={{}}>
                      <div className='col-lg-12' style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={article.banner_image} alt="news" style={{ height: '70px', width: '100px', borderRadius: '5px', objectFit: 'cover' }} />
                        <p style={{ padding: '10px', cursor: 'pointer' }} onClick={() => toggleExpanded(index)}>{article.title}</p>
                      </div>
                    </div>
                    {/* Dropdown for detailed news */}
                    {expandedNews === index && (
                      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', marginTop: '10px' }}>
                        <p>{article.summary}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                      </div>
                    )}
                    <p style={{ borderBottom: '1px solid #E2E8F0', padding: '10px' }}></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
