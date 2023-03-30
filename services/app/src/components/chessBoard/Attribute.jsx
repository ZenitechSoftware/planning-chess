import React from 'react';
import PropTypes from 'prop-types';

const Attribute = ({
  tile: { attribute, points }
}) => (
  <div className="attribute f-column-center justify-center padding-s">
    <span className="index weight-700 font-size-l">{attribute}</span>
    <span className="points weight-500 rubik-font font-size-xxs">{`${points} SP`}</span>
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
