/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {calculateAverage,roundUp} from "@planning-chess/shared";
import { useChessBoard } from '../hooks/useChessBoard';
import { useWsContext } from './ws-context';
import { PlayerStatuses, PlayerRoles } from "../constants/playerConstants"; 
import { PieceName } from '../constants/board';
import { GameState, TurnType } from '../constants/gameConstants';
import { useUserContext } from './UserContext';
import { buildPlayerFigureMovedMessage } from '../api/playerApi';
import { buildClearBoardMessage } from '../api/appApi';
import { MessageType } from '../constants/messages';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const { ws, addWsEventListener } = useWsContext();

  const userContext = useUserContext();
  const chessBoard = useChessBoard();
  
  const [globalScore, setGlobalScore] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');

  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [isAnotherSessionActive, setIsAnotherSessionActive] = useState(false);
  const [players, setPlayers] = useState([]);
  const [turns, setTurns] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const currentPlayer = useMemo(
    () => players.find((user) => user.id === currentPlayerId),
    [players],
  );

  const lastTurn = useMemo(() => {
    const allTurns = chessBoard.board.flatMap(row => 
      row.filter(cellLike => 'items' in cellLike)
      .flatMap(cell => cell.items)
    );
    return allTurns.find(turn => turn.playerId === currentPlayerId) ?? null;
  }, [currentPlayer, chessBoard.board]);

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
  ].includes(currentPlayer?.status), [currentPlayer]);

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
  }, [players]);

  const votersListWithScores = useMemo(() => {
    if (gameState === GameState.GAME_FINISHED && turns) {
      const voterList = voters.map(voter => {
        const tempVoter = {...voter}
        const voterTurn = turns.find(turn => turn.playerId === voter.id)
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

  const finishMove = (turn) => {
    ws.send(
      buildPlayerFigureMovedMessage({ ...turn, player: userContext.username, playerId: currentPlayerId })
    )
  };

  const clearBoard = () => {
    ws.send(buildClearBoardMessage());
  };

  const clearBoardItems = () => {
    setGlobalScore(0);
    chessBoard.clearChessBoard();
    setSelectedItem('');
  };

  const findUserById = (id) => players.find((element) => element.id === id);
  
  const placeItemOnBoard = (row, tile, figure) => {
    if (selectedItem === PieceName.SKIP) {
      return;
    }

    if (gameState === GameState.GAME_FINISHED) {
      return;
    }
    if (selectedItem) {
      const figureName = figure || selectedItem;
      
      if (lastTurn) {
        chessBoard.clearChessBoard();
      }
      finishMove({ row, tile, figure: selectedItem });
      chessBoard.insertFigureIntoBoard({
        row,
        tile,
        figureName,
        playerId: currentPlayerId,
        playerName: userContext.username,
      });
    }
  };

  const removeFigureFromBoard = () => {
    chessBoard.clearChessBoard();
  }

  addWsEventListener(MessageType.PlayerSuccessfullyJoined, (payload) => {
    userContext.setUserId(payload)
    setCurrentPlayerId(payload);
  });

  addWsEventListener(MessageType.PlayerAlreadyExists, () => {
    setIsAnotherSessionActive(true);
  });

  addWsEventListener(MessageType.UpdatePlayerList, (payload) => {
    setPlayers(payload);
  });

  addWsEventListener(MessageType.PlayerDisconnected, (payload) => {
    setPlayers(payload);
  });

  addWsEventListener(MessageType.MoveSkipped, (payload) => {
    setPlayers(payload);
  });

  addWsEventListener(MessageType.ErrorMessage, (payload) => {
    setErrorMessage(payload);
  });

  addWsEventListener(MessageType.ActionMade, (payload) => {
    const myMove = payload.find((moved) => moved.playerId === currentPlayerId);
    if (myMove) {
      if (myMove.turnType === TurnType.FigurePlaced) {
        chessBoard.insertMoveScoreIntoBoard(myMove);
      }
    
      if(myMove.turnType === TurnType.MoveSkipped) {
        setSelectedItem(PieceName.SKIP);
      }
    }
  });
  
  addWsEventListener(MessageType.SetMyTurn, (myTurn) => {
    if (myTurn) {
      if (myTurn.turnType === TurnType.MoveSkipped) {
        setSelectedItem(PieceName.SKIP);
        return;
      };
      const { row, tile, figure, playerId } = myTurn;
      setSelectedItem(figure);
      chessBoard.insertFigureIntoBoard({
        row,
        tile,
        figureName: figure,
        playerId,
        playerName: userContext.username,
      });
    }
  });

  addWsEventListener(MessageType.NewBoardState, (payload) => {
    setTurns(payload);
    if (payload.length) {
      if (gameState === GameState.GAME_FINISHED) {
        chessBoard.insertAllTurnsIntoBoard(payload);
      }
      if (voters.length === 1) {
        setGlobalScore(0)
      } else {
        const scoresArray = payload
          .filter(turn => turn.turnType === TurnType.FigurePlaced)
          .map(turn => turn.score);
        const average = calculateAverage(scoresArray);
        setGlobalScore(roundUp(average));
      }
      const currentPlayerMove = payload.find(turn => turn.playerId === currentPlayerId);
      if (currentPlayer?.role !== PlayerRoles.Spectator) {
        setSelectedItem(currentPlayerMove?.figure ?? PieceName.SKIP);
        
      }
    } else {
      clearBoardItems();
    }
  });
  
  return (
    <ChessBoardContext.Provider
      value={{
        voters,
        spectators,
        lastTurn,
        removeFigureFromBoard,
        findUserById,
        setSelectedItem,
        selectedItem,
        placeItemOnBoard,
        board: chessBoard.board,
        finishMove,
        clearBoard,
        finished,
        globalScore,
        currentPlayer,
        isCurrentPlayerSpectator,
        gameState,
        votersListWithScores,
        currentPlayerId,
        isAnotherSessionActive,
        players,
        errorMessage,
        turns,
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
