import "98.css";
import "../styles/global.css";

import { range, sample } from "../helpers/range";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

function HelpmeWindow() {
  const nodeRef = React.useRef(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Define a random positition for the window
  const { innerWidth: width, innerHeight: height } = window;
  const randomX = sample(range(0, width / 1.3, 10));
  const randomY = sample(range(-height / 2, height / 2.5, 10));

  const Wrapper = ({}) => {
    return (
      <div className="absolute">
        <Draggable
          handle="#helpme-window-title-bar"
          nodeRef={nodeRef}
          positionOffset={{ x: randomX, y: randomY }}
        >
          <div
            ref={nodeRef}
            className="window relative"
            style={{ width: "300px" }}
          >
            <div className="title-bar" id="helpme-window-title-bar">
              <div className="title-bar-text">Ayudame</div>
              <div className="title-bar-controls">
                <button aria-label="Help" />
              </div>
            </div>

            <div className="window-body flex justify-normal">
              <p>Hola mundo</p>
            </div>
          </div>
        </Draggable>
      </div>
    );
  };

  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <Wrapper key={index} />
      ))}
    </div>
  );
}

export default HelpmeWindow;
