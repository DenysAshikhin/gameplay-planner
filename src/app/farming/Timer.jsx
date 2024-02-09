"use client";

import { memo, useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useLocalStorage from "use-local-storage";
import addNotification from "react-push-notification";

const Timer = () => {
  const [loopAlarm, setLoopAlarm] = useLocalStorage("loopAlarm", false);
  const [loopAlarmClient, setLoopAlarmClient] = useState(false);
  useEffect(() => {
    setLoopAlarmClient(loopAlarmClient);
  }, [loopAlarm, loopAlarmClient]);

  const [innerDays, setInnerDays] = useState(0);
  const [innerHours, setInnerHours] = useState(0);
  const [innerMinutes, setInnerMinutes] = useState(0);
  const [innerSeconds, setInnerSeconds] = useState(0);
  const [initialStart, setInitialStart] = useState(true);
  const [finished, setFinished] = useState(false);

  let timeIncrease =
    (innerDays * 3600 * 24 +
      innerHours * 3600 +
      innerMinutes * 60 +
      innerSeconds) *
    1000;
  let time = new Date();
  time = new Date(time.getTime() + timeIncrease);
  //

  const { load, play, loop } = useGlobalAudioPlayer();
  useEffect(() => {
    load("/sounds/alarm.mp3", {
      autoplay: false,
    });
    // setTimeout(() => { loop(loopAlarmClient) }, 1000)
  }, [load]);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (initialStart) return;
      console.warn("Timer Finished");
      setFinished(true);
      play();
      addNotification({
        title: "FAPI Timer Finished",
        // subtitle: 'This is a subtitle',
        // message: 'This is a very long message',
        // theme: 'darkblue',
        native: true, // when using native, your OS will handle theming.
      });
    },
  });

  return (
    <div>
      {/* Timer inputs */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* days */}
        <div style={{ display: "flex" }}>
          <input
           aria-label='Specify how many days to run for'
            type="number"
            className="prepNumber importantText"
            value={innerDays}
            style={{
              width: "33px", backgroundColor: '#1b1b1b',
              borderRadius: '4px', 
            }}
            onChange={(e) => {
              try {
                let x = Number(e.target.value);
                x = Math.floor(x);
                if (x < 0 || x > 99) {
                  return;
                }
                setInnerDays(x);
              } catch (err) {
                console.log(err);
              }
            }}
            placeholder={innerDays + ""}
            min="0"
            max="99"
          />
          <div>d :</div>
        </div>
        {/* hours */}
        <div style={{ display: "flex", margin: "0 3px 0 6px" }}>
          <input
             aria-label='Specify how many hours to run for'
            type="number"
            className="prepNumber importantText"
            value={innerHours}
            style={{
              width: "33px", backgroundColor: '#1b1b1b',
              borderRadius: '4px', 
            }}
            onChange={(e) => {
              try {
                let x = Number(e.target.value);
                x = Math.floor(x);
                if (x < 0 || x > 99) {
                  return;
                }
                setInnerHours(x);
              } catch (err) {
                console.log(err);
              }
            }}
            placeholder={innerHours + ""}
            min="0"
            max="99"
          />
          <div>h :</div>
        </div>
        {/* minutes */}
        <div style={{ display: "flex", marginLeft: "3px" }}>
          <input
             aria-label='Specify how many minutes to run for'
            type="number"
            className="prepNumber importantText"
            value={innerMinutes}
            style={{
              width: "33px", backgroundColor: '#1b1b1b',
              borderRadius: '4px', 
            }}
            onChange={(e) => {
              try {
                let x = Number(e.target.value);
                x = Math.floor(x);
                if (x < 0 || x > 99) {
                  return;
                }
                setInnerMinutes(x);
              } catch (err) {
                console.log(err);
              }
            }}
            placeholder={innerMinutes + ""}
            min="0"
            max="99"
          />
          <div>{`m :`}</div>
        </div>
        {/* seconds */}
        <div style={{ display: "flex", margin: "0 0 0 6px" }}>
          <input
             aria-label='Specify how many seconds to run for'
            type="number"
            className="prepNumber importantText"
            value={innerSeconds}
            style={{
              width: "33px", backgroundColor: '#1b1b1b',
              borderRadius: '4px', 
            }}
            onChange={(e) => {
              try {
                let x = Number(e.target.value);
                x = Math.floor(x);
                if (x < 0 || x > 99) {
                  return;
                }
                setInnerSeconds(x);
              } catch (err) {
                console.log(err);
              }
            }}
            placeholder={innerSeconds + ""}
            min="0"
            max="99"
          />
          <div>s</div>
        </div>
      </div>

      {/* Timer controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "6px",
          }}
        >
          <div>Loop Alarm</div>
          <input
             aria-label='Specify if the alarm should loop'
            type="checkbox"
            checked={loopAlarmClient}
            onChange={(e) => {
              setLoopAlarm(e.target.checked);
              loop(e.target.checked);
            }}
          />
        </div>
        {/* start */}
        <button
          onClick={(e) => {
            if (finished) {
              let time = new Date();
              time = new Date(time.getTime() + timeIncrease);
              restart(time);
              setFinished(false);
            } else if (initialStart) {
              let time = new Date();
              time = new Date(time.getTime() + timeIncrease);
              setInitialStart(false);
              restart(time);
            }
            // start(e);

            // if (isRunning) {
            // restart(time);
            // }
            // else {
            else if (!isRunning) {
              resume(e);
            }
            // }
          }}
        >
          Start
        </button>
        {/* Pause */}
        <button style={{ margin: "0 6px" }} onClick={pause}>
          Pause
        </button>
        {/* <button onClick={resume}>Resume</button> */}
        <button
          onClick={() => {
            // Restarts to 5 minutes timer
            // const time = new Date();
            // time.setSeconds(time.getSeconds() + 300);
            let time = new Date();
            time = new Date(time.getTime() + timeIncrease);
            restart(time);
          }}
        >
          Restart
        </button>
      </div>

      <div
        style={{
          fontSize: "20px",
          display: "flex",
          margin: "6px 0 0 0",
          justifyContent: "center",
        }}
      >
        <div>
          <span>{days + "d"}</span>
        </div>
        :
        <div>
          <span>{hours + "h"}</span>
        </div>
        :
        <div>
          <span>{minutes + "m"}</span>
        </div>
        :
        <div>
          <span>{seconds + "s"}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Timer, function (old, curr) {
  return true; //nothing changed
});
