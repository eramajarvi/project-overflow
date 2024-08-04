import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import { useChat } from "ai/react";

function ChatPromptWindow({ SettingsWindowVisibility }) {
  const nodeRef1 = React.useRef(null);
  const nodeRef2 = React.useRef(null);

  const { messages, input, setInput, append } = useChat();

  const { isSettingsWindowOpened, setIsSettingsWindowOpened } =
    SettingsWindowVisibility;

  return (
    <>
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
              <div>
                {messages.map((message, index) => (
                  <div key={index}>{message.content}</div>
                ))}
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

            <div className="window-body flex justify-normal">
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
                  onClick={async () => {
                    append({ content: input, role: "user" });
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default ChatPromptWindow;
