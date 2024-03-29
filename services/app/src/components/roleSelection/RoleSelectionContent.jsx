import React, { useRef } from 'react';
import './role-selection.css';
import { PlayerRoles } from '../../constants/playerConstants';
import RoleSelectionCard from './RoleSelectionCard';

const RoleSelectionContent = () => {
  const spectatorButtonRef = useRef();
  const voterButtonRef = useRef();

  const onVoterFocusChange = () => {
    spectatorButtonRef.current.focus();
  }

  const onSpectatorFocusChange = () => {
    voterButtonRef.current.focus();
  }
  
  return (
    <div className='role-selection-content border-r-4 margin-auto'>
      <p className='role-selection-title font-size-xxl weight-800 margin-0'>Choose your role</p>
      <p className='role-selection-description'>
        We need to know whether you participate in the estimating or not
      </p>
      
      <div className='role-selection-btn-container f-row-between align-stretch'>
        <RoleSelectionCard
          autoFocus
          ref={voterButtonRef}
          playerRole={PlayerRoles.Voter}
          roleDescription="Voters estimate tasks in story points. Choose this if you're an Engineer or similar."
          onChangeFocus={onVoterFocusChange}
        />
        <RoleSelectionCard
          ref={spectatorButtonRef}
          playerRole={PlayerRoles.Spectator}
          roleDescription="Spectators don't participate in task estimating. Choose this if you're in Management or similar."
          onChangeFocus={onSpectatorFocusChange}
        />
      </div>
    </div>
  )
};

export default RoleSelectionContent;