import "98.css";
import "../styles/global.css";

import { range, sample } from "../helpers/range";

import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const WINDOWS_QUANTITY = 150;
const WINDOWS_VISIBLE_DELAY = 10; // in ms

const getRandomPosition = () => ({
  randomX: sample(range(0, window.innerWidth / 1.3, 10)),
  randomY: sample(range(-window.innerHeight / 2, window.innerHeight / 2.5, 10)),
});

function HelpmeWindow() {
  const nodeRef = React.useRef(null);

  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Generate positions only once when the component mounts
    const initialPositions = Array.from(
      { length: WINDOWS_QUANTITY },
      getRandomPosition,
    );
    setPositions(initialPositions);
  }, []);

  useEffect(() => {
    if (count < WINDOWS_QUANTITY) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, WINDOWS_VISIBLE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const Wrapper = ({ positionOffset }) => {
    const { randomX, randomY } = positionOffset;

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
      {positions.slice(0, count).map((position, index) => (
        <Wrapper key={index} positionOffset={position} />
      ))}
    </div>
  );
}

export default HelpmeWindow;
