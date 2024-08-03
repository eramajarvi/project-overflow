// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import MathTextbookSketch from "./MathTextbookSketch";

function MathTextbookSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#pink-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "30%", y: "-50%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "800px" }}>
          <div className="title-bar full-title-bar" id="pink-window-title-bar">
            <div className="title-bar-text">
              Conectando a través del puente de Einstein-Rosen...
            </div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="MathTextbookWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <MathTextbookSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default MathTextbookSketchWrapper;
