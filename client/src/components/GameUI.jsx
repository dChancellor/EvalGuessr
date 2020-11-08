import React, { useState } from 'react';

import Timer from '../components/Timer';
import style from '../css/GameUI.module.css';

function GameUI({ results, submitGuess }) {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState(false);
  const [time, setTime] = useState({})

  const onSubmit = (event) => {
    event.preventDefault();
    guess ? submitGuess(guess, time) : setError(true);
    setGuess('');
  };

  return (
    <section className={style.window}>
      <Timer sendTimer={setTime} />
      <form autoComplete='off' className={style.form}>
        <label htmlFor='guess'>Input Guess: </label>
        <input
          className={style.input}
          type='number'
          name='guess'
          autoFocus
          value={guess}
          onChange={(event) => {
            setGuess(event.target.value);
          }}
        ></input>
        <input
          className={style.button}
          type='submit'
          value='Submit Guess'
          onClick={(event) => onSubmit(event)}
        ></input>
        {error && <p className={style.error}>Please input a guess</p>}
      </form>
      <section>
        <div className={style.tableHeader}>
          <span>Guess</span>
          <span>Actual</span>
          <span>Difference</span>
        </div>
        {results.map((result, index) => (
          <div key={index} className={style.tableRow}>
            <span>{result.guess}</span>
            <span>{result.actual}</span>
            <span>{result.difference}</span>
          </div>
        ))}
      </section>
    </section>
  );
}

export default GameUI;
