import React from 'react'

import {gamePieceReducer} from '../helpers/gamePieceReducer'

import style from '../css/Square.module.css'

function Square({piece, isWhite, highlighted}) {
    const image = piece ? gamePieceReducer(piece) : null
    return (
        <div className={`${style.square} ${highlighted && style.highlighted} ${isWhite ? style.white : style.black}` }>
            {piece && <img alt={piece} src={image} />}
        </div>
    )
}

export default Square
