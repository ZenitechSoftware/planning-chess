import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { PlayerRoles } from '../../constants/playerConstants';
import VoterIcon from '../../static/svg/VoterIcon.svg';
import SpectatorIcon from '../../static/svg/SpectatorIcon.svg';
import { useUserContext } from '../../contexts/UserContext';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';


const RoleSelectionCard = ({ playerRole, roleDescription }) => {
  const navigate = useNavigate();
  const { gameId, setRole } = useUserContext();

  const boxIcon = playerRole === PlayerRoles.Voter
    ? VoterIcon
    : SpectatorIcon

  const handleRoleSelect = () => {
    setRole(playerRole);
    navigate(
      buildPathFromTemplate(ROUTES.game, {id: gameId}),
      { replace: true }
    );
  }

  return (
    <button
      data-testid={`${playerRole} selection box`}
      type="button"
      className='role-selection-btn'
      onClick={handleRoleSelect}
    >
      <img src={boxIcon} alt="Role selection box logo" />
      <p className='font-size-20 weight-800'>{playerRole}</p>
      <p>{roleDescription}</p>
    </button>
  )
};

RoleSelectionCard.propTypes = {
  playerRole: PropTypes.oneOf([
    PlayerRoles.Voter, 
    PlayerRoles.Spectator
  ]).isRequired,
  roleDescription: PropTypes.string.isRequired,
};

export default RoleSelectionCard;