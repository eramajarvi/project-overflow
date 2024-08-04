import "98.css";
import "../styles/global.css";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

import MathTextbookSketchWrapper from "./sketches/MathTexbookSketchWrapper";

import { useChat } from "ai/react";

function ChatPromptWindow({ SettingsWindowVisibility }) {
  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);

  const { messages, input, setInput, append } = useChat();

  const [count, setCount] = React.useState(3);
  const [isUserLimited, setIsUserLimited] = React.useState(false);
  const [isEndReached, setIsEndReached] = React.useState(false);

  const { isSettingsWindowOpened, setIsSettingsWindowOpened } =
    SettingsWindowVisibility;

  useEffect(() => {
    if (count === 0) {
      setIsUserLimited(true);
      setIsEndReached(true);
    }
  }, [count]);

  return (
    <>
      {isEndReached ? <MathTextbookSketchWrapper /> : null}

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
                      console.log("intentos restantes: ", count);
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
