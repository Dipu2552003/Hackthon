import React from 'react';
import PropTypes from 'prop-types';


const Card = ({ sector, company, esgscore }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3>om = 10px{sector}</h3>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>ESG Score:</strong> {esgscore}</p>
    </div>
  );
};

Card.propTypes = {
  sector: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  esgscore: PropTypes.string.isRequired,
};

export default Card;
