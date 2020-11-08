import React, { useState, useEffect } from 'react';

import style from '../css/Countdown.module.css';

function Countdown({ isCounting }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      if (countdown === 1) {
        isCounting(false);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
  }, [isCounting, countdown]);

  return <div className={style.countdown}>{countdown}</div>;
}

export default Countdown;
