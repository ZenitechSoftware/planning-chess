import Pawn from '../components/gameFooter/gameFooterComponents/Pawn.svg';
import Knight from '../components/gameFooter/gameFooterComponents/Knight.svg';
import Bishop from '../components/gameFooter/gameFooterComponents/Bishop.svg';
import Rook from '../components/gameFooter/gameFooterComponents/Rook.svg';
import King from '../components/gameFooter/gameFooterComponents/King.svg';
import Queen from '../components/gameFooter/gameFooterComponents/Queen.svg';
import SkipMove from '../components/gameFooter/gameFooterComponents/SkipMove.svg';

export const PieceName = {
  PAWN: 'pawn',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  ROOK: 'rook',
  KING: 'king',
  QUEEN: 'queen',
  SKIP: 'skip',
}

export const PIECES = [
  {
    name: PieceName.PAWN,
    img: Pawn,
    strength: '1SP',
  },
  {
    name: PieceName.KNIGHT,
    img: Knight,
    strength: '2SP',
  },
  {
    name: PieceName.BISHOP,
    img: Bishop,
    strength: '3SP',
  },
  {
    name: PieceName.ROOK,
    img: Rook,
    strength: '5SP',
  },
  {
    name: PieceName.KING,
    img: King,
    strength: '8SP',
  },
  {
    name: PieceName.QUEEN,
    img: Queen,
    strength: '13SP',
  },
  {
    name: PieceName.SKIP,
    img: SkipMove,
    strength: '-',
  }
];

export const NUMBER_OF_ROWS = 6;
export const NUMBER_OF_COLUMNS = 6;
