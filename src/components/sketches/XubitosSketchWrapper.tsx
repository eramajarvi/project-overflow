// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import XubitosSketch from "./XubitosSketch";
import { range, sample } from "../../helpers/range";

function XubitosSketchWrapper() {
  const XubitosNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#xubitos-window-title-bar"
        nodeRef={XubitosNodeRef}
        positionOffset={{ x: "100px", y: "-350px" }}
      >
        <div ref={XubitosNodeRef} className="window" style={{ width: "450px" }}>
          <div
            className="title-bar full-title-bar"
            id="xubitos-window-title-bar"
          >
            <div className="title-bar-text">r^3 r^3 r^3 r^3 r^3 ... r^3</div>
          </div>

          <div className="window-body flex full-window-body" id="XubitosWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <XubitosSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default XubitosSketchWrapper;
