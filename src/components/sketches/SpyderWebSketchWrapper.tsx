// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import SpyderWebSketch from "./SpyderWebSketch";
import { range, sample } from "../../helpers/range";

function SpyderWebSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#spyder-web-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "500px", y: "-250px" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "550px" }}>
          <div
            className="title-bar full-title-bar"
            id="spyder-web-window-title-bar"
          >
            <div className="title-bar-text">connect connect connect</div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="SpyderWebWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <SpyderWebSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default SpyderWebSketchWrapper;
