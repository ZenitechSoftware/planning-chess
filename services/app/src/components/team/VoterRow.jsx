import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatar/UserAvatar';

const VoterRow = ({ name, currentPlayerId, id, addon }) => (
  <>
    <UserAvatar size='m' id={id} />

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
  currentPlayerId: null
}

VoterRow.propTypes = {
  name: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.string,
  id: PropTypes.string.isRequired,
  addon: PropTypes.node,
};

export default VoterRow;