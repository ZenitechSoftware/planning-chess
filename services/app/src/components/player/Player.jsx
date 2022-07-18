import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import playerPropType from '../../prop-types/player';
import Skip from '../team/teamComponents/Skip.svg';
import CheckMark from "../gameStatus/statusComponents/checkmark.svg";
import SkippedIcon from "../gameStatus/statusComponents/skippedIcon.svg";

const Player = ({ player, skipMove }) => (
        player && (
        <>
          <div
            className="team-list-item-avatar"
            style={{
                        backgroundColor: `rgb(${player.color.background.r}, ${player.color.background.g}, ${player.color.background.b})`,
                    }}
          >
            <div
              className="team-list-item-avatar-text"
              style={{
                            color: `rgb(${player.color.text.r}, ${player.color.text.g}, ${player.color.text.b})`,
                        }}
            >
              {player.name[0].toUpperCase()}
            </div>
          </div>
          <div className="team-list-item-name">
            {player.name}
            {' '}
            <span>(you)</span>
          </div>
            { player.status === playerStatuses.FigurePlaced && <img src={CheckMark} alt="player done icon" /> }
            { player.status === playerStatuses.MoveSkipped && <img src={SkippedIcon} alt="player skipped icon" /> }

          <div className="team-list-item-actions">
            <button
              type="button"
              onClick={() => skipMove(player.id)}
              disabled={player.status !== playerStatuses.ActionNotTaken}
            >
              <img alt="" src={Skip} />
            </button>
          </div>
        </>
        )
    );
Player.defaultProps = {
  player: null,
};
Player.propTypes = {
  player: playerPropType,
  skipMove: PropTypes.func.isRequired,
};

export default Player;
