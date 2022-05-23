import React from 'react';
import PropTypes from 'prop-types';

const Attribute = ({
  tile: { attribute, points }
}) => (
  <div className="attribute">
    <span className="index">{attribute}</span>
    <span className="points">{`${points} SP`}</span>
  </div>
);

Attribute.propTypes = {
  tile: PropTypes.shape({
    attribute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
    ]),
    points: PropTypes.number
  }).isRequired,
};

export default Attribute;
