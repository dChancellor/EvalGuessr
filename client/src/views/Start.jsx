import React, { useState } from 'react';

import style from '../css/Start.module.css';

function Start({ begin }) {
  const [numberOfGames, setNumberOfGames] = useState(1);
  const [evaluationTime, setEngineTime] = useState(5);

  const onSubmit = (event) => {
    event.preventDefault();
    begin(numberOfGames, evaluationTime * 1000);
  };

  return (
    <>
      <div className={style.background}></div>
      <div className={style.window}>
        <h1 className={style.title}>EvalGuessr</h1>
        <p>
          Welcome to the evaluation guessing game! While the rules may be
          simple, the technique is anything but. Below, select how many games
          you would like to complete and how long you would like to give the
          engine to calculate the advantage. You will then be presented with a
          real position pulled from an actual chess game. You must determine as
          quickly as possible what you believe a Stockfish level 10 engine would
          calculate the position as. Positive numbers indicate that white has
          the advantage, and negative numbers indicate that black does.
        </p>
        <h4>Good luck!</h4>
        <form autoComplete='off'>
          <label className={style.label} htmlFor='number-of-games'>
            Number of Games This Round  <span>(max 10)</span>
          </label>
          <br></br>
          <input
            className={style.input}
            type='number'
            name='number-of-games'
            value={numberOfGames}
            onChange={(event) => {if(event.target.value <= 10 && event.target.value > 0)setNumberOfGames(event.target.value)}}
          ></input>
          <br></br>
          <label className={style.label} htmlFor='calculation-time'>
            Time for the engine to calculate  <span>(in seconds)  (max 30)</span>
          </label>
          <br></br>
          <input
            className={style.input}
            type='number'
            name='calculation-time'
            value={evaluationTime}
            onChange={(event) => {if(event.target.value <= 30 && event.target.value > 0)setEngineTime(event.target.value)}}
          ></input>
          <br></br>
          <input
            className={style.button}
            type='submit'
            value='Begin'
            onClick={(event) => onSubmit(event)}
          ></input>
        </form>
      </div>
    </>
  );
}

export default Start;
