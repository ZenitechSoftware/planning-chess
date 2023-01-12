import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { PlayerRoles } from '../../constants/playerConstants';
import { useUserRole } from '../../hooks/useUserRole'; 
import { useGameId } from '../../hooks/useGameId';
import VoterIcon from '../../static/svg/VoterIcon.svg';
import SpectatorIcon from '../../static/svg/SpectatorIcon.svg';
import * as paths from "../../constants/urls";


const RoleSelectionBox = ({ boxRole, text }) => {
  const navigate = useNavigate();
  const { gameId } = useGameId();

  const boxIcon = boxRole === PlayerRoles.Voter
    ? VoterIcon
    : SpectatorIcon

  const { setRole } = useUserRole();

  const handleRoleSelect = () => {
    setRole(boxRole);
    navigate(paths.gameRoomUrl(gameId));
  }

  return (
    <button
      data-testid={`${boxRole} selection box`}
      type="button"
      className='role-selection-btn'
      onClick={() => handleRoleSelect()}
    >
      <img src={boxIcon} alt="Role selection box logo" />
      <p className='role-selection-btn-title'>{boxRole}</p>
      <p className='role-selection-btn-description'>{text}</p>
    </button>
  )
};

RoleSelectionBox.propTypes = {
  boxRole: PropTypes.oneOf([
    PlayerRoles.Voter, 
    PlayerRoles.Spectator
  ]).isRequired,
  text: PropTypes.string.isRequired,
};

export default RoleSelectionBox;