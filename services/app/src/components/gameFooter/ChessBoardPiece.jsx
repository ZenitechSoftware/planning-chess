import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './chess-board-pieces.css';
import { Avatar, Tooltip } from 'antd';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';
import { PieceName } from '../../constants/board';
import { GameState } from '../../constants/gameConstants';
import UserAvatar from '../avatar/UserAvatar';

const ChessBoardPiece = ({ selectFigure, figureName, figureImg, figureStrength, disabled }) => {
  const { selectedItem, turns, gameState } = useChessBoardContext();

  const skipTooltipTxt = "Mark my move as complete, without any story points";

  const avatarSize = turns.length > 1
    ? 'xs'
    : 's';

  const onSelect = () => {
    if (!disabled) {
      selectFigure(figureName)
    }
  }

  return (
    <PlanningChessTooltip
      title={figureName === PieceName.SKIP ? skipTooltipTxt : null}
      placement="top"
    >
      <button
        type="button"
        data-testid={`${figureName}-piece-btn`}
        onClick={() => onSelect()}
        className={classnames(
          'piece-field padding-y-s padding-x-sm f-center rubik-font',
          {
            'piece-field-selected':
              selectedItem === figureName &&
              gameState !== GameState.GAME_FINISHED,
            // disabling with class, because antd appends unnecessary spam around the button when its disabled
            'disabled': disabled,
          },
        )}
      >
        <div className="piece-and-score">
          <img src={figureImg} alt={figureName} className="figure-img" />
          <p className="figure-title font-size-s weight-500">{figureName}</p>
          <div className="figure-strength-container border-r-20 padding-y-0 padding-x-xxs f-center">
            <p className="figure-strength font-size-xxs weight-500">
              {figureStrength}
            </p>
          </div>
        </div>
        <Tooltip
          title={(
            <div>
              <div>
                {
                  turns.filter((element) => element.figure === figureName)
                    .length
                }{' '}
                voted for {figureStrength}
              </div>
              <div>
                {turns
                  .filter((element) => element.figure === figureName)
                  .map((item) => item.player)
                  .join(', ')}
              </div>
            </div>
            )
          }
          placement="top"
        >
          <div className="figure-info">
            {gameState === GameState.GAME_FINISHED && (
              <Avatar.Group
                maxCount={2}
                maxStyle={{
                  color: 'var(--primary)',
                  border: '1px solid var(--primary)',
                  backgroundColor: 'var(--background)',
                  fontFamily: 'Poppins',
                }}
                overlayClassName="hide-group-popover"
                size={24}
              >
                {turns
                  .filter((element) => element.figure === figureName)
                  .map((item, index) => (
                    <UserAvatar
                      size={avatarSize}
                      playerId={item.playerId}
                      key={`bubble-${index}`}
                      playerInitials={item.player[0]}
                      dataTestId={`square-${item.playerId}`}
                      bordered
                    />
                  ))}
              </Avatar.Group>
            )}
          </div>
        </Tooltip>
      </button>
    </PlanningChessTooltip>
  );
}

ChessBoardPiece.propTypes = {
  selectFigure: PropTypes.func.isRequired,
  figureName: PropTypes.string.isRequired,
  figureImg: PropTypes.string.isRequired,
  figureStrength: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ChessBoardPiece