// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import LettersSketch from "./LettersSketch";

function LettersSketchWrapper() {
  const nodeRef = React.useRef(null);
  const [isThisOpened, setIsThisOpened] = React.useState(true);

  return isThisOpened ? (
    <div className="absolute">
      <Draggable
        handle="#letters-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "50%", y: "20%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "350px" }}>
          <div className="title-bar" id="letters-window-title-bar">
            <div className="title-bar-text">Sigue estas instrucciones</div>
            <div className="title-bar-controls">
              <button
                aria-label="Close"
                onClick={() => setIsThisOpened(false)}
              />
            </div>
          </div>

          <div className="window-body flex" id="LettersWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <LettersSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  ) : null;
}

export default LettersSketchWrapper;
