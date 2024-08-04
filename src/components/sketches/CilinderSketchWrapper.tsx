// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import CilinderSketch from "./CilinderSketch";
import { range, sample } from "../../helpers/range";

function CilinderSketchWrapper() {
  const CilinderNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#cilinder-window-title-bar"
        nodeRef={CilinderNodeRef}
        positionOffset={{ x: "300px", y: "-250px" }}
      >
        <div
          ref={CilinderNodeRef}
          className="window"
          style={{ width: "600px" }}
        >
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
