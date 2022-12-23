import React from 'react';
import playerStatuses from '../../constants/playerStatuses';
import playerPropType from '../../prop-types/player';
import CheckMark from "../../static/svg/Checkmark.svg";
import SkippedIcon from "../../static/svg/SkippedIcon.svg";
import { rgbToColor } from '../../helpers/rgbToColor';

const Player = ({ player }) => (
        player && (
        <>
          <div
            className="team-list-item-avatar align-c"
            style={{
                        backgroundColor: rgbToColor(player.color.background),
                    }}
          >
            <div
              className="team-list-item-avatar-text"
              style={{
                        color: rgbToColor(player.color.text),
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
            { player.status === playerStatuses.FigurePlaced && <img src={CheckMark} className="team-list-item-icon" alt="player done icon" /> }
            { player.status === playerStatuses.MoveSkipped && <img src={SkippedIcon} className="team-list-item-icon" alt="player skipped icon" /> }
        </>
        )
    );
Player.defaultProps = {
  player: null,
};
Player.propTypes = {
  player: playerPropType,
};

export default Player;
