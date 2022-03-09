import { ChessBoardContext } from '../contexts/ChessBoardContext';
import { useContext } from 'react';

export const useChessBoardContext = () => {
    return useContext(ChessBoardContext);
};