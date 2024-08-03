// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import WordCloudSketch from "./WordCloudSketch";

function WordCloudSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#word-cloud-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "0%", y: "0%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "400px" }}>
          <div
            className="title-bar full-title-bar"
            id="word-cloud-window-title-bar"
          >
            <div className="title-bar-text">
              BJOJNLKWLEPOQYUORPWWCMMLKSSJNDCLMKEBJ
            </div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="WordCloudWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <WordCloudSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default WordCloudSketchWrapper;
