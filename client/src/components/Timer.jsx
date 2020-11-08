import React, { useState, useEffect } from 'react';

import style from '../css/Timer.module.css';

function Timer({sendTimer}) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (seconds === 59) {
        setSeconds(0);
        if(minutes === 59){
            setHours(hours+1)
        }else{
            setMinutes(minutes + 1);
        }
      } else{
        setSeconds(seconds + 1);
      }
    }, 1000);
    sendTimer({hours, minutes, seconds})
  }, [sendTimer, hours, minutes, seconds]);

  return <div className={style.timer}>{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>;
}

export default Timer;
