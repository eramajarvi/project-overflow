// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import WordCloudSketch from "./WordCloudSketch";
import { range, sample } from "../../helpers/range";

function WordCloudSketchWrapper() {
  const WordCloudNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#word-cloud-window-title-bar"
        nodeRef={WordCloudNodeRef}
        positionOffset={{ x: "100px", y: "-200px" }}
      >
        <div
          ref={WordCloudNodeRef}
          className="window"
          style={{ width: "600px" }}
        >
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
