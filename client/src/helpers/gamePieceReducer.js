import blackKing from '../assets/black-king.png';
import blackBishop from '../assets/black-bishop.png';
import blackKnight from '../assets/black-knight.png';
import blackPawn from '../assets/black-pawn.png';
import blackQueen from '../assets/black-queen.png';
import blackRook from '../assets/black-rook.png';

import whiteKing from '../assets/white-king.png';
import whiteBishop from '../assets/white-bishop.png';
import whiteKnight from '../assets/white-knight.png';
import whitePawn from '../assets/white-pawn.png';
import whiteQueen from '../assets/white-queen.png';
import whiteRook from '../assets/white-rook.png';

const images = {
  blackKing,
  blackBishop,
  blackKnight,
  blackPawn,
  blackQueen,
  blackRook,
  whiteKing,
  whiteBishop,
  whiteKnight,
  whitePawn,
  whiteQueen,
  whiteRook,
};

const gamePieceRandomizer = () =>{
  var keys = Object.keys(images);
  return images[keys[ keys.length * Math.random() << 0]];
}


const gamePieceReducer = (piece) => {
  let color;
  let pieceName;
  piece === piece.toUpperCase() ? (color = 'white') : (color = 'black');
  switch (piece) {
    case 'p':
    case 'P':
      pieceName = 'Pawn';
      break;
    case 'k':
    case 'K':
      pieceName = 'King';
      break;
    case 'b':
    case 'B':
      pieceName = 'Bishop';
      break;
    case 'n':
    case 'N':
      pieceName = 'Knight';
      break;
    case 'r':
    case 'R':
      pieceName = 'Rook';
      break;
    case 'q':
    case 'Q':
      pieceName = 'Queen';
      break;
    default:
  }
  let pieceImage = images[`${color}${pieceName}`];
  return pieceImage;
};

export {gamePieceReducer, gamePieceRandomizer};
