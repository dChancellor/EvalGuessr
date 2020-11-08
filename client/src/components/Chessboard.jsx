import React from 'react';

import Square from './Square';
import style from '../css/Chessboard.module.css';

function Chessboard({ round }) {
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
  let highlightedSquare = false;
  if (round.colorToMove === 'black') {
    letters = letters.reverse();
    numbers = numbers.reverse();
  }
  let isWhite = true;
  let positionCounter = -1;
  return (
    <section className={style.board}>
      {numbers.map((number, index) => {
        isWhite = !isWhite;
        return (
            <div key={index} className={style.row}>
              {letters.map((letter) => {
                isWhite = !isWhite;
                positionCounter++;
                highlightedSquare =
                  `${letter}${number}` === round.lastMove.from ||
                  `${letter}${number}` === round.lastMove.to;
                return (
                  <Square
                    highlighted={highlightedSquare}
                    key={`${letter}${number}`}
                    isWhite={isWhite}
                    piece={round.position[positionCounter]}
                    location={`${letter}${number}`}
                  />
                );
              })}
            </div>
        );
      })}
    </section>
  );
}

export default Chessboard;
