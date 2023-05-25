import React, { useState, useEffect } from "react";

const Keyboard = ["a", "s", "d", "f", "j", "k", "l", ";"];
const PracticeDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

const TypingBox = () => {
  const [currentKey, setCurrentKey] = useState("");
  const [keysPressed, setKeysPressed] = useState([]);
  const [typedKeys, setTypedKeys] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [keysCount, setKeysCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const startPractice = () => {
    setStartTime(Date.now());
  };

  const endPractice = () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const accuracy = (typedKeys.length / keysCount) * 100;
    setAccuracy(accuracy.toFixed(2));

    setStartTime(0);
    setKeysCount(0);
    setTypedKeys([]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (Keyboard.includes(key) && !keysPressed.includes(key)) {
        setCurrentKey(key);
        setKeysPressed([...keysPressed, key]);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      setKeysPressed(keysPressed.filter((k) => k !== key));

      if (key === currentKey) {
        setTypedKeys([...typedKeys, key]);
        setCurrentKey("");
        setKeysCount(keysCount + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed, currentKey, typedKeys, keysCount]);

  const accuracy1 =
    typedKeys.length > 0
      ? (typedKeys.filter((key, index) => key === Keyboard[index]).length /
          typedKeys.length) *
        100
      : 0;

  return (
    <div>
      <h1>Touch Typing Practice</h1>
      {startTime === 0 ? (
        <button onClick={startPractice}>Start Practice</button>
      ) : (
        <>
          <p>Press the following keys:</p>
          <div className="keyboard">
            {Keyboard.map((key, index) => (
              <div
                key={key}
                className={`key ${
                  currentKey === key
                    ? "active"
                    : typedKeys[index]
                    ? "correct"
                    : ""
                }`}
              >
                {key}
              </div>
            ))}
          </div>
          <p>
            Typed keys:
            <br /> {typedKeys.join("")}
          </p>
          <p>Accuracy: {accuracy1.toFixed(2)}%</p>
          <p>Keys pressed in 5 minutes: {keysCount}</p>
          <button onClick={endPractice}>End Practice</button>
          {Date.now() - startTime >= PracticeDuration && (
            <p>Practice session completed!</p>
          )}
        </>
      )}
    </div>
  );
};

export default TypingBox;
