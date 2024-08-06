// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import CardiodSketch from "./CardiodSketch";
import { range, sample } from "../../helpers/range";

function CardiodSketchWrapper() {
  const CardiodNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#cardiod-window-title-bar"
        nodeRef={CardiodNodeRef}
        positionOffset={{ x: "1050px", y: "-450px" }}
      >
        <div ref={CardiodNodeRef} className="window" style={{ width: "600px" }}>
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
