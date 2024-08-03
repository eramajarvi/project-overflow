// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import CardiodSketch from "./CardiodSketch";

function CardiodSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#cardiod-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "350px" }}>
          <div
            className="title-bar full-title-bar"
            id="cardiod-window-title-bar"
          >
            <div className="title-bar-text">ρ = a(1+cosθ)</div>
          </div>

          <div className="window-body flex full-window-body" id="CardiodWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <CardiodSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default CardiodSketchWrapper;
