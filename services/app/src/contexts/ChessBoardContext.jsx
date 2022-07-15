/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { getPieceScore } from '../helpers/getPieceScore';
import { useChessBoard } from '../hooks/useChessBoard';
import { useUserFromLocalStorage } from '../hooks/useUserFromLocalStorage';
import { useWebSockets } from '../utils/useWebSockets';
import { WsContext } from './ws-context';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const { ws } = useContext(WsContext);
  const { turns, myTurn, movedBy, players } = useWebSockets();
  const [selectedItem, setSelectedItem] = useState('');
  const { username } = useUserFromLocalStorage();
  const { board, setBoard, defaultBoard } = useChessBoard();
  const [lastTurn, setLastTurn] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const canPlay = useMemo(() => players.length > 1, [players]);

  const isAllTurnsMade = useMemo(() => turns.length === players.length, [players, turns]);

  const generateFinalBoard = (finalTurns) => {
    const copyOfBoard = [...defaultBoard];
    finalTurns.forEach((turn) => {
      if ((!isAllTurnsMade && turn.player === username) || isAllTurnsMade)
        copyOfBoard[turn.row][turn.tile].items.push(turn);
    });
    setBoard(copyOfBoard);
  };

  const clearBoardItems = () => {
    setScore(0);
    setBoard(defaultBoard);
    setFinished(false);
    setLastTurn(null);
  };

  useEffect(() => {
    if (turns.length) {
      generateFinalBoard(turns);
    } else {
      clearBoardItems();
    }
  }, [turns]);

  useEffect(() => {
    if (movedBy.length) {
      const myMove = movedBy.find((moved) => moved.player === username);
      const myScore = myMove ? myMove.score : 0;
      setScore(myScore);
    }
  }, [movedBy]);

  const placeItemOnBoard = (row, tile, figure) => {
    if (!finished && selectedItem) {
      const copyOfBoard = [...board];
      const figureName = figure || selectedItem;
      if (lastTurn) {
        copyOfBoard[lastTurn.row][lastTurn.tile].items.length = 0;
      }
      copyOfBoard[row][tile].items.push({ figure: figureName, score: getPieceScore(figureName), player: username });
      setLastTurn({ row, tile, figure: selectedItem });
      setBoard(copyOfBoard);
    }
  };

  useEffect(() => {
    if (myTurn && myTurn.player === username) {
      const { row, tile, figure } = myTurn;
      placeItemOnBoard(row, tile, figure);
      setFinished(true);
      setScore(myTurn.score);
    }
  }, [myTurn]);

  const finishMove = () => {
    if (lastTurn) {
      ws.send({
        type: 'FigureMoved',
        payload: { ...lastTurn, player: username },
      });
      setFinished(true);
    }
  };

  const clearBoard = () => {
    ws.send({
      type: 'ClearBoard',
    });
    setLastTurn(null);
  };


  return (
    <ChessBoardContext.Provider
      value={{
        lastTurn,
        score,
        setSelectedItem,
        selectedItem,
        placeItemOnBoard,
        board,
        finishMove,
        clearBoard,
        finished,
        canPlay,
        isAllTurnsMade,
      }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
};

export const useChessBoardContext = () => useContext(ChessBoardContext);

export default ChessBoardContextProvider;
