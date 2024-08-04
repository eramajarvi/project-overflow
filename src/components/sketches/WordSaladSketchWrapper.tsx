// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import WordSaladSketch from "./WordSaladSketch";
import { range, sample } from "../../helpers/range";

function WordSaladSketchWrapper() {
  const WordSaladNodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#word-salad-window-title-bar"
        nodeRef={WordSaladNodeRef}
        positionOffset={{ x: "600px", y: "-250px" }}
      >
        <div
          ref={WordSaladNodeRef}
          className="window"
          style={{ width: "600px" }}
        >
          <div
            className="title-bar full-title-bar"
            id="word-salad-window-title-bar"
          >
            <div className="title-bar-text">
              Me dí cuenta de todas estas cosas
            </div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="WordSaladWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <WordSaladSketch />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default WordSaladSketchWrapper;
