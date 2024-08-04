// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import YarnSketch from "./YarnSketch";
import { range, sample } from "../../helpers/range";

function YarnSketchWrapper() {
  const YarnNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#yarn-window-title-bar"
        nodeRef={YarnNodeRef}
        positionOffset={{ x: "800px", y: "-350px" }}
      >
        <div ref={YarnNodeRef} className="window" style={{ width: "600px" }}>
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
