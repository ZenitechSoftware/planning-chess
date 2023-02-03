import React, { forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { PlayerRoles } from '../../constants/playerConstants';
import VoterIcon from '../../static/svg/VoterIcon.svg';
import SpectatorIcon from '../../static/svg/SpectatorIcon.svg';
import { useUserContext } from '../../contexts/UserContext';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';


const RoleSelectionCard = forwardRef((props, ref) => {
  const { playerRole, roleDescription, onChangeFocus, autoFocus } = props;

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
  };

  useEffect(() => {
    ref.current.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        onChangeFocus();
      }
    })
  }, [])

  return (
    <button
      data-testid={`${playerRole} selection box`}
      type="button"
      className='role-selection-btn border-r-12 padding-sm'
      onClick={handleRoleSelect}
      ref={ref}
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={autoFocus}
    >
      <img src={boxIcon} alt="Role selection box logo" />
      <p className='font-size-m weight-800'>{playerRole}</p>
      <p>{roleDescription}</p>
    </button>
  )
});

RoleSelectionCard.defaultProps = {
  autoFocus: null,
}

RoleSelectionCard.propTypes = {
  playerRole: PropTypes.oneOf([
    PlayerRoles.Voter, 
    PlayerRoles.Spectator
  ]).isRequired,
  roleDescription: PropTypes.string.isRequired,
  onChangeFocus: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default RoleSelectionCard;