/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useChessBoard } from '../hooks/useChessBoard';
import { useUserFromLocalStorage } from '../hooks/useUserFromLocalStorage';
import { useWebSockets } from '../utils/useWebSockets';
import { WsContext } from './ws-context';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const { ws } = useContext(WsContext);
  const { turns, myTurn } = useWebSockets();
  const [selectedItem, setSelectedItem] = useState('');
  const { username } = useUserFromLocalStorage();
  const { board, setBoard, defaultBoard } = useChessBoard();
  const [lastTurn, setLastTurn] = useState(null);
  const [finished, setFinished] = useState(false);

  const generateFinalBoard = (finalTurns) => {
    const copyOfBoard = [...board];
    finalTurns.forEach((turn) => {
      if (turn.player !== username)
        copyOfBoard[turn.row][turn.tile].items.push(turn.figure);
    });
    setBoard(copyOfBoard);
  };

  const clearBoardItems = () => {
    setBoard(defaultBoard);
    setFinished(false);
  };

  useEffect(() => {
    if (turns.length) {
      generateFinalBoard(turns);
    } else {
      clearBoardItems();
    }
  }, [turns]);

  const placeItemOnBoard = (row, tile, figure) => {
    if (!finished) {
      const copyOfBoard = [...board];
      if (lastTurn) {
        copyOfBoard[lastTurn.row][lastTurn.tile].items.length = 0;
      }
      copyOfBoard[row][tile].items.push(figure || selectedItem);
      setLastTurn({ row, tile, figure: selectedItem });
      setBoard(copyOfBoard);
    }
  };

  useEffect(() => {
    if (myTurn && myTurn.player === username) {
      const { row, tile, figure } = myTurn;
      placeItemOnBoard(row, tile, figure);
      setFinished(true);
    }
  }, [myTurn]);

  const finishMove = () => {
    if (lastTurn) {
      ws.send(
        JSON.stringify({
          type: 'FigureMoved',
          payload: { ...lastTurn, player: username },
        }),
      );
      setFinished(true);
    }
  };

  const clearBoard = () => {
    ws.send(
      JSON.stringify({
        type: 'ClearBoard',
      }),
    );
  };

  return (
    <ChessBoardContext.Provider
      value={{
        lastTurn,
        setSelectedItem,
        selectedItem,
        placeItemOnBoard,
        board,
        finishMove,
        clearBoard,
      }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
};
export default ChessBoardContextProvider;
