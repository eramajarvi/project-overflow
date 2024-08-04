import "98.css";
import "../styles/global.css";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

// Credits scene
import MathTextbookSketchWrapper from "./sketches/MathTexbookSketchWrapper";

// Other components
import BreathSketchWrapper from "./sketches/BreathSketchWrapper";
import CardiodSketchWrapper from "./sketches/CardiodSketchWrapper";
import CilinderSketchWrapper from "./sketches/CilinderSketchWrapper";
import LoudSketchWrapper from "./sketches/LoudSketchWrapper";
import MalaguaSketchWrapper from "./sketches/MalaguaSketchWrapper";
import PinkSketchWrapper from "./sketches/PinkSketchWrapper";
import SpyderWebSketchWrapper from "./sketches/SpyderWebSketchWrapper";
import WordCloudSketchWrapper from "./sketches/WordCloudSketchWrapper";
import WordSaladSketchWrapper from "./sketches/WordSaladSketchWrapper";
import XubitosSketchWrapper from "./sketches/XubitosSketchWrapper";
import YarnSketchWrapper from "./sketches/YarnSketchWrapper";

import { useChat } from "ai/react";

function ChatPromptWindow({ SettingsWindowVisibility }) {
  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);

  const { messages, input, setInput, append } = useChat();

  const [count, setCount] = React.useState(12);
  const [isUserLimited, setIsUserLimited] = React.useState(false);
  const [isEndReached, setIsEndReached] = React.useState(false);
  const [chosenNumbers, setChosenNumbers] = React.useState([]);

  const { isSettingsWindowOpened, setIsSettingsWindowOpened } =
    SettingsWindowVisibility;

  // Managing visibility for other window sketches
  const [visibleSketch, setVisibleSketch] = useState(null);

  useEffect(() => {
    if (count > 0) {
      let availableNumbers = [...Array(12).keys()]
        .map((n) => n + 1)
        .filter((n) => !chosenNumbers.includes(n));

      if (availableNumbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const chosenNumber = availableNumbers[randomIndex];
        setChosenNumbers([...chosenNumbers, chosenNumber]);
        handleComponentVisibility(chosenNumber);
      } else {
        // Reset chosenNumbers if all numbers have been chosen
        setChosenNumbers([]);
      }
    }
    if (count === 0) {
      setIsUserLimited(true);
      setIsEndReached(true);
      setVisibleSketch(0);
    }
  }, [count]);

  function handleComponentVisibility(chosenNumber) {
    switch (chosenNumber) {
      case 1:
        setVisibleSketch(1);
        break;

      case 2:
        setVisibleSketch(2);
        break;

      case 3:
        setVisibleSketch(3);
        break;

      case 4:
        setVisibleSketch(4);
        break;

      case 5:
        setVisibleSketch(5);
        break;

      case 6:
        setVisibleSketch(6);
        break;

      case 7:
        setVisibleSketch(7);

        break;

      case 8:
        setVisibleSketch(8);
        break;

      case 9:
        setVisibleSketch(9);
        break;

      case 10:
        setVisibleSketch(10);
        break;

      case 11:
        setVisibleSketch(11);

        break;

      case 12:
        setVisibleSketch(12);
        break;

      default:
        // Default case if needed
        console.log("Number not handled");
    }
  }

  return (
    <>
      {isEndReached ? <MathTextbookSketchWrapper /> : null}

      {visibleSketch === 1 && <BreathSketchWrapper />}
      {visibleSketch === 2 && <CardiodSketchWrapper />}
      {visibleSketch === 3 && <CilinderSketchWrapper />}
      {visibleSketch === 4 && <LoudSketchWrapper />}
      {visibleSketch === 5 && <MalaguaSketchWrapper />}
      {visibleSketch === 6 && <PinkSketchWrapper />}
      {visibleSketch === 7 && <SpyderWebSketchWrapper />}
      {visibleSketch === 8 && <WordCloudSketchWrapper />}
      {visibleSketch === 9 && <WordSaladSketchWrapper />}
      {visibleSketch === 10 && <XubitosSketchWrapper />}
      {visibleSketch === 11 && <YarnSketchWrapper />}
      {visibleSketch === 12 && <BreathSketchWrapper />}

      <div className="absolute">
        <Draggable
          handle="#system-response-window-title-bar"
          nodeRef={nodeRef2}
          positionOffset={{
            x: window.innerWidth / 2 + 300,
            y: 200 - window.innerHeight / 2,
          }}
        >
          <div ref={nodeRef2} className="window" style={{ width: "500px" }}>
            <div className="title-bar" id="system-response-window-title-bar">
              <div className="title-bar-text">Respuesta del sistema</div>
              <div className="title-bar-controls">
                <button
                  aria-label="Help"
                  onClick={() => setIsSettingsWindowOpened(true)}
                />
              </div>
            </div>

            <div className="window-body flex justify-normal">
              <div className="text-from-prompt">
                {messages.length > 0 && (
                  <div>{messages[messages.length - 1].content}</div>
                )}
              </div>
            </div>
          </div>
        </Draggable>
      </div>

      <div className="absolute">
        <Draggable
          handle="#chat-prompt-window-title-bar"
          nodeRef={nodeRef1}
          positionOffset={{ x: window.innerWidth / 2 - 250, y: "180%" }}
        >
          <div ref={nodeRef1} className="window" style={{ width: "500px" }}>
            <div className="title-bar" id="chat-prompt-window-title-bar">
              <div className="title-bar-text">Terminal del sistema</div>
              <div className="title-bar-controls">
                <button
                  aria-label="Help"
                  onClick={() => setIsSettingsWindowOpened(true)}
                />
              </div>
            </div>

            <div className="window-body flex-col">
              <div className="flex mb-2">
                <div className="field-row-stacked" style={{ width: "500px" }}>
                  <textarea
                    className="text-area-chat-prompt"
                    id="text20"
                    rows={2}
                    placeholder="Convence a la IA que el mundo está bien y es hora de irse"
                    maxLength={256}
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                    }}
                  ></textarea>
                  <button
                    disabled={isUserLimited}
                    onClick={async () => {
                      append({ content: `` + input, role: "user" });
                      setInput("");
                      setCount(count - 1);
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>

              <div className="status-bar">
                <p className="status-bar-field">Intentos restantes: {count}</p>
                <p className="status-bar-field">COM</p>
                <p className="status-bar-field">Uso de la NPU: NaN%</p>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default ChatPromptWindow;
