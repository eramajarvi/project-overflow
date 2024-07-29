import React, { useState, useEffect } from "react";

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * window.innerWidth),
  y: Math.floor(Math.random() * window.innerHeight),
});

const MinimalComponent = ({ positionOffset }) => {
  const { x, y } = positionOffset;
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      Rendered Component
    </div>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Generate positions only once when the component mounts
    const initialPositions = Array.from({ length: 100 }, getRandomPosition);
    setPositions(initialPositions);
  }, []);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div>
      {positions.slice(0, count).map((position, index) => (
        <MinimalComponent key={index} positionOffset={position} />
      ))}
    </div>
  );
};

export default App;
