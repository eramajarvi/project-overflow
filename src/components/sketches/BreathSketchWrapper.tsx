// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

import BreathSketch from "./BreathSketch";
import { range, sample } from "../../helpers/range";

function BreathSketchWrapper() {
  const BreathNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#breath-window-title-bar"
        nodeRef={BreathNodeRef}
        positionOffset={{ x: "600px", y: "-250px" }}
      >
        <div ref={BreathNodeRef} className="window" style={{ width: "450px" }}>
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
