import "./App.scss";
import { useEffect, useState } from "react";
import Colors from "./components/Colors";
import timeout from "./utils/utils";

function App() {
  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const colors = ["lightgreen", "tomato", "yellow", "blue"];

  const [isON, setIsON] = useState(false);
  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState(colors);
  const colorList = ["green", "red", "yellow", "blue"];

  const handleON = () => {
    setIsON(true);
  };

  useEffect(() => {
    if (isON) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isON]);

  useEffect(() => {
    if (isON && play.isDisplay) {
      let newColors = colorList[Math.floor(Math.random() * 4)];

      const copyColors = [...play.colors];
      copyColors.push(newColors);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isON, play.isDisplay]);

  useEffect(() => {
    if ((isON, play.isDisplay && play.colors.length)) {
      displayColors();
    }
  }, [isON, play.isDisplay, play.colors.length]);

  async function displayColors() {
    await timeout(1000);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(1000);
      setFlashColor("");
      await timeout(1000);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClick(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColor = [...play.userColors];
      const lastColor = copyUserColor.pop();
      setFlashColor(color);

      await timeout(1000);

      if (color === lastColor) {
        if (copyUserColor.length) {
          setPlay({ ...play, userColors: copyUserColor });
        } else {
          await timeout(1000);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(1000);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(1000);
      setFlashColor("");
    }
  }

  function closeHandle() {
    setIsON(false);
  }

  return (
    <div className="App">
      <div className="cardWrapper">
        {colorList &&
          colorList.map((color, index) => (
            <Colors
              onClick={() => {
                cardClick(color);
              }}
              key={index}
              flash={flashColor === color}
              color={color}
            />
          ))}
      </div>

      {isON && !play.isDisplay && !play.userPlay && play.score && (
        <div className="lost">
          <div>Final Score: {play.score}</div>
          <button onClick={closeHandle}>Close</button>
        </div>
      )}

      {!isON && !play.score && (
        <button onClick={handleON} className="startButton">
          start
        </button>
      )}
      {isON && (play.isDisplay || play.userPlay) && (
        <div className="score">{play.score}</div>
      )}
    </div>
  );
}

export default App;
