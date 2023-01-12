import React from 'react';
import './roleSelection.css';
import { PlayerRoles } from '../../constants/playerConstants';
import RoleSelectionBox from './RoleSelectionBox';

const RoleSelectionContent = () => (
  <div className='role-selection-content margin-auto'>
    <p className='role-selection-title margin-0'>Choose your role</p>
    <p className='role-selection-description'>
      We need to know whether you participate in the estimating or not
    </p>
    
    <div className='role-selection-btn-container f-row-between'>
      <RoleSelectionBox 
        boxRole={PlayerRoles.Voter}
        text="Voters estimate tasks in story points. Choose this if you're an Engineer or similar."
      />
      <RoleSelectionBox 
        boxRole={PlayerRoles.Spectator}
        text="Spectators don't participate in task estimating. Choose this if you're in Management or similar."
      />
    </div>
  </div>
)

export default RoleSelectionContent;