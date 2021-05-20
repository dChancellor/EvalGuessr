import React, { useState, useEffect } from 'react';

import ChessBoard from './components/Chessboard';
import Start from './views/Start';
import Error from './views/Error';
import Loading from './views/Loading';
import GameUI from './components/GameUI';
import Complete from './views/Complete';
import Countdown from './views/Countdown';

import usePostRequest from './helpers/api';
import gameBoardReducer from './helpers/gameBoardReducer';

import style from './css/App.module.css';

function App() {
  const [rules, setRules] = useState();
  const { data, loading, error } = usePostRequest(
    'https://evalguessr.api.chancellor.tech',
    rules
  );
  const [roundCounter, setRoundCounter] = useState();
  const [round, setRound] = useState();
  const [counting, isCounting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      const addPositioning = async () => {
        let position = await gameBoardReducer(data[roundCounter].fen);
        data[roundCounter].colorToMove === 'white'
          ? (data[roundCounter].position = position)
          : (data[roundCounter].position = position.reverse());
        setRound(data[roundCounter]);
      };
      addPositioning();
    }
  }, [data, roundCounter]);

  useEffect(() => {
    if (!loading) {
      isCounting(true);
    }
  }, [loading]);

  const buildGame = (numberOfGames, evaluationTime) => {
    setRoundCounter(0);
    setRules({ numberOfGames, evaluationTime });
  };

  const handleGuess = (guess, time) => {
    let result = {};
    result.guess = guess;
    result.actual = round.eval / 100;
    result.difference =
      Math.round(Math.abs(result.actual - result.guess) * 100) / 100;
    result.time = time;
    setResults([...results, result]);
    if (data.length > roundCounter + 1) {
      setRoundCounter(roundCounter + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <section className={style.app}>
      {completed && results && <Complete results={results} />}
      {!data && !loading && <Start begin={buildGame} />}
      {error && <Error error={error} />}
      {loading && <Loading />}
      {counting && !loading && <Countdown isCounting={isCounting} />}
      {round && !counting && (
        <>
          <ChessBoard round={round} />
          <GameUI results={results} submitGuess={handleGuess} />
        </>
      )}
    </section>
  );
}

export default App;
