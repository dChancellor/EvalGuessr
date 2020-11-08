import React, { useState, useEffect } from 'react';

import { gamePieceRandomizer } from '../helpers/gamePieceReducer.js';

import style from '../css/Loading.module.css';

function Loading() {
  const [piece, setPiece] = useState(gamePieceRandomizer);

  useEffect(() => {
    setTimeout(() => {
        
    }, 1000);
  }, [piece]);

  return (
    <div className={style.loading}>
      <h3>Calculating...</h3>
      <img alt={'piece'} src={piece} className={style.chessPiece}></img>
    </div>
  );
}

export default Loading;
