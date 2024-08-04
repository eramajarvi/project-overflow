// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import MalaguaSketch from "./MalaguaSketch";
import { range, sample } from "../../helpers/range";

function MalaguaSketchWrapper() {
  const MalaguaNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#malagua-window-title-bar"
        nodeRef={MalaguaNodeRef}
        positionOffset={{ x: "400px", y: "-150px" }}
      >
        <div ref={MalaguaNodeRef} className="window" style={{ width: "400px" }}>
          <div
            className="title-bar full-title-bar"
            id="malagua-window-title-bar"
          >
            <div className="title-bar-text">M̸͚͍̉̆́͑̃͆̾̐͆͒͊̍͝a̷̗̐̅́͑̊̒͝l̵͚̲̠̈́̓͛̓͌͑́̾͗̆a̵̩͇̹̬͋͂ḡ̶̫̤̠̫̯̜͉̓͊̈́̄̒̇̄̍̽̍̆͋̚ū̴͇͚̠̻̣̪̞̺̬̌͂͑͛̒̿͒̂́͐a̴̢̪̝̮̠͍̰̬͛̂</div>

            <div className="title-bar-controls">
              <button aria-label="Close" />
            </div>
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
