import React, { useState, useEffect } from 'react';

import style from '../css/Complete.module.css';

function Complete({ results }) {
  const [finalResult, setFinalResult] = useState();

  const setResults = () => {
    let total = 0;
    results.map((result) => {
      return (total = total + result.difference);
    });
    total = Math.floor(total * 100) / 100;
    return total;
  };
  useEffect(() => {
    setFinalResult(setResults());
  }, [results]);

  return (
    <section className={style.background}>
      <section className={style.window}>
        <div className={style.tableHeader}>
          <span>Round</span>
          <span>Guess</span>
          <span>Actual</span>
          <span>Difference</span>
        </div>
        {results.map((result, index) => (
          <div key={index} className={style.tableRow}>
            <span>{index+1}</span>
            <span>{result.guess}</span>
            <span>{result.actual}</span>
            <span>{result.difference}</span>
          </div>
        ))}
        <div className={style.results}>
            <span>Congratulations!</span><br></br>
          <span>{`Your final result is ${finalResult} which you completed in`}</span>
          {results[0].time.hours > 0 && <span>{` ${results[0].time.hours} hours and`}</span>}
          {results[0].time.minutes > 0 && <span>{` ${results[0].time.minutes} minutes and`}</span>}
          {results[0].time.seconds > 0 && <span>{` ${results[0].time.seconds} seconds`}</span>}
        </div>
        <input
          className={style.button}
          type='submit'
          value='Play Again'
          onClick={() => window.location.reload()}
        ></input>
      </section>
    </section>
  );
}

export default Complete;
