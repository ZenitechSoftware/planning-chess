import React from 'react';
import './gameFooter.css';
import PropTypes from 'prop-types';
import { useWebSockets } from '../../hooks/useWebSockets';
import GameFooterActive from './GameFooterActive';
import GameFooterInactive from './GameFooterInactive';

const GameFooter = ({ skipCurrentPlayerMove }) => {
  const { players } = useWebSockets();

  return (
    <div id="game-footer">
      {
        players.length < 2 ? <GameFooterInactive /> : <GameFooterActive skipCurrentPlayerMove={skipCurrentPlayerMove} />
      }
    </div>
  )
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};  

export default GameFooter;