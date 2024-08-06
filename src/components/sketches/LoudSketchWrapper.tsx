// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import LoudSketch from "./LoudSketch";
import { range, sample } from "../../helpers/range";

function LoudSketchWrapper() {
  const LoudNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#loud-window-title-bar"
        nodeRef={LoudNodeRef}
        positionOffset={{ x: "600px", y: "-200px" }}
      >
        <div ref={LoudNodeRef} className="window" style={{ width: "500px" }}>
          <div className="title-bar full-title-bar" id="loud-window-title-bar">
            <div className="title-bar-text">
              Continúa hablando... te escucho
            </div>
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
