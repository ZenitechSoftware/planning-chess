import React, { useContext } from 'react';
import './gameFooter.css';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import GameFooterActive from './GameFooterActive';
import GameFooterInactive from './GameFooterInactive';

const GameFooter = ({ skipCurrentPlayerMove }) => {
  const { voters } = useContext(ChessBoardContext)

  return (
    <div id="game-footer" className='align-c'>
      {
        voters.length < 2 ? <GameFooterInactive /> : <GameFooterActive skipCurrentPlayerMove={skipCurrentPlayerMove} />
      }
    </div>
  )
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};  

export default GameFooter;