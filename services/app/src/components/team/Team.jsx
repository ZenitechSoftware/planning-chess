import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import userPropType from '../../prop-types/user';
import Return from './teamComponents/Return.svg';
import '../../static/style/team.css';

function Team({ users, skipMove, children, removePlayer, userCount }) {

  return (
    <div className="team-container">
      <GameStatus />
      <GameInfo userCount={userCount} />

      <div className="team-list-items">
        <div className="team-list-item">{children}</div>
        {users.map((user) => (
          <TeamMember
            key={user.id}
            name={user.name}
            id={user.id}
            skipMove={skipMove}
            status={user.status}
            removePlayer={removePlayer}
          />
        ))}
      </div>
      <div className="team-list-footer">
        <button type="button">
          <img alt="" src={Return} />
          {' '}
          Restart game
        </button>
      </div>
    </div>
  );
}

Team.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  userCount: PropTypes.number.isRequired,
};
export default Team;
