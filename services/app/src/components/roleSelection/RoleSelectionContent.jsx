import React, { useRef, useEffect } from 'react';
import './role-selection.css';
import { PlayerRoles } from '../../constants/playerConstants';
import RoleSelectionCard from './RoleSelectionCard';

const RoleSelectionContent = () => {
  const spectatorButtonRef = useRef();
  const voterButtonRef = useRef();

  useEffect(() => {
    voterButtonRef.current.focus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Tab' || e.keyCode === '9') {
      if (e.shiftKey) {
        e.preventDefault();
      }
      e.preventDefault();
      if (document.activeElement === voterButtonRef.current) {
        spectatorButtonRef.current.focus();
      } else {
        voterButtonRef.current.focus();
      }
    }
  }
  
  return (
    <div className='role-selection-content border-r-4 margin-auto'>
      <p className='role-selection-title font-size-xxl weight-800 margin-0'>Choose your role</p>
      <p className='role-selection-description'>
        We need to know whether you participate in the estimating or not
      </p>
      
      <div className='role-selection-btn-container f-row-between align-stretch'>
        <RoleSelectionCard 
          ref={voterButtonRef}
          playerRole={PlayerRoles.Voter}
          roleDescription="Voters estimate tasks in story points. Choose this if you're an Engineer or similar."
          handleKeyPress={handleKeyPress}
        />
        <RoleSelectionCard
          ref={spectatorButtonRef}
          playerRole={PlayerRoles.Spectator}
          roleDescription="Spectators don't participate in task estimating. Choose this if you're in Management or similar."
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
};

export default RoleSelectionContent;