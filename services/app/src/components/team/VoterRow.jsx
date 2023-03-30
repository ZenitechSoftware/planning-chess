import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatar/UserAvatar';

const VoterRow = ({ name, currentPlayerId, playerId, addon }) => (
  <>
    <UserAvatar size='m' playerId={playerId} dataTestId={`team-list-${playerId}`} />

    <div className="team-list-item-name">
      {name}
      {' '}
      { currentPlayerId === playerId && <span>(you)</span> }
    </div>

    {addon}
  </>
);

VoterRow.defaultProps = {
  addon: null,
  currentPlayerId: null
}

VoterRow.propTypes = {
  name: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.string,
  playerId: PropTypes.string.isRequired,
  addon: PropTypes.node,
};

export default VoterRow;