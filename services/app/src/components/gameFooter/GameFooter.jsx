import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ChessBoardPieces from './ChessBoardPieces';
import './chess-pieces.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const ExplanatoryTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} title="Skips your move. The game continues" placement='right-end' arrow={true}/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    height: 20
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'black',
  },
}));


function GameFooter({ skipCurrentPlayerMove }) {
  const { lastTurn, finishMove, finished, isAllTurnsMade } = useContext(ChessBoardContext);
  return (
    <div id="game-footer">
      <div>
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <div className="btn-field">
        <button type="button" className="finish-btn" disabled={!lastTurn || isAllTurnsMade || (finished && !isAllTurnsMade)} onClick={finishMove}>
          Finish Move
        </button>
          <ExplanatoryTooltip>
            <button type="button" className="skip-btn" disabled={finished} onClick={() => skipCurrentPlayerMove()}>
              Skip Move
            </button>
          </ExplanatoryTooltip>
          {/* <div className="expl-text">Skips your move. The game continues</div> */}
      </div>
    </div>
  );
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooter;
