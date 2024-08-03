// Use this file as template to create new window components :)
import "98.css";
import "../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import MalaguaSketch from "./MalaguaSketch";

function MalaguaSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#malagua-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "300px" }}>
          <div
            className="title-bar full-title-bar"
            id="malagua-window-title-bar"
          >
            <div className="title-bar-text">M̸͚͍̉̆́͑̃͆̾̐͆͒͊̍͝a̷̗̐̅́͑̊̒͝l̵͚̲̠̈́̓͛̓͌͑́̾͗̆a̵̩͇̹̬͋͂ḡ̶̫̤̠̫̯̜͉̓͊̈́̄̒̇̄̍̽̍̆͋̚ū̴͇͚̠̻̣̪̞̺̬̌͂͑͛̒̿͒̂́͐a̴̢̪̝̮̠͍̰̬͛̂</div>
          </div>

          <div className="window-body flex full-window-body" id="MalaguaWindow">
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <MalaguaSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default MalaguaSketchWrapper;
