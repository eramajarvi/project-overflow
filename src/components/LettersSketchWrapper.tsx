// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import LettersSketch from "./LettersSketch";

function LettersSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#letters-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "300px" }}>
          <div className="title-bar" id="letters-window-title-bar">
            <div className="title-bar-text">Letters</div>
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
  );
}

export default LettersSketchWrapper;
