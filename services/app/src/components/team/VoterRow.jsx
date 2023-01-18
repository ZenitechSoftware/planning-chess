import React from 'react';
import PropTypes from 'prop-types';
import { playerColorPropType } from '../../prop-types/player';

const VoterRow = ({ name, color, currentPlayerId, id, addon }) => (
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

    {addon}
  </>
);

VoterRow.defaultProps = {
  addon: null,
}

VoterRow.propTypes = {
  name: PropTypes.string.isRequired,
  color: playerColorPropType.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  addon: PropTypes.node,
};

export default VoterRow;