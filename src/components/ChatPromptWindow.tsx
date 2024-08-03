// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";
import PasswordIcon from "../assets/password.png";

function ChatPromptWindow() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#chat-prompt-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: window.innerWidth / 2 - 250, y: "180%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "500px" }}>
          <div className="title-bar" id="chat-prompt-window-title-bar">
            <div className="title-bar-text">Terminal del sistema</div>
            <div className="title-bar-controls">
              <button aria-label="Help" />
            </div>
          </div>

          <div className="window-body flex justify-normal">
            <div className="field-row-stacked" style={{ width: "500px" }}>
              <textarea
                className="text-area-chat-prompt"
                id="text20"
                rows={2}
              ></textarea>
              <button>Enviar</button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default ChatPromptWindow;
