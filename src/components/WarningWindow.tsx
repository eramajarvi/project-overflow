import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import warningIcon from "../assets/exclamation.png";

function WarningWindow({visibilityProps}) {
  const nodeRef = React.useRef(null);
  const { isVisible, setIsVisible} = visibilityProps;

  return (
    <div className="absolute mt-4">
      <Draggable
        handle="#title-bar-warning-window"
        nodeRef={nodeRef}
        positionOffset={{ x: "50%", y: "-110%" }}
      >
        <div
          ref={nodeRef}
          className="window relative"
          style={{ width: "300px" }}
        >
          <div className="title-bar" id="title-bar-warning-window">
            <div className="title-bar-text">¿Te quieres ir?</div>

            <div className="title-bar-controls">
              <button
                aria-label="Close"
                onClick={() => setIsVisible(false)}
              ></button>
            </div>
          </div>

          <div className="window-body flex justify-start">
            <div className="place-content-start mt-1">
              <img src={warningIcon.src} className="pixelated" />
            </div>
            <div className="ml-3">
              <p>No hay salida. No. No. No. No. No. No hay salida.</p>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default WarningWindow;
