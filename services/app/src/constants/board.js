import Pawn from '../components/gameFooter/gameFooterComponents/Pawn.svg';
import Knight from '../components/gameFooter/gameFooterComponents/Knight.svg';
import Bishop from '../components/gameFooter/gameFooterComponents/Bishop.svg';
import Rook from '../components/gameFooter/gameFooterComponents/Rook.svg';
import King from '../components/gameFooter/gameFooterComponents/King.svg';
import Queen from '../components/gameFooter/gameFooterComponents/Queen.svg';
import SkipMove from '../components/gameFooter/gameFooterComponents/SkipMove.svg';

export const PIECES = [
  {
    name: 'pawn',
    img: Pawn,
    strength: '1SP',
  },
  {
    name: 'knight',
    img: Knight,
    strength: '2SP',
  },
  {
    name: 'bishop',
    img: Bishop,
    strength: '3SP',
  },
  {
    name: 'rook',
    img: Rook,
    strength: '5SP',
  },
  {
    name: 'king',
    img: King,
    strength: '8SP',
  },
  {
    name: 'queen',
    img: Queen,
    strength: '13SP',
  },
  {
    name: 'skip',
    img: SkipMove,
    strength: '-',
  }
];

export const NUMBER_OF_ROWS = 6;
export const NUMBER_OF_COLUMNS = 6;
