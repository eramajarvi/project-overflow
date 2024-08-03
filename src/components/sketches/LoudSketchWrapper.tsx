// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import LoudSketch from "./LoudSketch";

function LoudSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#loud-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "300px" }}>
          <div className="title-bar full-title-bar" id="loud-window-title-bar">
            <div className="title-bar-text">B2 C3 D4 E5 F6 G7 H8 I9 J10</div>
          </div>

          <div className="window-body flex full-window-body" id="LoudWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <LoudSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default LoudSketchWrapper;
