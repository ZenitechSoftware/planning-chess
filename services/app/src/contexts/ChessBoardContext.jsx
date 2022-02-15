/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { useChessBoard } from '../hooks/useChessBoard';

export const ChessBoardContext = createContext();

const ChessBoardContextProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [board, setBoard] = useChessBoard();

  const placeItemOnBoard = (row, tile) => {
    if (selectedItem) {
      const copyOfBoard = [...board];
      copyOfBoard[row][tile].items.push(selectedItem);
      setBoard(copyOfBoard);
      setSelectedItem('');
    }
  };

  return (
    <ChessBoardContext.Provider
      value={{
        setSelectedItem,
        selectedItem,
        placeItemOnBoard,
        board,
      }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
};
export default ChessBoardContextProvider;
