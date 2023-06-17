import React from 'react';
import PropTypes from 'prop-types';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import GameFooterActive from './GameFooterActive';
import GameFooterInactive from './GameFooterInactive';
import { GameState } from '../../constants/gameConstants';

const GameFooter = ({ skipCurrentPlayerMove }) => {
  const { gameState } = useChessBoardContext();

  return (
    <div id="game-footer" className='align-c'>
      {
        gameState === GameState.GAME_NOT_STARTED 
          ? <GameFooterInactive /> 
          : <GameFooterActive skipCurrentPlayerMove={skipCurrentPlayerMove} />
      }
    </div>
  )
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};  

export default GameFooter;