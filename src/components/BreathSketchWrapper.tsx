// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import BreathSketch from "./BreathSketch";

function BreathSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#breath-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "300px" }}>
          <div
            className="title-bar full-title-bar"
            id="breath-window-title-bar"
          >
            <div className="title-bar-text">Breath</div>
          </div>

          <div className="window-body flex full-window-body" id="BreathWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <BreathSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default BreathSketchWrapper;
