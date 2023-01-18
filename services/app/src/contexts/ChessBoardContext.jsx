/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {calculateAverage,roundUp} from "@planning-chess/shared";
import { getPieceScore } from '../helpers/getPieceScore';
import { useChessBoard } from '../hooks/useChessBoard';
import { useWebSockets } from '../hooks/useWebSockets';
import { WsContext } from './ws-context';
import { PlayerStatuses, PlayerRoles } from "../constants/playerConstants"; 
import { GameState } from '../constants/gameConstants';
import { useUserContext } from './UserContext';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const { ws } = useContext(WsContext);
  const { turns, myTurn, movedBy, players, currentPlayerId } = useWebSockets();
  const [selectedItem, setSelectedItem] = useState('');
  const userContext = useUserContext();

  const { board, setBoard, defaultBoard } = useChessBoard();
  const [lastTurn, setLastTurn] = useState(null);
  const [score, setScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);

  const currentPlayer = useMemo(
    () => players.find((user) => user.id === currentPlayerId),
    [players],
  );

  const isCurrentPlayerSpectator = useMemo(
    () => currentPlayer?.role === PlayerRoles.Spectator, [currentPlayer]
  )

  const sortedPlayers = useMemo(() => {
    const otherPlayers = players?.filter(p => p.id !== currentPlayerId);
    return [currentPlayer, ...otherPlayers];
  }, [players, currentPlayer]);

  const voters = useMemo(() => {
    if (!sortedPlayers) return [];
    const votersList = sortedPlayers.filter(p => p?.role === PlayerRoles.Voter);
    if (votersList.length === 0) {
      return [];
    }
    return votersList;
  }, [sortedPlayers]);

  const spectators = useMemo(() => {
    if (!sortedPlayers) return [];
    const spectatorsList = sortedPlayers.filter(p => p?.role === PlayerRoles.Spectator);
    if (spectatorsList.length === 0) {
      return [];
    }
    return spectatorsList;
  }, [sortedPlayers]);
  
  const finished = useMemo(() => [
    PlayerStatuses.FigurePlaced,
    PlayerStatuses.MoveSkipped
  ].includes(players.find(p => p.id === currentPlayerId)?.status), [players]);

  const gameState = useMemo(() => {
    const votersWhoDidNotMove = voters
      .filter(p => p.status === PlayerStatuses.ActionNotTaken);
    
    if (voters.length > 1) {
      if (votersWhoDidNotMove.length === 0) {
          return GameState.GAME_FINISHED;
      }
      return GameState.GAME_IN_PROGRESS;
    }

    return GameState.GAME_NOT_STARTED;
  }, [players, turns]);

  const votersListWithScores = useMemo(() => {
    if (gameState === GameState.GAME_FINISHED && turns) {
      const voterList = voters.map(voter => {
        const tempVoter = {...voter}
        const voterTurn = turns.find(turn => turn.id === voter.id)
        if (voterTurn) {
          tempVoter.score = voterTurn.score;
          return tempVoter;
        }
        tempVoter.score = 0;
        return tempVoter;
      })

      return voterList.sort((a, b) => b.score - a.score);
    }
    return [];
  }, [turns, players]);

  const generateFinalBoard = (finalTurns) => {
    const copyOfBoard = [...defaultBoard];
    const gameScore = [];
    finalTurns.forEach((turn) => {
      if ((gameState === GameState.GAME_IN_PROGRESS && turn.id === currentPlayerId) || gameState === GameState.GAME_FINISHED)
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
  }, [turns, gameState]);

  useEffect(() => {
    if (movedBy.length) {
      const myMove = movedBy.find((moved) => moved.player === userContext.username);
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
      copyOfBoard[row][tile].items.push({ figure: figureName, score: getPieceScore(figureName), player: userContext.username, id: currentPlayerId });
      setLastTurn({ row, tile, figure: selectedItem });
      setBoard(copyOfBoard);
    }
  };

  useEffect(() => {
    if (myTurn && myTurn.player === userContext.username) {
      const { row, tile, figure } = myTurn;
      placeItemOnBoard(row, tile, figure);
      setScore(myTurn.score);
    }
  }, [myTurn]);

  const finishMove = () => {
    if (lastTurn) {
      ws.send({
        type: 'FigureMoved',
        payload: { ...lastTurn, player: userContext.username, id: currentPlayerId },
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
        players,
        globalScore,
        currentPlayer,
        isCurrentPlayerSpectator,
        gameState,
        votersListWithScores,
      }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
};

ChessBoardContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export const useChessBoardContext = () => useContext(ChessBoardContext);

export default ChessBoardContextProvider;
