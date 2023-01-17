import React from 'react';
import PropTypes from 'prop-types';

const VoterRowName = ({ name, color, currentPlayerId, id }) => (
  <>
    <div
      className="team-list-item-avatar f-center"
      style={{
      backgroundColor: `rgb(${color.background.r}, ${color.background.g}, ${color.background.b})`
    }}
    >
      <div
        style={{
            color: `rgb(${color.text.r}, ${color.text.g}, ${color.text.b})`
          }}
      >
        {name[0].toUpperCase()}
      </div>
    </div>

    <div className="team-list-item-name">
      {name}
      {' '}
      { currentPlayerId === id && <span>(you)</span> }
    </div>
  </>
);

VoterRowName.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.shape({
    background: PropTypes.shape({
      r: PropTypes.number,
      g: PropTypes.number,
      b: PropTypes.number,
    }),
    text: PropTypes.shape({
      r: PropTypes.number,
      g: PropTypes.number,
      b: PropTypes.number,
    })
  }).isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default VoterRowName;