import "98.css";
import "../styles/global.css";

import React from "react";
import Draggable from "react-draggable";

import warningIcon from "../assets/exclamation.png";

export default function WarningWindow() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute mt-4">
      <Draggable
        handle="#title-bar-warning-window"
        nodeRef={nodeRef}
        positionOffset={{ x: "50%", y: "-170%" }}
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
                id="closeButton_WarningWindow"
              ></button>
            </div>
          </div>

          <div className="window-body flex justify-start">
            <div className="place-content-start mt-1">
              <img src={warningIcon.src} className="pixelated" />
            </div>
            <div className="ml-3">
              <p>No hay salida</p>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
