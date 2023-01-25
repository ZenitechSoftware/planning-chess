/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {calculateAverage,roundUp} from "@planning-chess/shared";
import { getPieceScore } from '../helpers/getPieceScore';
import { useChessBoard } from '../hooks/useChessBoard';
import { useWebSockets } from '../hooks/useWebSockets';
import { WsContext } from './ws-context';
import { PlayerStatuses, PlayerRoles } from "../constants/playerConstants"; 
import { PieceName } from '../constants/board';
import { GameState } from '../constants/gameConstants';
import { useUserContext } from './UserContext';
import { buildPlayerFigureMovedMessage } from '../api/playerApi';
import { buildClearBoardMessage } from '../api/appApi';

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
        return tempVoter;
      });
      const playersWhoSkipped = voterList.filter(p => p.status === PlayerStatuses.MoveSkipped);
      const playersWhoMoved = voterList
        .filter(p => p.status === PlayerStatuses.FigurePlaced)
        .sort((a, b) => b.score - a.score);
      return [...playersWhoMoved, ...playersWhoSkipped];
    }
    return [];
  }, [turns, gameState, voters]);

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

  const removeFigureFromBoard = () => {
    setLastTurn(null);
    setBoard(defaultBoard);
  }

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

  const finishMove = (turn) => {
    ws.send(
      buildPlayerFigureMovedMessage({ ...turn, player: userContext.username, id: currentPlayerId })
    )
  };

  const placeItemOnBoard = (row, tile, figure) => {
    if (selectedItem === PieceName.SKIP) {
      return;
    }

    if (selectedItem) {
      const copyOfBoard = [...defaultBoard];
      const figureName = figure || selectedItem;
      if (lastTurn) {
        copyOfBoard[lastTurn.row][lastTurn.tile].items.length = 0;
      }
      setLastTurn({ row, tile, figure: selectedItem });
      finishMove({ row, tile, figure: selectedItem });
      copyOfBoard[row][tile].items.push({ figure: figureName, score: getPieceScore(figureName), player: userContext.username, id: currentPlayerId });
      setBoard(copyOfBoard);
    }
  };

  useEffect(() => {
    if (myTurn) {
      const { row, tile, figure } = myTurn;
      placeItemOnBoard(row, tile, figure);
      setScore(myTurn.score);
    }
  }, [myTurn]);

  const clearBoard = () => {
    ws.send(buildClearBoardMessage());
    setLastTurn(null);
  };

  const findUserById = (id) => players.find((element) => element.id === id);

  return (
    <ChessBoardContext.Provider
      value={{
        voters,
        spectators,
        lastTurn,
        removeFigureFromBoard,
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
