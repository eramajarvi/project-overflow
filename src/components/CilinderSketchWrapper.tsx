// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import CilinderSketch from "./CilinderSketch";

function CilinderSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#cilinder-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "400px" }}>
          <div
            className="title-bar full-title-bar"
            id="cilinder-window-title-bar"
          >
            <div className="title-bar-text">x^2 + y^2 = r^2</div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="CilinderWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <CilinderSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default CilinderSketchWrapper;