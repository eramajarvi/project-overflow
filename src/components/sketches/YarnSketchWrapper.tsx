// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import YarnSketch from "./YarnSketch";

function YarnSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#yarn-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "400px" }}>
          <div className="title-bar full-title-bar" id="yarn-window-title-bar">
            <div className="title-bar-text">x^2 + y^2 + z^2 = 1</div>
          </div>

          <div className="window-body flex full-window-body" id="YarnWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <YarnSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default YarnSketchWrapper;
