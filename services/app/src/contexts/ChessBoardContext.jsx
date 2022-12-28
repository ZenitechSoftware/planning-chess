/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import {calculateAverage,roundUp} from "@planning-chess/shared";
import { getPieceScore } from '../helpers/getPieceScore';
import { useChessBoard } from '../hooks/useChessBoard';
import { useUserFromLocalStorage } from '../hooks/useUserFromLocalStorage';
import { useWebSockets } from '../hooks/useWebSockets';
import { WsContext } from './ws-context';
import playerStatuses from "../constants/playerStatuses";
import { makeCurrentPlayerFirstInList } from '../helpers/makeCurrentPlayerFirstInList';
import { PLAYER_ROLES } from '../constants/playerConstants';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const { ws } = useContext(WsContext);
  const { turns, myTurn, movedBy, players, currentPlayerId } = useWebSockets();
  const [selectedItem, setSelectedItem] = useState('');
  const { username } = useUserFromLocalStorage();
  const { board, setBoard, defaultBoard } = useChessBoard();
  const [lastTurn, setLastTurn] = useState(null);
  const [score, setScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);

  const currentPlayer = useMemo(
    () => players.find((user) => user.id === currentPlayerId),
    [players],
  );

  const voters = useMemo(() => {
    const tempVoters = players.filter(p => p.role === PLAYER_ROLES.VOTER);
    if(currentPlayer?.role === PLAYER_ROLES.VOTER) {
      return makeCurrentPlayerFirstInList(tempVoters, currentPlayerId, currentPlayer);
    }
    return tempVoters;
  }, [players, currentPlayer]);

  const spectators = useMemo(() => {
    const tempSpectators = players.filter(p => p.role === PLAYER_ROLES.SPECTATOR);
    if(currentPlayer?.role === PLAYER_ROLES.SPECTATOR) {
      return makeCurrentPlayerFirstInList(tempSpectators, currentPlayerId, currentPlayer);
    }
    return tempSpectators;
  }, [players, currentPlayer]);

  const isAllTurnsMade = useMemo(() => {
    if(voters.length < 2) {
      return false;
    }
    const playersWhoDidNotMoved = players
      .filter(p => p.role === PLAYER_ROLES.VOTER)
      .filter(p => p.status === "ActionNotTaken");
    return playersWhoDidNotMoved.length === 0;
  }, [players, turns]);

  const isGameInProgress = useMemo(() => voters.length > 1 && !isAllTurnsMade, [players, isAllTurnsMade]);
  
  const finished = useMemo(() => [
    playerStatuses.FigurePlaced,
    playerStatuses.MoveSkipped
  ].includes(players.find(p => p.id === currentPlayerId)?.status), [players]);

  const generateFinalBoard = (finalTurns) => {
    const copyOfBoard = [...defaultBoard];
    const gameScore = [];
    finalTurns.forEach((turn) => {
      if ((!isAllTurnsMade && turn.id === currentPlayerId) || isAllTurnsMade)
        copyOfBoard[turn.row][turn.tile].items.push(turn);
        gameScore.push(turn.score);
    });
    const avg = calculateAverage(gameScore);
    if (voters.length === 1) {
      setGlobalScore(0)
    } else {
      setGlobalScore(roundUp(avg))
    }
    setBoard(copyOfBoard);
  };

  const clearBoardItems = () => {
    setScore(0);
    setGlobalScore(0);
    setBoard(defaultBoard);
    setLastTurn(null);
    setSelectedItem('');
  };

  useEffect(() => {
    if (turns.length) {
      generateFinalBoard(turns);
    } else {
      clearBoardItems();
    }
  }, [turns, isAllTurnsMade]);

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
      copyOfBoard[row][tile].items.push({ figure: figureName, score: getPieceScore(figureName), player: username, id: currentPlayerId });
      setLastTurn({ row, tile, figure: selectedItem });
      setBoard(copyOfBoard);
    }
  };

  useEffect(() => {
    if (myTurn && myTurn.player === username) {
      const { row, tile, figure } = myTurn;
      placeItemOnBoard(row, tile, figure);
      setScore(myTurn.score);
    }
  }, [myTurn]);

  const finishMove = () => {
    if (currentPlayer.role === PLAYER_ROLES.SPECTATOR) {
      return;
    }

    if (lastTurn) {
      ws.send({
        type: 'FigureMoved',
        payload: { ...lastTurn, player: username, id: currentPlayerId },
      });
    }
  };

  const clearBoard = () => {
    ws.send({
      type: 'ClearBoard',
    });
    setLastTurn(null);
  };

  const findUserById = (id) => players.find((element) => element.id === id);

  return (
    <ChessBoardContext.Provider
      value={{
        voters,
        spectators,
        lastTurn,
        findUserById,
        score,
        setSelectedItem,
        selectedItem,
        placeItemOnBoard,
        board,
        finishMove,
        clearBoard,
        finished,
        isGameInProgress,
        isAllTurnsMade,
        players,
        globalScore,
        currentPlayer
      }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
};

export const useChessBoardContext = () => useContext(ChessBoardContext);

export default ChessBoardContextProvider;
